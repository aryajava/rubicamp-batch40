function spellingWord(word) {
    const dictionary = ['pro', 'gram', 'merit', 'program', 'it', 'programmer'];
    let results = [];

    const findWord = (currWord, currResult) => {
        if (currWord.length === 0) {
            results.push(currResult.join(','));
            return;
        }
        for (let i = 1; i <= currWord.length; i++) {
            const subWord = currWord.slice(0, i);
            if (dictionary.includes(subWord)) {
                findWord(currWord.slice(i), [...currResult, subWord]);
            }
        }
    }
    findWord(word.toLowerCase(), []);
    results.length === 0 ? console.log("no way") : results.forEach(result => console.log(result));
    // return results.length === 0 ? "no way" : results.join('\n');
}

// const testInput = ["program", "programit", "programmerit", "programlala", "proletarian"]
// testInput.forEach(item => {
//     console.log("=".repeat(15));
//     console.log(`Sample Input:\n${item}\n`);
//     console.log(`Sample Output:\n${spellingWord(item)}\n`)
// });

spellingWord('program');
spellingWord('programit');
spellingWord('programmerit');
spellingWord('programlala');
spellingWord('proletarian');