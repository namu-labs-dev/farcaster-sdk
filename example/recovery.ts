import { provider, farcaster } from "./common";
import { ethers } from "ethers";

(async () => {
    const ownerPrivateKey = '0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356';
    const recoveryPrivateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'

    const ownerWallet = new ethers.Wallet(ownerPrivateKey, provider);
    const recoveryWallet = new ethers.Wallet(recoveryPrivateKey, provider);

    const deadline = BigInt(Math.floor(Date.now() / 1000) + (3600 * 24));
    const nonce = await farcaster.getNonceIdRegistry(recoveryWallet.address);

    const fid = await farcaster.getIdOf(ownerWallet.address)
    const signature = await farcaster.transferSignature(
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