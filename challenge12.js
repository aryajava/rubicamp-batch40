import fs from "fs";
import readline from "readline";

// Mengambil argument dari command line
const arg = process.argv.slice(2, 3);
const lenArg = arg.length;

if (lenArg === 0) {
  console.log(`Tolong sertakan nama file sebagai inputan soalnya.\nMisalnya 'node input.js data.json'.`);
  process.exit();
}

// Membuat interface readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Variabel
let index = 0;
let wAnsw = 0;
let skippedQuestions = [];
let data = [];

// Fungsi untuk menampilkan pertanyaan
const _pertanyaan = () => {
  if (index < data.length) {
    console.log(`\nPertanyaan: ${data[index].definition}`);
    // process.stdout.write('Tebakan: ');
    rl.setPrompt("Tebakan: ");
    rl.prompt();
  } else if (skippedQuestions.length > 0) {
    data = skippedQuestions.slice();
    index = 0;
    wAnsw = 0;
    skippedQuestions = [];
    _pertanyaan();
  } else {
    console.log("\nAnda Berhasil!");
    rl.close();
  }
};

// Fungsi untuk memproses jawaban
const _jawaban = (answer) => {
  if (answer.toLowerCase() === "skip") {
    skippedQuestions.push(data[index]);
    wAnsw = 0;
    index++;
    _pertanyaan();
  } else if (answer.toLowerCase() === data[index].term.toLowerCase()) {
    console.log("\nAnda Beruntung!");
    wAnsw = 0;
    index++;
    _pertanyaan();
  } else {
    wAnsw++;
    console.log(`\nAnda kurang beruntung! Anda telah salah ${wAnsw} kali, silakan coba lagi.`);
    // process.stdout.write('Tebakan: ');
    rl.setPrompt("Tebakan: ");
    rl.prompt();
  }
};

// Fungsi utama untuk menjalankan permainan
const gameTebakKata = () => {
  try {
    data = JSON.parse(fs.readFileSync(arg[0], "utf-8"));
    const lenData = data.length;
    const soalValid = (x) => {
      return Array.isArray(x) && x.every((key) => typeof key.definition === "string" && typeof key.term === "string");
    };
    if (lenData !== 0 && soalValid(data)) {
      console.log(`Selamat Datang di permainan 'Tebak-tebakan'. Kamu akan diberikan pertanyaan dari file '${arg[0]}'.\nUntuk bermain, jawablah dengan jawaban yang sesuai.`);
      _pertanyaan();
      rl.on("line", (answer) => {
        _jawaban(answer);
      });
    } else {
      console.log(`Soal '${arg[0]}' tidak valid.`);
      rl.close();
    }
  } catch (err) {
    console.error(`Gagal membaca file soal: ${err.message}`);
    rl.close();
  }
};

gameTebakKata();
