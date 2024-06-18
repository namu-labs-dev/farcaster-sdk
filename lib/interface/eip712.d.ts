export declare const GET_ID_GATEWAY_EIP_712_DOMAIN: (address: string) => {
    name: string;
    version: string;
    chainId: number;
    verifyingContract: string;
};
export declare const GET_SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN: (address: string) => {
    name: string;
    version: string;
    chainId: number;
    verifyingContract: string;
};
export declare const GET_KEY_GATEWAY_EIP_712_DOMAIN: (address: string) => {
    name: string;
    version: string;
    chainId: number;
    verifyingContract: string;
};
export declare const GET_ID_REGISTRY_EIP_712_DOMAIN: (address: string) => {
    name: string;
    version: string;
    chainId: number;
    verifyingContract: string;
};
export declare const ID_GATEWAY_REGISTER_TYPE: readonly [{
    readonly name: "to";
    readonly type: "address";
}, {
    readonly name: "recovery";
    readonly type: "address";
}, {
    readonly name: "nonce";
    readonly type: "uint256";
}, {
    readonly name: "deadline";
    readonly type: "uint256";
}];
export declare const SIGNED_KEY_REQUEST_TYPE: readonly [{
    readonly name: "requestFid";
    readonly type: "uint256";
}, {
    readonly name: "key";
    readonly type: "bytes";
}, {
    readonly name: "deadline";
    readonly type: "uint256";
}];
export declare const KEY_GATEWAY_ADD_TYPE: readonly [{
    readonly name: "owner";
    readonly type: "address";
}, {
    readonly name: "keyType";
    readonly type: "uint32";
}, {
    readonly name: "key";
    readonly type: "bytes";
}, {
    readonly name: "metadataType";
    readonly type: "uint8";
}, {
    readonly name: "metadata";
    readonly type: "bytes";
}, {
    readonly name: "nonce";
    readonly type: "uint256";
}, {
    readonly name: "deadline";
    readonly type: "uint256";
}];
export declare const ID_REGISTRY_TRANSFER_TYPE: readonly [{
    readonly name: "fid";
    readonly type: "uint256";
}, {
    readonly name: "to";
    readonly type: "address";
}, {
    readonly name: "nonce";
    readonly type: "uint256";
}, {
    readonly name: "deadline";
    readonly type: "uint256";
}];
