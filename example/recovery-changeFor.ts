import { farcaster, provider } from "./common";
import { ethers } from "ethers";
import { getContractWalletAddress } from "./common/create2-factory";

(async () => {
    const ownerPrivateKey = 'OWNER PRIVATE KEY';
    const changeRecoveryPrivateKey = 'RECOVERY ADDRESS PRIVATE KEY'; // 변결될 recovery address의 owner의 privatekey

    const ownerWallet = new ethers.Wallet(ownerPrivateKey, provider);
    const changeRecoveryWallet = new ethers.Wallet(changeRecoveryPrivateKey, provider);

    const ownerContractAddress = await getContractWalletAddress(ownerWallet.address, 0);
    const changedRecoveryContractAddress = await getContractWalletAddress(changeRecoveryWallet.address, 0);

    const deadline = BigInt(Math.floor(Date.now() / 1000) + (3600 * 24));
    
    const ownerContractNonce = await farcaster.getNonceIdRegistry(ownerContractAddress);

    const fid = await farcaster.getIdOf(ownerContractAddress)
    
    console.log(`fid: ${fid}`);
    console.log(`recovery address: ${ownerContractAddress} -> ${changedRecoveryContractAddress}`)
    
    const ownerSignature = await farcaster.signChangeRecoveryAddress(
        fid,
        ownerContractAddress,
        changedRecoveryContractAddress,
        ownerContractNonce,
        deadline,
        ownerWallet
    )

    const calldata = await farcaster.contracts.idRegistry.populateTransaction.changeRecoveryAddressFor(
        ownerContractAddress,
        changedRecoveryContractAddress,
        deadline,
        ownerSignature,
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