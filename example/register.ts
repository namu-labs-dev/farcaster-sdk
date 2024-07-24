import { farcaster, provider } from "./common";
import { ethers } from "ethers";

(async () => {
    const ownerPrivateKey = 'OWNER PRIVATE KEY';
    const recoveryAddress = 'RECOVERY ADDRESS';

    const ownerWallet = new ethers.Wallet(ownerPrivateKey, provider);

    const price = await farcaster.getPrice(1n);
    const registerFidCalldata = await farcaster.getCalldataRegisterIdGateWay(
        recoveryAddress
    )

    const registerFidTxParam = {
        from: ownerWallet.address,
        to: farcaster.contractAddresses.ID_GATEWAY_ADDRESS,
        data: registerFidCalldata.data,
        value: price,
        gasLimit: 10000000n
    }

    const tx = await ownerWallet.sendTransaction(registerFidTxParam);
    const receipt = await tx.wait();
    console.log(receipt);
})()