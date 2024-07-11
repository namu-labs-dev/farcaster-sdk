import { farcaster, provider } from "./common";
import { ethers } from "ethers";

(async () => {
    const ownerPrivateKey = 'PRIVATE_KEY';
    const toPrivateKey = 'PRIVATE_KEY'

    const ownerWallet = new ethers.Wallet(ownerPrivateKey, provider);
    const toWallet = new ethers.Wallet(toPrivateKey, provider);

    const deadline = BigInt(Math.floor(Date.now() / 1000) + (3600 * 24));
    const nonce = await farcaster.getNonceIdRegistry(toWallet.address);

    const fid = await farcaster.getIdOf(ownerWallet.address)

    const signature = await farcaster.signTransfer(
        fid,
        toWallet.address,
        nonce,
        deadline,
        toWallet
    )
    console.log(`fid: ${fid}`);
    console.log(signature)

    const calldata = await farcaster.contracts.idRegistry.populateTransaction.transfer(
        toWallet.address,
        deadline,
        signature
    )

    const registerFidTxParam = {
        from: ownerWallet.address,
        to: farcaster.contractAddresses.ID_REGISTRY_ADDRESS,
        data: calldata.data,
        value: 0,
        gasLimit: 10000000n
    }

    const tx = await ownerWallet.sendTransaction(registerFidTxParam);
    const receipt = await tx.wait();
    console.log(receipt);
})()