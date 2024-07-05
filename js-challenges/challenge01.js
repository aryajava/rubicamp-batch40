// function sum() {
//     let val = 0
//     for (i of arguments) {
//         val +=i
//     }
//     return console.log(val)
// }

const sum = (...args) => args.reduce((a, b) => a + b)

console.log(sum(1,2,7)) // 10
console.log(sum(1,4)) // 5
console.log(sum(11)) // 11
console.log(sum(10,3,6,7,9)) // 35