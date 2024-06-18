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

    async registerIdGateWay(receveryAddress: string, unit: bigint) {
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

    async signAddSignature(userWallet: ethers.Wallet, appWallet: ethers.Wallet, nonce: bigint, appFid: bigint, deadline: bigint) {
        const SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN = GET_SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN(
            this.contractAddresses.SIGNED_KEY_REQUEST_VALIDATOR_ADDRESS
        );
        const KEY_GATEWAY_EIP_712_DOMAIN = GET_KEY_GATEWAY_EIP_712_DOMAIN(
            this.contractAddresses.KEY_GATEWAY_ADDRESS
        );

        const privateKeyBytes = ed25519.utils.randomPrivateKey()
        const accountPubKey = ed25519.getPublicKey(privateKeyBytes);

        const message = {
            requestFid: appFid,
            key: accountPubKey,
            deadline: deadline,
        };

        const signatureBytes = await ResultAsync.fromPromise(
            appWallet._signTypedData(
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

        const metadataStruct = {
            requestFid: message.requestFid,
            requestSigner: appWallet.address,
            signature: bytesToHex(signatureBytes.value),
            deadline: message.deadline,
        }

        // metadata
        const encodedStruct = encodeAbiParameters(
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

        const signAddSig = await ResultAsync.fromPromise(
            userWallet._signTypedData(
                KEY_GATEWAY_EIP_712_DOMAIN,
                { Add: [...KEY_GATEWAY_ADD_TYPE] },
                {
                    owner: userWallet.address,
                    keyType: 1,
                    key: accountPubKey,
                    metadataType: 1,
                    metadata: encodedStruct,
                    nonce: BigInt(nonce),
                    deadline: deadline,
                }
            ),
            (e) => { console.log(e); new Error('Failed to sign message.') }
        ).andThen((hex) => hexStringToBytes(hex));

        if (!signAddSig.isOk()) {
            err(signAddSig.error);
            throw signAddSig.error
        };

        return {
            ed25519d25519PrivateKey: bytesToHex(privateKeyBytes),
            ed25519PublicKey: bytesToHex(accountPubKey),
            param: {
                keyType: 1,
                key: bytesToHex(accountPubKey),
                metadataType: 1,
                metadata: encodedStruct,
                sig: bytesToHex(signAddSig.value),
                deadline,
            }
        };
    }

    // recovery시에도 해당 서명이 필요
    async transferSignature(fid: bigint, toWallet: ethers.Wallet, nonce: bigint, deadline: bigint): Promise<Hex> {
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

        return bytesToHex(signatureBytes.value)
    }
}