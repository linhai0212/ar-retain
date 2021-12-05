
import Arweave from 'arweave';
import { useState } from "react"

function CreateWallet() {
  // Or manually specify a host
  const arweave = Arweave.init({
    host: '127.0.0.1',
    port: 1984,
    protocol: 'http'
  });

  const [wallet_address, setWalletAddress] = useState('')
  arweave.wallets.generate().then((key) => {
    console.log(key);
    arweave.wallets.jwkToAddress(key).then((address) => {
      console.log(address)
      setWalletAddress(address)

      arweave.wallets.getBalance(address).then((balance) => {
        let winston = balance;
        let ar = arweave.ar.winstonToAr(balance);
        console.log(winston);
        console.log(ar);
      });

    })
  });

  return (
    <div> **  {wallet_address} **</div>
  );
}

export default CreateWallet;
