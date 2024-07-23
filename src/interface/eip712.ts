export const GET_ID_GATEWAY_EIP_712_DOMAIN = (address: string) => {
    return {
        name: "Farcaster IdGateway",
        version: "1",
        chainId: 10,
        verifyingContract: address,
    };
};

export const GET_SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN = (address: string) => ({
    name: "Farcaster SignedKeyRequestValidator",
    version: "1",
    chainId: 10,
    verifyingContract: address,
});
export const GET_KEY_GATEWAY_EIP_712_DOMAIN = (address: string) =>({
    name: "Farcaster KeyGateway",
    version: "1",
    chainId: 10,
    verifyingContract: address,
})
export const GET_KEY_REGISTRY_EIP_712_DOMAIN = (address: string) =>({
    name: "Farcaster KeyRegistry",
    version: "1",
    chainId: 10,
    verifyingContract: address,
})

export const GET_ID_REGISTRY_EIP_712_DOMAIN = (address: string) => ({
    name: "Farcaster IdRegistry",
    version: "1",
    chainId: 10,
    verifyingContract: address,
})

export const ID_GATEWAY_REGISTER_TYPE = [
    { name: "to", type: "address" },
    { name: "recovery", type: "address" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
] as const;

export const SIGNED_KEY_REQUEST_TYPE = [
    { name: "requestFid", type: "uint256" },
    { name: "key", type: "bytes" },
    { name: "deadline", type: "uint256" },
] as const;

export const KEY_GATEWAY_ADD_TYPE = [
    { name: "owner", type: "address" },
    { name: "keyType", type: "uint32" },
    { name: "key", type: "bytes" },
    { name: "metadataType", type: "uint8" },
    { name: "metadata", type: "bytes" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
] as const;

export const KEY_REGISTER_REMOVE_TYPE = [
    { name: "owner", type: "address" },
    { name: "key", type: "bytes" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
] as const;

export const ID_REGISTRY_TRANSFER_TYPE = [
    { name: "fid", type: "uint256" },
    { name: "to", type: "address" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
] as const;

export const ID_REGISTRY_CHANGE_RECOVERY_ADDRESS_TYPE = [
    { name: "fid", type: "uint256" },
    { name: "from", type: "address" },
    { name: "to", type: "address" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
] as const;