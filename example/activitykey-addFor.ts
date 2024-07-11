import { ed25519 } from '@noble/curves/ed25519';
import { wallet as appWallet, farcaster, provider } from './common';
import { ethers } from "ethers";
import { bytesToHex } from 'viem';
import { getContractWalletAddress } from './common/create2-factory';

(async () => {
    const ownerWallet = new ethers.Wallet(
        'OWNER PRIVATE KEY',
        provider,
    );
    
    const deadline = BigInt(Math.floor(Date.now() / 1000) + (3600 * 24));
    const appFid = await farcaster.getIdOf(appWallet.address);
    
    
    const custodyAddress = await getContractWalletAddress(ownerWallet.address, 0);
    const nonce = await farcaster.getNonceKeyGateway(custodyAddress);
    
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
        custodyAddress, 
        metadataSigForRegistryKey, 
        nonce,
        deadline,
        ed25519PublicKey,
        ownerWallet
    );

    const calldata = await farcaster.contracts.keyGateway.populateTransaction.addFor(
        custodyAddress,
        includeAddKeySigParams.keyType,
        includeAddKeySigParams.key,
        includeAddKeySigParams.metadataType,
        includeAddKeySigParams.metadata,
        deadline,
        includeAddKeySigParams.sig
    )

    const registerFidTxParam = {
        from: ownerWallet.address,
        to: farcaster.contractAddresses.KEY_GATEWAY_ADDRESS,
        data: calldata.data,
        value: 0,
        gasLimit: 10000000n
    }

    const tx = await ownerWallet.sendTransaction(registerFidTxParam);
    const receipt = await tx.wait();
    
    console.log("================== complete ==================");
    console.log(receipt);
    console.log("\n==============================================");
    console.log(`private key`, bytesToHex(ed25519PrivateKey))
    console.log(`public  key`, bytesToHex(ed25519PublicKey))
})();
