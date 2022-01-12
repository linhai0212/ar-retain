
// import Arweave from 'arweave';
// import { useState } from "react"

import {useEffect, useState} from "react";
import TestWeave from "testweave-sdk";
import MakeAnswerSha256WithSimple from "../../units/MakeAnswerSha256";
import CommitPuzzle from "./CommitPuzzleToChain";

function CreatePuzzle (props) {

    let [current_address, setCurrentAddress] = useState('None')
    let [current_balance, setCurrentBalance] = useState('0')
    let [arweave_puzzle_hash, setArweavePuzzleHash] = useState('--')
    let [arweave_answer_hash, setArweaveAnswerHash] = useState('--')

    useEffect(()=> {
        if (props.arweave) {
            let arweave = props.arweave

            TestWeave.init(arweave).then(async (testArweave) => {
                // console.log("Test-Weave running...")
                // console.log(testArweave.rootJWK)

                // Old code is props.key_json
                arweave.wallets.jwkToAddress(testArweave.rootJWK).then((addr) => {
                    console.log('jwk to address:', addr);
                    setCurrentAddress(addr)
                    arweave.wallets.getBalance(addr).then((bal) => {
                        const balance = arweave.ar.winstonToAr(bal)
                        console.log('get balance: ', balance)
                        setCurrentBalance(balance)
                    })
                })
            })

        }
    }, [props.arweave])


    const saveContent = async function () {
        let puzzle_title = document.getElementById('puzzle_title').value
        let puzzle_content = document.getElementById('puzzle_content').value
        let puzzle_answer = document.getElementById('puzzle_answer').value
        let puzzle_explain = document.getElementById('puzzle_explain').value

        console.log("Save puzzle to arweave.", puzzle_title, puzzle_content, puzzle_answer, puzzle_explain)

        if (props.arweave) {
            let arweave = props.arweave

            TestWeave.init(arweave).then(async (testArweave) => {
                // Create save json.
                let to_json = {}
                to_json.puzzle_title = puzzle_title
                to_json.puzzle_content = puzzle_content
                to_json.puzzle_explain = puzzle_explain
                console.log("Will save json : ", JSON.stringify(to_json))

                let result = await arweave.createTransaction({
                    // data: Buffer.from('Some data', 'utf8')
                    data: JSON.stringify(to_json)
                }, testArweave.rootJWK)
                //
                await arweave.transactions.sign(result, testArweave.rootJWK);
                console.log(result)

                var response = await arweave.transactions.post(result);

                // Mines a new block in the TestWeave Network
                await testArweave.mine();

                // Check mines block status
                const statusAfterMine = await arweave.transactions.getStatus(result.id)
                console.log("Mine block status: ", statusAfterMine.status, "Block hash:", statusAfterMine.confirmed);

                if (statusAfterMine.status == 200) {
                    setArweavePuzzleHash(result.id)
                    let answer_hash = MakeAnswerSha256WithSimple(puzzle_answer, result.id)
                    setArweaveAnswerHash(answer_hash)
                }
          })
        }
    }

    return (
        <div>
            <h2>** Create Puzzle with Arweave ** </h2>
            <div>
                <div>Current Address : {current_address}</div>
                <div>Current balance : {current_balance}</div>
                <form action='#'>
                    <div>
                        <div>Puzzle title:</div>
                        <input id='puzzle_title'></input>
                        <div>Puzzle content:</div>
                        <textarea id='puzzle_content'></textarea>
                        <div>Answer text:</div>
                        <textarea id='puzzle_answer'></textarea>
                        <div>Puzzle explain: (Option)</div>
                        <textarea id='puzzle_explain'></textarea>
                    </div>
                    <div>
                        <button onClick={saveContent}>
                            Submit.
                        </button>
                    </div>
                </form>
                <div>
                    <div>
                        Puzzle hash: <a href={"http://localhost:1984/"+arweave_puzzle_hash}>{arweave_puzzle_hash} </a>
                    </div>
                    <div>Answer hash: {arweave_answer_hash}</div>
                    <div>
                        <CommitPuzzle puzzle_hash={arweave_puzzle_hash} answer_hash={arweave_answer_hash}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePuzzle;
