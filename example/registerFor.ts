import { farcaster, provider } from "./common";
import { ethers } from "ethers";
import { getContractWalletAddress } from "./common/create2-factory";

(async () => {
    const ownerPrivateKey = 'OWNER PRIVATE KEY';
    const recoveryAddressPrivateKey = 'RECOVERY ADDRESS PRIVATE KEY';

    const ownerWallet = new ethers.Wallet(ownerPrivateKey, provider);
    const recoveryWallet = new ethers.Wallet(recoveryAddressPrivateKey, provider);

    const ownerContractAddress = await getContractWalletAddress(ownerWallet.address, 0);
    const recoveryContractAddress = await getContractWalletAddress(recoveryWallet.address, 0);

    const fid = await farcaster.getIdOf(ownerContractAddress)
    
    if (fid !== 0n) {
        console.log(`userFid is already registered: ${fid}`);
        return;
    }

    const price = await farcaster.getPrice(1n)
    const deadline = BigInt(Math.floor(Date.now() / 1000) + (3600 * 24));
    const nonce = await farcaster.getNonceIdGateway(ownerContractAddress);

    const registerSign = await farcaster.signRegister(
        ownerContractAddress,
        recoveryContractAddress,
        nonce,
        deadline,
        ownerWallet,
    );
    
    const calldata = await farcaster.getCalldataRegisterForIdGateWay(
        ownerContractAddress,
        recoveryContractAddress,
        deadline,
        registerSign as Uint8Array
    )

    const registerFidTxParam = {
        from: ownerWallet.address,
        to: farcaster.contractAddresses.ID_GATEWAY_ADDRESS,
        data: calldata.data,
        value: price, // price를 넣으면 rent까지 수행됨, price를 넣지 않으면 rent를 수행하지 않음
        gasLimit: 10000000n
    }

    const tx = await ownerWallet.sendTransaction(registerFidTxParam);
    const receipt = await tx.wait();
    console.log(receipt);
})()