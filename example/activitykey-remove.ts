import { farcaster, provider } from './common';
import { ethers } from "ethers";

import { ed25519 } from '@noble/curves/ed25519';

(async () => {
    const userWallet = new ethers.Wallet(
        '0x7b68edaf8d4e0002a8456ff375f420e544fab8dedcf41f4948dec00f1ab0145e',
        provider,
    );
    const removeActivityKey = '0x66c51a4b94e40762b0549155924506e056695c09dd95c71c51759b8c71a8ad5b';
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