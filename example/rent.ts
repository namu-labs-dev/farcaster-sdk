import { farcaster, provider } from './common';
import { ethers } from "ethers";

(async () => {
    const userWallet = new ethers.Wallet(
        '0x7b68edaf8d4e0002a8456ff375f420e544fab8dedcf41f4948dec00f1ab0145e',
        provider,
    );

    const storageUnit = 2n; // min: 1n
    const fid = await farcaster.getIdOf(userWallet.address)

    if (BigInt(fid) === 0n) {
        return;
    }

    const price = await farcaster.getPrice(1n)
    const calldata = await farcaster.contracts.storageRegistry.populateTransaction.rent(
        fid,
        storageUnit,
    )

    console.log(calldata);

    const transactionParams = {
        from: userWallet.address,
        to: farcaster.contractAddresses.STORAGE_REGISTRY_ADDRESS,
        value: price,
        data: calldata.data,
        gasLimit: 10000000n,
    }

    const tx = await userWallet.sendTransaction(transactionParams)
    const receipt = await tx.wait();

    console.log(receipt)
})();