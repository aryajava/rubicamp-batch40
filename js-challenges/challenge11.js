/*
Buat permainan tebak kata, gunakan file data.json untuk menyimpan pertanyaan dan jawaban
*/

import readline from "readline"
import fs from "fs"

const data = JSON.parse(fs.readFileSync("./js-challenges/data.json", "utf-8"))

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    }   
)

let score = 0, index = 0

function askQuestion() {
    if (index < data.length) {
        rl.question(`Pertanyaan: ${data[index].definition}\nTebakan: `, answer => {
            console.log(answer.toLowerCase() === data[index].term.toLowerCase() ? "Jawaban benar!\n" : "Maaf, jawaban Anda belum tepat\n")
            score += answer.toLowerCase() === data[index].term.toLowerCase() ? 1 : 0
            index++
            askQuestion()
        });
    } else {
        console.log(score >= 2 ? "Selamat Anda menang!\n" : "Coba lagi\n")
        rl.close()
    }    
}

askQuestion()