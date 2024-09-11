import readline from "readline"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const sentencesManipulation = (sentence) => {
    const vowel_letters = ['a', 'i', 'u', 'e', 'o'];
    const words = sentence.split(' ');
    const proc_words = words.map(word => {
        return vowel_letters.includes(word[0].toLowerCase()) ? word : word.slice(1) + word[0] + 'nyo';
    });
    return proc_words.join(' ');
};

const askQuestion = () => {
    process.stdout.write('Tulis kalimatmu disini: ');
    
    rl.on('line', (sentence) => {
        const result = sentencesManipulation(sentence);
        console.log(`Hasil konversi: ${result}`);
        result.includes("nyo") ? process.stdout.write('Tulis kalimatmu disini: ') : ((console.log('Good bye!')), rl.close());
    });
};

askQuestion()
