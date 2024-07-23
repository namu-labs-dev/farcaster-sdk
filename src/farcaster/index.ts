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
    IContracts, Hex,
    KEY_REGISTER_REMOVE_TYPE,
    GET_KEY_REGISTRY_EIP_712_DOMAIN,
    ID_REGISTRY_CHANGE_RECOVERY_ADDRESS_TYPE
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
import { KeyState } from '../interface/types';

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

    async getKeyAt(fid: BigInt, state: KeyState, index: number): Promise<string> {
        return await this.contracts.keyRegistry.keyAt(fid, state, index);
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

    // FIXME: metadata는 APP FID의 owner로 서명한다.
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

    // FIXME: contract wallet을 사용한다면 fidOwnerAddress는 userWallet.address와 다를 수 있다.
    async signAddActivityKeySig(fidOwnerAddress: string, metadataSig: Hex, nonce: bigint, deadline: bigint, ed25519PublicKey: Uint8Array, userWallet: ethers.Wallet, ) {
        const KEY_GATEWAY_EIP_712_DOMAIN = GET_KEY_GATEWAY_EIP_712_DOMAIN(
            this.contractAddresses.KEY_GATEWAY_ADDRESS
        );

        const sig = await ResultAsync.fromPromise(
            userWallet._signTypedData(
                KEY_GATEWAY_EIP_712_DOMAIN,
                { Add: [...KEY_GATEWAY_ADD_TYPE] },
                {
                    owner: fidOwnerAddress,
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

    async signRemoveForActivityKeySig(fidOwnerAddress: string, nonce: bigint, deadline: bigint, ed25519PublicKey: Uint8Array, userWallet: ethers.Wallet) {
        const sig = await ResultAsync.fromPromise(
            userWallet._signTypedData(
                GET_KEY_REGISTRY_EIP_712_DOMAIN(this.contractAddresses.KEY_REGISTRY_ADDRESS),
                { Remove: [...KEY_REGISTER_REMOVE_TYPE] },
                {
                    owner: fidOwnerAddress,
                    key: ed25519PublicKey,
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

        return sig.value;
    }

    // recovery시에도 해당 서명이 필요
    // FIXME: contract wallet을 사용한다면 toAddress는 userWallet.address와 다를 수 있다.
    async signTransfer(fid: bigint, toAddress: string, nonce: bigint, deadline: bigint, userWallet: ethers.Wallet): Promise<Hex> {
        const ID_REGISTRY_EIP_712_DOMAIN = GET_ID_REGISTRY_EIP_712_DOMAIN(
            this.contractAddresses.ID_REGISTRY_ADDRESS
        );

        const signatureBytes = await ResultAsync.fromPromise(
            userWallet._signTypedData(
                ID_REGISTRY_EIP_712_DOMAIN,
                { Transfer: [...ID_REGISTRY_TRANSFER_TYPE] },
                {
                    fid,
                    to: toAddress,
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

    // FID의 recovery로 등록된 address를 다른 주소로 변경하기 위해 필요한 서명
    async signChangeRecoveryAddress(fid: bigint, fromRecoveryAddress: string, toRecoveryAddress: string, nonce: bigint, deadline: bigint, userWallet: ethers.Wallet): Promise<Hex> {
        const ID_REGISTRY_EIP_712_DOMAIN = GET_ID_REGISTRY_EIP_712_DOMAIN(
            this.contractAddresses.ID_REGISTRY_ADDRESS
        );

        const signatureBytes = await ResultAsync.fromPromise(
            userWallet._signTypedData(
                ID_REGISTRY_EIP_712_DOMAIN,
                { ChangeRecoveryAddress: [...ID_REGISTRY_CHANGE_RECOVERY_ADDRESS_TYPE] },
                {
                    fid,
                    from: fromRecoveryAddress,
                    to: toRecoveryAddress,
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