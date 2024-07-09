/*
Implementasikan penggunaan readline pada fungsi yang telah dibuat di challenge #6
*/

import { sentencesManipulation } from "./challenge06.js"
import readline from "readline"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    }   
)

const askQuestion = () =>{
    rl.question("Tulis kalimatmu disini: ", (sentence)=>{
        sentence.includes("bye") || sentence.includes("Bye")? rl.close() : (console.log("Hasil konversi: ", sentencesManipulation(sentence)), askQuestion())
    })
}

askQuestion()


