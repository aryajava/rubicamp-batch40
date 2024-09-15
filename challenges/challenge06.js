function sentencesManipulation(sentence) {
    const vowel_letters = ['a', 'i', 'u', 'e', 'o'];
    const words = sentence.split(' ');
    const result = [];
    for (let i = 0; i < words.length; i++) {
        result.push(vowel_letters.includes(words[i][0]) ? words[i] : words[i].slice(1) + words[i][0] + 'nyo');
    }
    console.log(result.join(' '));

    // let proc_words = words.map(word => {
    //     return vowel_letters.includes(word[0].toLowerCase()) ? word : word.slice(1) + word[0] + 'nyo';
    // })

    // console.log(proc_words.join(' '));
}

sentencesManipulation('ibu pergi ke pasar bersama aku');