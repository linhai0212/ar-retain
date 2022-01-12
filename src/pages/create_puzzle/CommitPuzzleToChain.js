
import {useEffect, useState} from "react";
import { Keyring } from "@polkadot/api";

function CommitPuzzle (props) {

    useEffect(()=> {
        if (props.puzzle_hash && props.answer_hash) {

        }
    }, [props.puzzle_hash, props.answer_hash])


    const commitToChain = async function () {
        // const acc_alice = keyring.addFromUri('//Alice');
        // const acc_bob = keyring.addFromUri('//Bob');


        console.log("commitToChain.", props.puzzle_hash, props.answer_hash)

    }

    return (
        <div>
            <button onClick={commitToChain}>
                Commit puzzle.
            </button>
        </div>
    );
}

export default CommitPuzzle;
