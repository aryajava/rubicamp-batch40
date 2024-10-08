import readline from "readline";
import fs from "fs";

const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
const lenData = data.length;

console.log(`Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar ya!\n`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `Tebakan: `,
});

let index = 0;

const tebakKata = () => {
  if (index < lenData) {
    console.log(`\nPertanyaan: ${data[index].definition}`);
    rl.prompt();
  } else {
    console.log(`\nHore Anda Menang!\n`);
    rl.close();
  }
};

rl.on("line", (answer) => {
  if (index < lenData) {
    if (answer.toLowerCase() === data[index].term.toLowerCase()) {
      console.log(`Selamat Anda Benar!`);
      index++;
    } else {
      console.log(`${"wk".repeat(4)}, Anda kurang beruntung!`);
    }
    tebakKata();
  }
});

tebakKata();

