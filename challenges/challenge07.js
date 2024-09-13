function weirdMultiply(number) {
    if (number < 10) return number
    let digits = number.toString().split('')
    let digit = digits.reduce((a, b) => a * parseInt(b), 1)
    return weirdMultiply(digit)
}

console.log(weirdMultiply(39)) // -> 3 * 9 = 27 -> 2 * 7 = 14 -> 1 * 4 = 4
console.log(weirdMultiply(999)) // -> 9 * 9 * 9 = 729 -> 7 * 2 * 9 = 126 -> 1 * 2 * 6 = 12 -> 1 * 2 = 2
console.log(weirdMultiply(3)) // -> 3 karena telah satu digit

