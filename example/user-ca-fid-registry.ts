import { ed25519 } from '@noble/curves/ed25519';
import { provider, wallet as appWallet, farcaster } from './common';
import { ethers } from 'ethers';
import { bytesToHex } from 'viem';
import { getContractWalletAddress } from './common/create2-factory';

const ownerWallet = new ethers.Wallet(
    'OWNER PRIVATE KEY',
    provider,
);

(async () => {

    const recovery = 'RECOVERY ADDRESS';

    const price = await farcaster.getPrice(1n)
    const deadline = BigInt(Math.floor(Date.now() / 1000) + (3600 * 24));

    const ownerContractAddress = await getContractWalletAddress(ownerWallet.address, 0);

    const appFid = await farcaster.getIdOf(appWallet.address)
    const userFid = await farcaster.getIdOf(ownerContractAddress)

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
        ownerContractAddress,
        recovery,
        await farcaster.getNonceKeyRegistry(ownerContractAddress),
        deadline,
        ownerWallet,
    );
    
    // key 등록을 위한 키 생성(ED25519)
    const ed25519PrivateKey =  ed25519.utils.randomPrivateKey();
    const ed25519PublicKey = ed25519.getPublicKey(ed25519PrivateKey);
    
    // acticity key 등록을 위한 metadata 생성
    const metadataSigForRegistryKey = await farcaster.signMetadataForRegistryKeyByAppOwner(appWallet, appFid, deadline, ed25519PrivateKey);

    const includeAddKeySigParams = await farcaster.signAddActivityKeySig(
        ownerContractAddress, 
        metadataSigForRegistryKey, 
        await farcaster.getNonceKeyGateway(ownerContractAddress),
        deadline,
        ed25519PublicKey,
        ownerWallet,
    );
    
    const registerCalldata = await farcaster.contracts.bundler.populateTransaction.register(
        {
            to: ownerContractAddress,
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
        from: ownerWallet.address,
        to: farcaster.contractAddresses.BUNDLER_ADDRESS,
        data: registerCalldata.data,
        value: price,
        gasLimit: 10000000n
    }

    const tx = await ownerWallet.sendTransaction(registerFidTxParam);
    const receipt = await tx.wait();

    console.log("================== complete ==================");
    console.log(receipt);
    console.log("\n==============================================");
    console.log(`private key`, bytesToHex(ed25519PrivateKey))
    console.log(`public  key`, bytesToHex(ed25519PublicKey))
})()