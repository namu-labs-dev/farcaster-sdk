import { farcaster, provider } from "./common";
import { ethers } from "ethers";

const APP_PRIVATE_KEY = 'PRIVATE_KEY';
const wallet = new ethers.Wallet(APP_PRIVATE_KEY, provider);

(async () => {
    const price = await farcaster.getPrice(1n);
    
    console.log(`price: ${price.toString()}, ${price.toString().length}`);

    const fid = await farcaster.getIdOf(wallet.address)
    console.log(`fid: ${fid}`);

    if (fid !== 0n) {
        return;
    } 
    const recoveryAddress = 'ADDRESS';
    const registerFidCalldata = await farcaster.getCalldataRegisterIdGateWay(
        recoveryAddress, 
        0n, 
    )

    const registerFidTxParam: any = {
        from: wallet.address,
        to: farcaster.contractAddresses.ID_GATEWAY_ADDRESS,
        data: registerFidCalldata.data,
        value: price,
    }

    const tx = await wallet.sendTransaction(registerFidTxParam);
    const receipt = await tx.wait();
    console.log(receipt);
    console.log(registerFidTxParam);
})()

