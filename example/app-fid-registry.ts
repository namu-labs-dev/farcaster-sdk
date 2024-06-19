import { farcaster, provider } from "./common";
import { ethers } from "ethers";

const APP_PRIVATE_KEY = '0x7b68edaf8d4e0002a8456ff375f420e544fab8dedcf41f4948dec00f1ab0145e';
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

