function stringManipulation(word) {
    vowel_letters = ['a', 'i', 'u', 'e', 'o']
    // Menggunakan 'includes'
    return vowel_letters.includes(word[0])?  word : word.slice(1) + word[0] + 'nyo'

    // Menggunakan nested loop 'for'
    // for (let i = 0; i <= word.length; i++) {
    //     for (let j = 0; j < vowel_letters.length; j++) {
    //         if (word[0] == vowel_letters[j]){
    //             return word
    //         }
    //         else{
    //             return word.slice(1) + word[0] + 'nyo'
    //         }
    //     }
    // }
}

console.log(stringManipulation('ayam')); // ayam
console.log(stringManipulation('bebek')); // ebekbnyo