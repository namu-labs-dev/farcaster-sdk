import { bytesToHex, encodeAbiParameters } from 'viem';
import { ed25519 } from '@noble/curves/ed25519';
import { ResultAsync, err } from "neverthrow";
import { ethers } from "ethers";

import { 
    GET_ID_GATEWAY_EIP_712_DOMAIN, 
    GET_SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN, 
    GET_KEY_GATEWAY_EIP_712_DOMAIN,
    GET_ID_REGISTRY_EIP_712_DOMAIN,
    ID_GATEWAY_REGISTER_TYPE, 
    SIGNED_KEY_REQUEST_TYPE,
    KEY_GATEWAY_ADD_TYPE,
    ID_REGISTRY_TRANSFER_TYPE,
    IContracts, Hex
} from '../interface';

import { 
    bundlerAbi,
    idGatewayAbi,
    idRegistryAbi,
    keyGatewayAbi,
    keyRegistryAbi,
    signedKeyRequestValidatorAbi,
    StorageRegistryAbi
} from "../abi";

import {
    hexStringToBytes,
} from './bytes';

export class Farcaster {
    contractAddresses: IContracts;
    contracts: any;

    constructor(contracts: IContracts, ethersProviderOrWallet: ethers.providers.JsonRpcProvider | ethers.Wallet) {
        this.contractAddresses = contracts
        this.contracts = {
            bundler: new ethers.Contract(contracts.BUNDLER_ADDRESS, bundlerAbi, ethersProviderOrWallet),
            idGateway: new ethers.Contract(contracts.ID_GATEWAY_ADDRESS, idGatewayAbi, ethersProviderOrWallet),
            idRegistry: new ethers.Contract(contracts.ID_REGISTRY_ADDRESS, idRegistryAbi, ethersProviderOrWallet),
            keyGateway: new ethers.Contract(contracts.KEY_GATEWAY_ADDRESS, keyGatewayAbi, ethersProviderOrWallet),
            keyRegistry: new ethers.Contract(contracts.KEY_REGISTRY_ADDRESS, keyRegistryAbi, ethersProviderOrWallet),
            signedKeyRequestValidator: new ethers.Contract(contracts.SIGNED_KEY_REQUEST_VALIDATOR_ADDRESS, signedKeyRequestValidatorAbi, ethersProviderOrWallet),
            storageRegistry: new ethers.Contract(contracts.STORAGE_REGISTRY_ADDRESS, StorageRegistryAbi, ethersProviderOrWallet),
        };
    }

    async getPrice(unit: bigint): Promise<bigint> {
        const price: number = await this.contracts.idGateway["price(uint256)"](unit);
        return BigInt(price.toString());
    }

    async getIdOf(address: string): Promise<bigint> {
        const fid = await this.contracts.idRegistry.idOf(address);
        return BigInt(fid.toString());
    }

    async getNonceKeyRegistry(address: string): Promise<bigint> {
        const nonce = await this.contracts.keyRegistry.nonces(address);
        return BigInt(nonce);
    }

    async getNonceKeyGateway(address: string): Promise<bigint> {
        const nonce = await this.contracts.keyGateway.nonces(address);
        return BigInt(nonce);
    }

    async getNonceIdRegistry(address: string): Promise<bigint> {
        const nonce = await this.contracts.idRegistry['nonces(address)'](address);
        return BigInt(nonce);
    }

    async getCustodyByFid(fid: BigInt): Promise<string> {
        return await this.contracts.idRegistry.custodyOf(fid);
    }

    async getRecoveryByFid(fid: BigInt): Promise<string> {
        return await this.contracts.idRegistry.recoveryOf(fid);
    }

    async getTotakActivityKeysByFid(fid: BigInt): Promise<bigint> {
        const totalKeys = await this.contracts.keyRegistry.totalKeys(fid, 1);
        return BigInt(totalKeys);
    }
    
    async getTotakRemoveKeysByFid(fid: BigInt): Promise<bigint> {
        const totalKeys = await this.contracts.keyRegistry.totalKeys(fid, 2);
        return BigInt(totalKeys);
    }

    async getCalldataRegisterIdGateWay(receveryAddress: string, unit: bigint) {
        return await this.contracts.idGateway.populateTransaction['register(address,uint256)'](receveryAddress, unit);
    }

    async signRegister(to: string, recovery: string, nonce: bigint, deadline: bigint, wallet: ethers.Wallet) {
        const signatureBytes = await ResultAsync.fromPromise(
            wallet._signTypedData(
                GET_ID_GATEWAY_EIP_712_DOMAIN(this.contractAddresses.ID_GATEWAY_ADDRESS),
                { Register: [...ID_GATEWAY_REGISTER_TYPE] },
                {
                    to,
                    recovery,
                    nonce,
                    deadline,
                }
            ),
            (e) => { console.log(e); new Error('Failed to sign message.') }
        ).andThen((hex) => hexStringToBytes(hex));

        if (!signatureBytes.isOk()) {
            err(signatureBytes.error);
            return
        };
        return signatureBytes.value;
    }

    async signMetadataForRegistryKeyByAppOwner(appFidOwnerSigner: ethers.Wallet, appFid: bigint, deadline: bigint, ed2559privateKeyBytes: Uint8Array) {
        const SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN = GET_SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN(
            this.contractAddresses.SIGNED_KEY_REQUEST_VALIDATOR_ADDRESS
        );

        const accountPubKey = ed25519.getPublicKey(ed2559privateKeyBytes);

        const message = {
            requestFid: appFid,
            key: accountPubKey,
            deadline: deadline,
        };

        const signatureBytes = await ResultAsync.fromPromise(
            appFidOwnerSigner._signTypedData(
                SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN,
                { SignedKeyRequest: [...SIGNED_KEY_REQUEST_TYPE] },
                { ...message }
            ),
            (e) => { console.log(e); new Error('Failed to sign message.') }
        ).andThen((hex) => hexStringToBytes(hex));

        if (!signatureBytes.isOk()) {
            err(signatureBytes.error);
            throw signatureBytes.error;
        }
        const sig = bytesToHex(signatureBytes.value);

        const metadataStruct = {
            requestFid: message.requestFid,
            requestSigner: appFidOwnerSigner.address,
            signature: sig,
            deadline: message.deadline,
        }

        const metadata = encodeAbiParameters(
            [
                {
                    components: [
                        {
                            name: "requestFid",
                            type: "uint256",
                        },
                        {
                            name: "requestSigner",
                            type: "address",
                        },
                        {
                            name: "signature",
                            type: "bytes",
                        },
                        {
                            name: "deadline",
                            type: "uint256",
                        },
                    ],
                    name: "SignedKeyRequestMetadata",
                    type: "tuple",
                },
            ],
            [metadataStruct as any],
        );

        return metadata;
    }

    async signAddActivityKeySig(userWallet: ethers.Wallet, metadataSig: Hex, nonce: bigint, deadline: bigint, ed25519PublicKey: Uint8Array) {
        const KEY_GATEWAY_EIP_712_DOMAIN = GET_KEY_GATEWAY_EIP_712_DOMAIN(
            this.contractAddresses.KEY_GATEWAY_ADDRESS
        );

        const sig = await ResultAsync.fromPromise(
            userWallet._signTypedData(
                KEY_GATEWAY_EIP_712_DOMAIN,
                { Add: [...KEY_GATEWAY_ADD_TYPE] },
                {
                    owner: userWallet.address,
                    keyType: 1,
                    key: ed25519PublicKey,
                    metadataType: 1,
                    metadata: metadataSig,
                    nonce: BigInt(nonce),
                    deadline: deadline,
                }
            ),
            (e) => { console.log(e); new Error('Failed to sign message.') }
        ).andThen((hex) => hexStringToBytes(hex));

        if (!sig.isOk()) {
            err(sig.error);
            throw sig.error
        };

        return {
            keyType: 1,
            key: bytesToHex(ed25519PublicKey),
            metadataType: 1,
            metadata: metadataSig,
            sig: bytesToHex(sig.value),
            deadline,
        };
    }

    // recovery시에도 해당 서명이 필요
    async signTransfer(fid: bigint, toWallet: ethers.Wallet, nonce: bigint, deadline: bigint): Promise<Hex> {
        const ID_REGISTRY_EIP_712_DOMAIN = GET_ID_REGISTRY_EIP_712_DOMAIN(
            this.contractAddresses.ID_REGISTRY_ADDRESS
        );

        const signatureBytes = await ResultAsync.fromPromise(
            toWallet._signTypedData(
                ID_REGISTRY_EIP_712_DOMAIN,
                { Transfer: [...ID_REGISTRY_TRANSFER_TYPE] },
                {
                    fid,
                    to: toWallet.address,
                    nonce,
                    deadline,
                }
            ),
            (e) => { console.log(e); new Error('Failed to sign message.') }
        ).andThen((hex) => hexStringToBytes(hex));

        if (!signatureBytes.isOk()) {
            err(signatureBytes.error);
            throw signatureBytes.error;
        }

        const sig = bytesToHex(signatureBytes.value);
        return sig;
    }
}