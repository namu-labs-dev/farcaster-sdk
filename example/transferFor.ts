import { farcaster, provider } from "./common";
import { ethers } from "ethers";
import { getContractWalletAddress } from "./common/create2-factory";

(async () => {
    const ownerPrivateKey = 'OWNER PRIVATE KEY';
    const toPrivateKey = 'TO PRIVATE KEY'

    const fromWallet = new ethers.Wallet(ownerPrivateKey, provider);
    const toWallet = new ethers.Wallet(toPrivateKey, provider);

    const fromContractAddress = await getContractWalletAddress(fromWallet.address, 0);
    const toContractAddress = await getContractWalletAddress(toWallet.address, 0);

    const deadline = BigInt(Math.floor(Date.now() / 1000) + (3600 * 24));
    
    const fromContractNonce = await farcaster.getNonceIdRegistry(fromContractAddress);
    const toContractNonce = await farcaster.getNonceIdRegistry(toContractAddress);

    const fid = await farcaster.getIdOf(fromContractAddress)

    const fromSignature = await farcaster.signTransfer(
        fid,
        toContractAddress,
        fromContractNonce,
        deadline,
        fromWallet
    )
    
    const toSignature = await farcaster.signTransfer(
        fid,
        toContractAddress,
        toContractNonce,
        deadline,
        toWallet
    )

    const calldata = await farcaster.contracts.idRegistry.populateTransaction.transferFor(
        fromContractAddress,
        toContractAddress,
        deadline,
        fromSignature,
        deadline,
        toSignature
    )

    const registerFidTxParam = {
        from: fromWallet.address,
        to: farcaster.contractAddresses.ID_REGISTRY_ADDRESS,
        data: calldata.data,
        value: 0,
        gasLimit: 10000000n
    }

    const tx = await fromWallet.sendTransaction(registerFidTxParam);
    const receipt = await tx.wait();
    console.log(receipt);
})()