import { provider, farcaster } from "./common";
import { ethers } from "ethers";

(async () => {
    const ownerPrivateKey = '0x7b68edaf8d4e0002a8456ff375f420e544fab8dedcf41f4948dec00f1ab0145e';
    const recoveryPrivateKey = '0xe20e0200c2fb1eca38ddf3985fac10b747015cd985d4ff56bbc36d03d30c1b5a'

    const ownerWallet = new ethers.Wallet(ownerPrivateKey, provider);
    const recoveryWallet = new ethers.Wallet(recoveryPrivateKey, provider);

    const deadline = BigInt(Math.floor(Date.now() / 1000) + (3600 * 24));
    const nonce = await farcaster.getNonceIdRegistry(recoveryWallet.address);

    const fid = await farcaster.getIdOf(ownerWallet.address)
    const signature = await farcaster.signTransfer(
        fid,
        recoveryWallet,
        nonce,
        deadline,
    )

    const calldata = await farcaster.contracts.idRegistry.populateTransaction.recover(
        ownerWallet.address,
        recoveryWallet.address,
        deadline,
        signature
    )

    const registerFidTxParam = {
        from: recoveryWallet.address,
        to: farcaster.contractAddresses.ID_REGISTRY_ADDRESS,
        data: calldata.data,
        value: 0,
        gasLimit: 10000000n
    }

    const tx = await recoveryWallet.sendTransaction(registerFidTxParam);
    const receipt = await tx.wait();
    console.log(receipt);
})()