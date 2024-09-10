function stringManipulation(word) {
    const vowel_letters = ['a', 'i', 'u', 'e', 'o'];
    return vowel_letters.includes(word[0].toLowerCase())? word : word.slice(1) + word[0] + 'nyo';
}

console.log(stringManipulation('AYAM'));
console.log(stringManipulation('Bebek'));