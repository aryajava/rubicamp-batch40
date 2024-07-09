function sentencesManipulation(sentence) {
    const vowel_letters = ['a', 'i', 'u', 'e', 'o']
    let words = sentence.split(' ');
    let proc_words = words.map(word => {
        return vowel_letters.includes(word[0])?  word : word.slice(1) + word[0] + 'nyo'
    })
    return proc_words.join(' ')
}

export {sentencesManipulation}

// console.log(sentencesManipulation('ibu pergi ke pasar bersama aku')) // ibu ergipnyo eknyo asarpnyo ersamabnyo aku