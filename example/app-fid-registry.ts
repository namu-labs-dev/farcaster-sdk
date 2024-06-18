import { farcaster, provider } from "./common";
import { ethers } from "ethers";

const APP_PRIVATE_KEY = '0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6';
const wallet = new ethers.Wallet(APP_PRIVATE_KEY, provider);

(async () => {
    const price = await farcaster.getPrice(1n);
    
    console.log(`price: ${price.toString()}, ${price.toString().length}`);

    const fid = await farcaster.getIdOf(wallet.address)
    console.log(`fid: ${fid}`);

    if (fid !== 0n) {
        return;
    } 
    const recoveryAddress = '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC';
    const registerFidCalldata = await farcaster.registerIdGateWay(
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

