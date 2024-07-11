import { provider, farcaster } from "./common";
import { ethers } from "ethers";

(async () => {
    const ownerPrivateKey = 'PRIVATE_KEY';
    const recoveryPrivateKey = 'PRIVATE_KEY'

    const ownerWallet = new ethers.Wallet(ownerPrivateKey, provider);
    const recoveryWallet = new ethers.Wallet(recoveryPrivateKey, provider);

    const deadline = BigInt(Math.floor(Date.now() / 1000) + (3600 * 24));
    const nonce = await farcaster.getNonceIdRegistry(recoveryWallet.address);

    const fid = await farcaster.getIdOf(ownerWallet.address)
    const signature = await farcaster.signTransfer(
        fid,
        recoveryWallet.address,
        nonce,
        deadline,
        recoveryWallet
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