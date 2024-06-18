"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ID_REGISTRY_TRANSFER_TYPE = exports.KEY_GATEWAY_ADD_TYPE = exports.SIGNED_KEY_REQUEST_TYPE = exports.ID_GATEWAY_REGISTER_TYPE = exports.GET_ID_REGISTRY_EIP_712_DOMAIN = exports.GET_KEY_GATEWAY_EIP_712_DOMAIN = exports.GET_SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN = exports.GET_ID_GATEWAY_EIP_712_DOMAIN = void 0;
const GET_ID_GATEWAY_EIP_712_DOMAIN = (address) => {
    return {
        name: "Farcaster IdGateway",
        version: "1",
        chainId: 10,
        verifyingContract: address,
    };
};
exports.GET_ID_GATEWAY_EIP_712_DOMAIN = GET_ID_GATEWAY_EIP_712_DOMAIN;
const GET_SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN = (address) => ({
    name: "Farcaster SignedKeyRequestValidator",
    version: "1",
    chainId: 10,
    verifyingContract: address,
});
exports.GET_SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN = GET_SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN;
const GET_KEY_GATEWAY_EIP_712_DOMAIN = (address) => ({
    name: "Farcaster KeyGateway",
    version: "1",
    chainId: 10,
    verifyingContract: address,
});
exports.GET_KEY_GATEWAY_EIP_712_DOMAIN = GET_KEY_GATEWAY_EIP_712_DOMAIN;
const GET_ID_REGISTRY_EIP_712_DOMAIN = (address) => ({
    name: "Farcaster IdRegistry",
    version: "1",
    chainId: 10,
    verifyingContract: address,
});
exports.GET_ID_REGISTRY_EIP_712_DOMAIN = GET_ID_REGISTRY_EIP_712_DOMAIN;
exports.ID_GATEWAY_REGISTER_TYPE = [
    { name: "to", type: "address" },
    { name: "recovery", type: "address" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
];
exports.SIGNED_KEY_REQUEST_TYPE = [
    { name: "requestFid", type: "uint256" },
    { name: "key", type: "bytes" },
    { name: "deadline", type: "uint256" },
];
exports.KEY_GATEWAY_ADD_TYPE = [
    { name: "owner", type: "address" },
    { name: "keyType", type: "uint32" },
    { name: "key", type: "bytes" },
    { name: "metadataType", type: "uint8" },
    { name: "metadata", type: "bytes" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
];
exports.ID_REGISTRY_TRANSFER_TYPE = [
    { name: "fid", type: "uint256" },
    { name: "to", type: "address" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
];
