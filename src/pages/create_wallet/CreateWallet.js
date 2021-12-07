

import {useEffect, useState} from "react"

function CreateWallet(props) {

  const [wallet_address, setWalletAddress] = useState('')
  console.log(props)
  useEffect(()=> {
    if (props.arweave) {
      let arweave = props.arweave
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
    }
  }, [props.arweave])

  return (
    <div> **  {wallet_address} **</div>
  );
}

export default CreateWallet;
