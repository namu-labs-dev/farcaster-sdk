import { farcaster, provider } from './common';
import { ethers } from "ethers";

import { ed25519 } from '@noble/curves/ed25519';
import { getContractWalletAddress } from './common/create2-factory';

(async () => {
    const ownerWallet = new ethers.Wallet(
        'OWNER PRIVATE KEY',
        provider,
    );

    const deadline = BigInt(Math.floor(Date.now() / 1000) + (3600 * 24));
    const custodyAddress = await getContractWalletAddress(ownerWallet.address, 0);

    // 등록된 activitykey by ED25519
    const removeActivityKey = '제거할 activitykey의 private key';
    const privateKeyBytes = ethers.utils.arrayify(
        removeActivityKey,
    );
    const publicKey = ed25519.getPublicKey(privateKeyBytes);


    const nonce = await farcaster.getNonceKeyRegistry(custodyAddress);

    const sig = await farcaster.signRemoveForActivityKeySig(
        custodyAddress,
        nonce,
        deadline,
        publicKey,
        ownerWallet
    )

    const calldata = await farcaster.contracts.keyRegistry.populateTransaction.removeFor(
        custodyAddress,
        publicKey,
        deadline,
        sig,
    )

    const transactionParams = {
        from: ownerWallet.address,
        to: farcaster.contractAddresses.KEY_REGISTRY_ADDRESS,
        value: 0n,
        data: calldata.data,
        gasLimit: 10000000n,
    }

    const txHash = await ownerWallet.sendTransaction(transactionParams);
    const receipt = await txHash.wait();

    console.log(receipt);
})();