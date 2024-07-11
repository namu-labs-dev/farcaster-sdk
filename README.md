# farcaster SDK

해당 SDK는 farcaster onchain 제어를 목적으로합니다.

### install

```bash
$ npm i @namulabsdev/farcaster-sdk

or 

$ yarn add @namulabsdev/farcaster-sdk
```

### on chain features

* registry fid

* add activity key

* remove activity key

* storage rent

* recovery

* transfer

### dependencies 

* ethers@5.7.2

### define

```ts
import { Farcaster } from '@namulabsdev/farcaster-sdk';

const PRIVATE_KEY = 'PRIVATE_KEY';

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const contracts = {
    STORAGE_REGISTRY_ADDRESS: "0xe09ec2a7577fa557c16167ad08ae42c743f785c3",
    ID_REGISTRY_ADDRESS: "0x2e6bb0cfca31949032dfbead0e35d8d3481eeb63",
    ID_GATEWAY_ADDRESS: "0x7a889cecd3165b32e394e36cc90b203050889718",
    KEY_REGISTRY_ADDRESS: "0xf8ce9186abd669bc9ff7de7dbcb783f13fb808fd",
    KEY_GATEWAY_ADDRESS: "0xc1cc9b3b017bb8cb19214d19817e07de0f15c25d",
    SIGNED_KEY_REQUEST_VALIDATOR_ADDRESS: "0xe565f4f285d7318bede674e503bced1faa4e1bdf",
    BUNDLER_ADDRESS: "0x8f5ef5fada19cfa9f09ed9b45c2692d8b5088ede",
    RECOVERY_PROXY_ADDRESS: "0x0386afdf47d45becde81bd1cd1d1744199321851",
}

const farcaster = new Farcaster(
    contracts,
    provider,
);
```

### registry fid

* [app fid registry](https://github.com/namu-labs-dev/farcaster-sdk/blob/main/example/app-fid-registry.ts)

* [user fid registry](https://github.com/namu-labs-dev/farcaster-sdk/blob/main/example/user-fid-registry.ts)

### activitikey management

* [add](https://github.com/namu-labs-dev/farcaster-sdk/blob/main/example/activitykey-add.ts)

* [addFor](https://github.com/namu-labs-dev/farcaster-sdk/blob/main/example/activitykey-addFor.ts)

* [remove](https://github.com/namu-labs-dev/farcaster-sdk/blob/main/example/activitykey-remove.ts)

* [removeFor](https://github.com/namu-labs-dev/farcaster-sdk/blob/main/example/activitykey-removeFor.ts)

### fid management

* [transfer](https://github.com/namu-labs-dev/farcaster-sdk/blob/main/example/transfer.ts)

* [transferFor](https://github.com/namu-labs-dev/farcaster-sdk/blob/main/example/transferFor.ts)

* [recovery](https://github.com/namu-labs-dev/farcaster-sdk/blob/main/example/recovery.ts)

* [recoveryFor](https://github.com/namu-labs-dev/farcaster-sdk/blob/main/example/recoveryFor.ts)

### storage

* [rent](https://github.com/namu-labs-dev/farcaster-sdk/blob/main/example/rent.ts)

### fid information 

* [fid](https://github.com/namu-labs-dev/farcaster-sdk/blob/main/example/fid-information.ts)