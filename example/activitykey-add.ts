import { ed25519 } from '@noble/curves/ed25519';
import { wallet as appWallet, farcaster, provider } from './common';
import { ethers } from "ethers";
import { bytesToHex } from 'viem';

(async () => {
    const userWallet = new ethers.Wallet(
        '0x7b68edaf8d4e0002a8456ff375f420e544fab8dedcf41f4948dec00f1ab0145e',
        provider,
    );
    
    const deadline = BigInt(Math.floor(Date.now() / 1000) + (3600 * 24));
    const appFid = await farcaster.getIdOf(appWallet.address);
    const nonce = await farcaster.getNonceKeyGateway(userWallet.address);
    
    // key 등록을 위한 키 생성(ED25519)
    const ed25519PrivateKey =  ed25519.utils.randomPrivateKey();
    const ed25519PublicKey = ed25519.getPublicKey(ed25519PrivateKey);
    
    // acticity key 등록을 위한 metadata 생성
    const metadataSigForRegistryKey = await farcaster.signMetadataForRegistryKeyByAppOwner(
        appWallet, 
        appFid, 
        deadline, 
        ed25519PrivateKey
    );

    const includeAddKeySigParams= await farcaster.signAddActivityKeySig(
        userWallet, 
        metadataSigForRegistryKey, 
        nonce,
        deadline,
        ed25519PublicKey,
    );

    console.log(includeAddKeySigParams);

    const calldata = await farcaster.contracts.keyGateway.populateTransaction.add(
        includeAddKeySigParams.keyType,
        includeAddKeySigParams.key,
        includeAddKeySigParams.metadataType,
        includeAddKeySigParams.metadata,
    )

    const registerFidTxParam = {
        from: userWallet.address,
        to: farcaster.contractAddresses.KEY_GATEWAY_ADDRESS,
        data: calldata.data,
        value: 0,
        gasLimit: 10000000n
    }

    const tx = await userWallet.sendTransaction(registerFidTxParam);
    const receipt = await tx.wait();
    
    console.log("================== complete ==================");
    console.log(receipt);
    console.log("\n==============================================");
    console.log(`private key`, bytesToHex(ed25519PrivateKey))
    console.log(`public  key`, bytesToHex(ed25519PublicKey))
})();
