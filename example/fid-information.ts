import { farcaster } from './common';

(async () => {
    const FID = 2n;
    const price = await farcaster.getPrice(1n);

    const custody = await farcaster.getCustodyByFid(FID);
    const recovery = await farcaster.getRecoveryByFid(FID);

    const activityTotalKeys = await farcaster.getTotakActivityKeysByFid(FID);
    const removeTotalKeys = await farcaster.getTotakRemoveKeysByFid(FID);
    
    console.log(`FID: ${FID}`);
    console.log(`price: ${price.toString()}`)
    console.log(`custody: ${custody}`);
    console.log(`recovery: ${recovery}`);

    console.log(`activityTotalKeys: ${activityTotalKeys}`);
    console.log(`removeTotalKeys: ${removeTotalKeys}`);

    const nonceKeyRegistry = await farcaster.getNonceKeyRegistry(custody);
    const nonceKeyGateway = await farcaster.getNonceKeyGateway(custody);
    const nonceIdRegistry = await farcaster.getNonceIdRegistry(custody);
})()
