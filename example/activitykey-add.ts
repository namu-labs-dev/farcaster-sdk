import { wallet as appWallet, farcaster, provider } from './common';
import { ethers } from "ethers";

(async () => {
    const userWallet = new ethers.Wallet(
        '0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356',
        provider,
    );
    
    const deadline = BigInt(Math.floor(Date.now() / 1000) + (3600 * 24));
    const appFid = 1n;
    const nonce = await farcaster.getNonceKeyGateway(userWallet.address);
    const {
        ed25519d25519PrivateKey, ed25519PublicKey, param
    } = await farcaster.signAddSignature(
        userWallet, 
        appWallet, 
        nonce,
        appFid,
        deadline
    );

    const calldata = await farcaster.contracts.keyGateway.populateTransaction.add(
        param.keyType,
        param.key,
        param.metadataType,
        param.metadata,
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
    
    console.log(receipt);
    console.log('privatekey (ED25519): ', ed25519d25519PrivateKey);
    console.log('publickey  (ED25519): ', ed25519PublicKey);
})();
