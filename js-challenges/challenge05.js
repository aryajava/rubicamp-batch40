function stringManipulation(word) {
    const vowel_letters = ['a', 'i', 'u', 'e', 'o'];
    return vowel_letters.includes(word[0])? word : word.slice(1) + word[0] + 'nyo';
}

console.log(stringManipulation('ayam'));
console.log(stringManipulation('bebek'));