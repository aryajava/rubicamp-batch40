import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout.write(`Tulis kalimatmu disini > `),
});

const sentencesManipulation = (sentence) => {
  const vowel_letters = ["a", "i", "u", "e", "o"];
  const words = sentence.split(" ");
  const proc_words = words.map((word) => {
    return vowel_letters.includes(word[0].toLowerCase()) ? word : word.slice(1) + word[0] + "nyo";
  });
  return proc_words.join(" ");
};

const askQuestion = () => {
  rl.on("line", (sentence) => {
    console.log(`Hasil konversi: ${sentencesManipulation(sentence)}`);
    process.stdout.write(`Tulis kalimatmu disini > `);
  });
  process.on("SIGINT", () => {
    process.stdout.write(`Good bye!`);
    rl.close;
    process.exit();
  });
};

askQuestion();
