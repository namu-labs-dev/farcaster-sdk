import { ethers } from "ethers";
import { IContracts, Hex } from '../interface';
export declare class Farcaster {
    contractAddresses: IContracts;
    contracts: any;
    constructor(contracts: IContracts, ethersProviderOrWallet: ethers.providers.JsonRpcProvider | ethers.Wallet);
    getPrice(unit: bigint): Promise<bigint>;
    getIdOf(address: string): Promise<bigint>;
    getNonceKeyRegistry(address: string): Promise<bigint>;
    getNonceKeyGateway(address: string): Promise<bigint>;
    getNonceIdRegistry(address: string): Promise<bigint>;
    getCustodyByFid(fid: BigInt): Promise<string>;
    getRecoveryByFid(fid: BigInt): Promise<string>;
    getTotakActivityKeysByFid(fid: BigInt): Promise<bigint>;
    getTotakRemoveKeysByFid(fid: BigInt): Promise<bigint>;
    getCalldataRegisterIdGateWay(receveryAddress: string, unit: bigint): Promise<any>;
    signRegister(to: string, recovery: string, nonce: bigint, deadline: bigint, wallet: ethers.Wallet): Promise<Uint8Array | undefined>;
    signMetadataForRegistryKeyByAppOwner(appFidOwnerSigner: ethers.Wallet, appFid: bigint, deadline: bigint, ed2559privateKeyBytes: Uint8Array): Promise<`0x${string}`>;
    signAddActivityKeySig(userWallet: ethers.Wallet, metadataSig: Hex, nonce: bigint, deadline: bigint, ed25519PublicKey: Uint8Array): Promise<{
        keyType: number;
        key: `0x${string}`;
        metadataType: number;
        metadata: `0x${string}`;
        sig: `0x${string}`;
        deadline: bigint;
    }>;
    signTransfer(fid: bigint, toWallet: ethers.Wallet, nonce: bigint, deadline: bigint): Promise<Hex>;
}
