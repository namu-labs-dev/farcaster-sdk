import { ed25519 } from '@noble/curves/ed25519';
import { provider, wallet as appWallet, farcaster } from './common';
import { ethers } from 'ethers';
import { bytesToHex } from 'viem';

const userWallet = new ethers.Wallet(
    'PRIVATE_KEY',
    provider,
);

(async () => {

    const recovery = 'ADDRESS';

    const price = await farcaster.getPrice(1n)
    const deadline = BigInt(Math.floor(Date.now() / 1000) + (3600 * 24));
    const appFid = await farcaster.getIdOf(appWallet.address)
    const userFid = await farcaster.getIdOf(userWallet.address)

    if (appFid === 0n) {
        console.log(`appFid is not registered: ${appFid}`);
        return;
    }

    if (userFid !== 0n) {
        console.log(`userFid is already registered: ${userFid}`);
        return;
    }

    console.log(`price: ${price.toString()}, ${price.toString().length}`);
    console.log(`appFid: ${appFid}`);
    console.log(`userFid: ${userFid}`);

    // owner 등록을 위한 서명(FID 생성)
    const registerSignature = await farcaster.signRegister(
        userWallet.address,
        recovery,
        await farcaster.getNonceKeyRegistry(userWallet.address),
        deadline,
        userWallet,
    );
    
    // key 등록을 위한 키 생성(ED25519)
    const ed25519PrivateKey =  ed25519.utils.randomPrivateKey();
    const ed25519PublicKey = ed25519.getPublicKey(ed25519PrivateKey);
    
    // acticity key 등록을 위한 metadata 생성
    const metadataSigForRegistryKey = await farcaster.signMetadataForRegistryKeyByAppOwner(appWallet, appFid, deadline, ed25519PrivateKey);

    const includeAddKeySigParams = await farcaster.signAddActivityKeySig(
        userWallet.address, 
        metadataSigForRegistryKey, 
        await farcaster.getNonceKeyGateway(userWallet.address),
        deadline,
        ed25519PublicKey,
        userWallet,
    );
    
    const registerCalldata = await farcaster.contracts.bundler.populateTransaction.register(
        {
            to: userWallet.address,
            recovery,
            sig: registerSignature,
            deadline
        },
        [
            {...includeAddKeySigParams}
        ],
        0n,
    );

    const registerFidTxParam: any = {
        from: userWallet.address,
        to: farcaster.contractAddresses.BUNDLER_ADDRESS,
        data: registerCalldata.data,
        value: price,
        gasLimit: 10000000n
    }

    const tx = await userWallet.sendTransaction(registerFidTxParam);
    const receipt = await tx.wait();

    console.log("================== complete ==================");
    console.log(receipt);
    console.log("\n==============================================");
    console.log(`private key`, bytesToHex(ed25519PrivateKey))
    console.log(`public  key`, bytesToHex(ed25519PublicKey))
})()