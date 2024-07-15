import { KeyState } from '../src/interface/types';
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

    console.log('==================')
    for (let i = 0; i < activityTotalKeys; i++) {
        const activityKey0 = await farcaster.getKeyAt(FID, KeyState.ADDED, i); 
        console.log('ADDED >>>>>> ', activityKey0);
    }

    for (let i = 0 ; i < removeTotalKeys; i++) {
        const activityKey0 = await farcaster.getKeyAt(FID, KeyState.REMOVED, i); 
        console.log('REMOVED >>>> ', activityKey0);
    }

    const nonceKeyRegistry = await farcaster.getNonceKeyRegistry(custody);
    const nonceKeyGateway = await farcaster.getNonceKeyGateway(custody);
    const nonceIdRegistry = await farcaster.getNonceIdRegistry(custody);
})()
