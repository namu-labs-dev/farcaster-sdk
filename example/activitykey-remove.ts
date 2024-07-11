import { farcaster, provider } from './common';
import { ethers } from "ethers";

import { ed25519 } from '@noble/curves/ed25519';

(async () => {
    const userWallet = new ethers.Wallet(
        'PRIVATE_KEY',
        provider,
    );
    // 등록된 activitykey by ED25519
    const removeActivityKey = 'ED25519 activitykey PRIVATE KEY ';
    const privateKeyBytes = ethers.utils.arrayify(
        removeActivityKey,
    );
    const publicKey = ed25519.getPublicKey(privateKeyBytes);

    const calldata = await farcaster.contracts.keyRegistry.populateTransaction.remove(
        publicKey
    )

    const transactionParams = {
        from: userWallet.address,
        to: farcaster.contractAddresses.KEY_REGISTRY_ADDRESS,
        value: 0n,
        data: calldata.data,
        gasLimit: 10000000n,
    }

    const txHash = await userWallet.sendTransaction(transactionParams);
    const receipt = await txHash.wait();

    console.log(receipt);
})();