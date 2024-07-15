export type Hex = `0x${string}`;

export interface IContracts {
    STORAGE_REGISTRY_ADDRESS: string;
    ID_REGISTRY_ADDRESS: string;
    ID_GATEWAY_ADDRESS: string;
    KEY_REGISTRY_ADDRESS: string;
    KEY_GATEWAY_ADDRESS: string;
    SIGNED_KEY_REQUEST_VALIDATOR_ADDRESS: string;
    BUNDLER_ADDRESS: string;
    RECOVERY_PROXY_ADDRESS: string;
}

export interface ISignAddSignature {
    ed25519d25519PrivateKey: string;
    ed25519PublicKey: string;
    param: {
        keyType: number;
        key: Hex;
        metadataType: number;
        metadata: Hex;
        sig: Hex;
        deadline: bigint;
    };
}

export enum KeyState {
    NULL,
    ADDED,
    REMOVED,
}
