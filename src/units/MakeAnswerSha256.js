
import sha256 from "sha256";

function MakeAnswerSha256WithSimple(answer_txt, puzzle_hash) {
    // let final_answer = answer_txt.toLowerCase()
    // final_answer = final_answer.replace(/[^0-9a-z]/gi, '')
    // console.log("final_answer 1 = ", final_answer , "puzzle_hash = ", puzzle_hash )

    console.log("final_answer raw char = ", answer_txt )
    let final_answer = sha256(answer_txt)
    console.log("final_answer sha256 = ", final_answer , 'puzzle_hash =', puzzle_hash)
    final_answer+=puzzle_hash.toString();
    console.log("final_answer append puzzle-hash = ", final_answer )
    final_answer = sha256(final_answer)
    console.log("final_answer final sha256 = ", final_answer )
    return final_answer
}
export default MakeAnswerSha256WithSimple;