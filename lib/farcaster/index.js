"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Farcaster = void 0;
const viem_1 = require("viem");
const ed25519_1 = require("@noble/curves/ed25519");
const neverthrow_1 = require("neverthrow");
const ethers_1 = require("ethers");
const interface_1 = require("../interface");
const abi_1 = require("../abi");
const bytes_1 = require("./bytes");
class Farcaster {
    contractAddresses;
    contracts;
    constructor(contracts, ethersProviderOrWallet) {
        this.contractAddresses = contracts;
        this.contracts = {
            bundler: new ethers_1.ethers.Contract(contracts.BUNDLER_ADDRESS, abi_1.bundlerAbi, ethersProviderOrWallet),
            idGateway: new ethers_1.ethers.Contract(contracts.ID_GATEWAY_ADDRESS, abi_1.idGatewayAbi, ethersProviderOrWallet),
            idRegistry: new ethers_1.ethers.Contract(contracts.ID_REGISTRY_ADDRESS, abi_1.idRegistryAbi, ethersProviderOrWallet),
            keyGateway: new ethers_1.ethers.Contract(contracts.KEY_GATEWAY_ADDRESS, abi_1.keyGatewayAbi, ethersProviderOrWallet),
            keyRegistry: new ethers_1.ethers.Contract(contracts.KEY_REGISTRY_ADDRESS, abi_1.keyRegistryAbi, ethersProviderOrWallet),
            signedKeyRequestValidator: new ethers_1.ethers.Contract(contracts.SIGNED_KEY_REQUEST_VALIDATOR_ADDRESS, abi_1.signedKeyRequestValidatorAbi, ethersProviderOrWallet),
            storageRegistry: new ethers_1.ethers.Contract(contracts.STORAGE_REGISTRY_ADDRESS, abi_1.StorageRegistryAbi, ethersProviderOrWallet),
        };
    }
    async getPrice(unit) {
        const price = await this.contracts.idGateway["price(uint256)"](unit);
        return BigInt(price.toString());
    }
    async getIdOf(address) {
        const fid = await this.contracts.idRegistry.idOf(address);
        return BigInt(fid.toString());
    }
    async getNonceKeyRegistry(address) {
        const nonce = await this.contracts.keyRegistry.nonces(address);
        return BigInt(nonce);
    }
    async getNonceKeyGateway(address) {
        const nonce = await this.contracts.keyGateway.nonces(address);
        return BigInt(nonce);
    }
    async getNonceIdRegistry(address) {
        const nonce = await this.contracts.idRegistry['nonces(address)'](address);
        return BigInt(nonce);
    }
    async getCustodyByFid(fid) {
        return await this.contracts.idRegistry.custodyOf(fid);
    }
    async getRecoveryByFid(fid) {
        return await this.contracts.idRegistry.recoveryOf(fid);
    }
    async getTotakActivityKeysByFid(fid) {
        const totalKeys = await this.contracts.keyRegistry.totalKeys(fid, 1);
        return BigInt(totalKeys);
    }
    async getTotakRemoveKeysByFid(fid) {
        const totalKeys = await this.contracts.keyRegistry.totalKeys(fid, 2);
        return BigInt(totalKeys);
    }
    async registerIdGateWay(receveryAddress, unit) {
        return await this.contracts.idGateway.populateTransaction['register(address,uint256)'](receveryAddress, unit);
    }
    async signRegister(to, recovery, nonce, deadline, wallet) {
        const signatureBytes = await neverthrow_1.ResultAsync.fromPromise(wallet._signTypedData((0, interface_1.GET_ID_GATEWAY_EIP_712_DOMAIN)(this.contractAddresses.ID_GATEWAY_ADDRESS), { Register: [...interface_1.ID_GATEWAY_REGISTER_TYPE] }, {
            to,
            recovery,
            nonce,
            deadline,
        }), (e) => { console.log(e); new Error('Failed to sign message.'); }).andThen((hex) => (0, bytes_1.hexStringToBytes)(hex));
        if (!signatureBytes.isOk()) {
            (0, neverthrow_1.err)(signatureBytes.error);
            return;
        }
        ;
        return signatureBytes.value;
    }
    async signAddSignature(userWallet, appWallet, nonce, appFid, deadline) {
        const SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN = (0, interface_1.GET_SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN)(this.contractAddresses.SIGNED_KEY_REQUEST_VALIDATOR_ADDRESS);
        const KEY_GATEWAY_EIP_712_DOMAIN = (0, interface_1.GET_KEY_GATEWAY_EIP_712_DOMAIN)(this.contractAddresses.KEY_GATEWAY_ADDRESS);
        const privateKeyBytes = ed25519_1.ed25519.utils.randomPrivateKey();
        const accountPubKey = ed25519_1.ed25519.getPublicKey(privateKeyBytes);
        const message = {
            requestFid: appFid,
            key: accountPubKey,
            deadline: deadline,
        };
        const signatureBytes = await neverthrow_1.ResultAsync.fromPromise(appWallet._signTypedData(SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN, { SignedKeyRequest: [...interface_1.SIGNED_KEY_REQUEST_TYPE] }, { ...message }), (e) => { console.log(e); new Error('Failed to sign message.'); }).andThen((hex) => (0, bytes_1.hexStringToBytes)(hex));
        if (!signatureBytes.isOk()) {
            (0, neverthrow_1.err)(signatureBytes.error);
            throw signatureBytes.error;
        }
        const metadataStruct = {
            requestFid: message.requestFid,
            requestSigner: appWallet.address,
            signature: (0, viem_1.bytesToHex)(signatureBytes.value),
            deadline: message.deadline,
        };
        // metadata
        const encodedStruct = (0, viem_1.encodeAbiParameters)([
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
        ], [metadataStruct]);
        const signAddSig = await neverthrow_1.ResultAsync.fromPromise(userWallet._signTypedData(KEY_GATEWAY_EIP_712_DOMAIN, { Add: [...interface_1.KEY_GATEWAY_ADD_TYPE] }, {
            owner: userWallet.address,
            keyType: 1,
            key: accountPubKey,
            metadataType: 1,
            metadata: encodedStruct,
            nonce: BigInt(nonce),
            deadline: deadline,
        }), (e) => { console.log(e); new Error('Failed to sign message.'); }).andThen((hex) => (0, bytes_1.hexStringToBytes)(hex));
        if (!signAddSig.isOk()) {
            (0, neverthrow_1.err)(signAddSig.error);
            throw signAddSig.error;
        }
        ;
        return {
            ed25519d25519PrivateKey: (0, viem_1.bytesToHex)(privateKeyBytes),
            ed25519PublicKey: (0, viem_1.bytesToHex)(accountPubKey),
            param: {
                keyType: 1,
                key: (0, viem_1.bytesToHex)(accountPubKey),
                metadataType: 1,
                metadata: encodedStruct,
                sig: (0, viem_1.bytesToHex)(signAddSig.value),
                deadline,
            }
        };
    }
    // recovery시에도 해당 서명이 필요
    async transferSignature(fid, toWallet, nonce, deadline) {
        const ID_REGISTRY_EIP_712_DOMAIN = (0, interface_1.GET_ID_REGISTRY_EIP_712_DOMAIN)(this.contractAddresses.ID_REGISTRY_ADDRESS);
        const signatureBytes = await neverthrow_1.ResultAsync.fromPromise(toWallet._signTypedData(ID_REGISTRY_EIP_712_DOMAIN, { Transfer: [...interface_1.ID_REGISTRY_TRANSFER_TYPE] }, {
            fid,
            to: toWallet.address,
            nonce,
            deadline,
        }), (e) => { console.log(e); new Error('Failed to sign message.'); }).andThen((hex) => (0, bytes_1.hexStringToBytes)(hex));
        if (!signatureBytes.isOk()) {
            (0, neverthrow_1.err)(signatureBytes.error);
            throw signatureBytes.error;
        }
        return (0, viem_1.bytesToHex)(signatureBytes.value);
    }
}
exports.Farcaster = Farcaster;
