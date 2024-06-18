import { ed25519 } from '@noble/curves/ed25519';
import { bytesToHex } from '@noble/curves/abstract/utils';

(async () => {
    const priv = ed25519.utils.randomPrivateKey();
    const pub = ed25519.getPublicKey(priv);
    console.log('privatekey');
    console.log(priv);
    console.log(bytesToHex(priv));
    console.log('\n')
    console.log('publickey');
    console.log(pub);
    console.log(bytesToHex(pub));
})();