import { provider, wallet as appWallet, farcaster } from './common';
import { ethers } from 'ethers';

const userWallet = new ethers.Wallet(
    '0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356',
    provider,
);

const appFid = 1n;

(async () => {
    const recovery = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

    const price = await farcaster.getPrice(1n)
    console.log(`price: ${price.toString()}, ${price.toString().length}`);

    const fid = await farcaster.getIdOf(userWallet.address)
    console.log(`fid: ${fid}`);

    const deadline = BigInt(Math.floor(Date.now() / 1000) + (3600 * 24));
    const registerSignature = await farcaster.signRegister(
        userWallet.address,
        recovery,
        await farcaster.getNonceKeyRegistry(userWallet.address),
        deadline,
        userWallet,
    );

    console.log(`signature:`);
    console.log(registerSignature);
    const {
        ed25519d25519PrivateKey, ed25519PublicKey, param
    } = await farcaster.signAddSignature(
        userWallet, 
        appWallet, 
        await farcaster.getNonceKeyGateway(userWallet.address),
        appFid,
        deadline
    );
    console.log(param)
    console.log(`private key`, ed25519d25519PrivateKey)
    console.log(`public  key`, ed25519PublicKey)
    // return;
    console.log(`activityKey:`);
    console.log(param)
    const registerCalldata = await farcaster.contracts.bundler.populateTransaction.register(
        {
            to: userWallet.address,
            recovery,
            sig: registerSignature,
            deadline
        },
        [
            {...param}
        ],
        0n,
    );

    const registerFidTxParam: any = {
        from: userWallet.address,
        to: farcaster.contractAddresses.BUNDLER_ADDRESS,
        data: registerCalldata.data,
        value: price,
        gasLimit: 10000000n
    }

    const tx = await userWallet.sendTransaction(registerFidTxParam);
    const receipt = await tx.wait();
    console.log(receipt);
})()