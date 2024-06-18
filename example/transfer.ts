import { farcaster, provider } from "./common";
import { ethers } from "ethers";

(async () => {
    const ownerPrivateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
    const toPrivateKey = '0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356'

    const ownerWallet = new ethers.Wallet(ownerPrivateKey, provider);
    const toWallet = new ethers.Wallet(toPrivateKey, provider);

    const deadline = BigInt(Math.floor(Date.now() / 1000) + (3600 * 24));
    const nonce = await farcaster.getNonceIdRegistry(toWallet.address);

    const fid = await farcaster.getIdOf(ownerWallet.address)

    const signature = await farcaster.transferSignature(
        fid,
        toWallet,
        nonce,
        deadline,
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