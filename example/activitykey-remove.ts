import { farcaster, provider } from './common';
import { ethers } from "ethers";

import { ed25519 } from '@noble/curves/ed25519';

(async () => {
    const userWallet = new ethers.Wallet(
        '0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356',
        provider,
    );
    const removeActivityKey = '0x6bd3b931239881fce3a9f53b50abd23e2d76e2aac73c296d4d70d41244cbdd47';
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