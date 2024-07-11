import { provider, farcaster } from "./common";
import { ethers } from "ethers";
import { getContractWalletAddress,  } from './common/create2-factory';

(async () => {
    const ownerPrivateKey = 'OWNER PRIVATE KEY';
    const recoveryPrivateKey = 'RECOVERY PRIVATE KEY'

    const ownerWallet = new ethers.Wallet(ownerPrivateKey, provider);
    const recoveryWallet = new ethers.Wallet(recoveryPrivateKey, provider);

    const custoryAddress = await getContractWalletAddress(ownerWallet.address, 0);
    const recoveryAddress = await getContractWalletAddress(recoveryWallet.address, 0);

    const deadline = BigInt(Math.floor(Date.now() / 1000) + (3600 * 24));
    
    const fid = await farcaster.getIdOf(custoryAddress)
    const recoveryFid = await farcaster.getIdOf(recoveryAddress)
    
    console.log('fid: ', fid)
    console.log('recoveryFid: ', recoveryFid)
    console.log('custoryAddress: ', custoryAddress)
    console.log('recoveryAddress: ', recoveryAddress)
    
    const recoveryNonce = await farcaster.getNonceIdRegistry(recoveryAddress);
    console.log('nonce: ', recoveryNonce)
    console.log('nonce: ', recoveryNonce + 1n)

    const recoverySignature = await farcaster.signTransfer(
        fid,
        recoveryAddress,
        recoveryNonce,
        deadline,
        recoveryWallet
    )

    const toSignature = await farcaster.signTransfer(
        fid,
        recoveryAddress,
        recoveryNonce + 1n, // recoverySignature를 만들 때recoveryAddress의 nonce가 사용되므로 recoveryNonce + 1을 사용해야 함
        deadline,
        recoveryWallet
    )

    const calldata = await farcaster.contracts.idRegistry.populateTransaction.recoverFor(
        custoryAddress,
        recoveryAddress,
        deadline,
        recoverySignature,
        deadline,
        toSignature
    )

    const registerFidTxParam = {
        from: recoveryWallet.address,
        to: farcaster.contractAddresses.ID_REGISTRY_ADDRESS,
        data: calldata.data,
        value: 0,
        gasLimit: 10_000_000n
    }

    const tx = await recoveryWallet.sendTransaction(registerFidTxParam);
    const receipt = await tx.wait();
    console.log(receipt);
})()