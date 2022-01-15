
import {useEffect, useState} from "react";
import { Keyring } from "@polkadot/api";
import { ApiPromise, WsProvider } from '@polkadot/api';

function CommitPuzzle (props) {

    let [api, setApi] = useState(null)

    useEffect(()=> {
        if (props.puzzle_hash && props.answer_hash) {
            const wsProvider = new WsProvider('ws://127.0.0.1:7745');
            ApiPromise.create({ provider: wsProvider }).then((api)=>{
                console.log("Genesis hash:", api.genesisHash.toHex());
                setApi(api)
            })
        }
    }, [props.puzzle_hash, props.answer_hash])


    const commitToChain = async function () {

        const keyring = new Keyring({ type: 'sr25519' });
        // keyring.setSS58Format(1024);
        const acc_alice = keyring.addFromUri('//Alice')
        console.log('alice address: ', acc_alice.address)
        const acc_bob = keyring.addFromUri('//Bob')
        console.log('bob address: ', acc_bob.address)

        const decimals = api.registry.chainDecimals;
        const balance_amount = 10000 // BigInt(props.deposit_balance * (18 ** decimals))

        // atochaModule create_puzzle (puzzlehash,answerhash,amount,version)
        console.log(props.puzzle_hash, props.answer_hash, props.deposit_balance, 1)
        const create_tx = await api.tx.atochaModule
            .createPuzzle(props.puzzle_hash, props.answer_hash, props.deposit_balance, 1)
            .signAndSend(acc_alice,(result) => {
                if (result.status.isInBlock) {
                    console.log(`Transaction included at blockHash: ${result.status.asInBlock}`);
                } else if (result.status.isFinalized) {
                    console.log(`Transaction finalized at blockHash: ${result.status.asFinalized}`);
                }
            });

        // Show the hash
        console.log(`Submitted with hash ${create_tx}`);
        console.log("commitToChain.", props.puzzle_hash, props.answer_hash)

    }

    if(!props.answer_hash || props.answer_hash.length < 32){
        return (<div></div>);
    }

    return (
        <div>
            <h2>** Setup 2 : Commit puzzle to Atocha chain ** </h2>
            <div>
                Puzzle hash: {props.puzzle_hash}
            </div>
            <div>Answer hash: {props.answer_hash}</div>
            <div>Deposit balance: {props.deposit_balance}</div>
            <button onClick={commitToChain}>
                Commit puzzle.
            </button>
        </div>
    );
}

export default CommitPuzzle;
