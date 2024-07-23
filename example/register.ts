import { farcaster, provider } from "./common";
import { ethers } from "ethers";

(async () => {
    const ownerPrivateKey = 'OWNER PRIVATE KEY';
    const recoveryAddressPrivateKey = 'RECOVERY ADDRESS PRIVATE KEY';

    const ownerWallet = new ethers.Wallet(ownerPrivateKey, provider);
    const recoveryWallet = new ethers.Wallet(recoveryAddressPrivateKey, provider);

    const calldata = await farcaster.contracts.idRegistry.populateTransaction.register(
        recoveryWallet.address
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