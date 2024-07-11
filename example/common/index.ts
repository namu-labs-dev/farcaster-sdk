// import { Farcaster } from "@namulabsdev/farcaster-sdk";
import { Farcaster } from "../../src";
import { ethers } from "ethers";

// APP FID의 owner의 private key를 지정한다.
const APP_PRIVATE_KEY = 'PRIVATE KEY';

export const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
export const wallet = new ethers.Wallet(APP_PRIVATE_KEY, provider);

export const contracts = {
    STORAGE_REGISTRY_ADDRESS: "0x4d3e93d75799d4d91b0a022d0144cad5b95908f5",
    ID_REGISTRY_ADDRESS: "0xe28f51d29bf9f1b99573ad3aeb8849df04828fa7",
    ID_GATEWAY_ADDRESS: "0xf38a35dd669b32b17c67c5026e4e6281e6154286",
    KEY_REGISTRY_ADDRESS: "0x6f37926480d864d8b5783f0fcaa5c876f1796499",
    KEY_GATEWAY_ADDRESS: "0xbdb283f1fbadd0cf3a979763c90307fe24075c98",
    SIGNED_KEY_REQUEST_VALIDATOR_ADDRESS: "0xa742876a39ebff0be2f8af1d708d2d0fa82cab37",
    BUNDLER_ADDRESS: "0x140c13e9ecffab69d5c9c203f6f3a999e9bcf68d",
    RECOVERY_PROXY_ADDRESS: "0x44e6fde48fdff5ee1f4f256d7a01bd58312f2e5e",
}

export const farcaster = new Farcaster(
    contracts,
    provider,
);
