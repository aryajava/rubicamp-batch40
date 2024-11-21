// function deretKaskus(n) {
//     let arr = [];
//     for (let i = 1; i <= n; i++) {
//         let val = i * 3
//         if (val % 5 === 0 && val % 6 === 0) {
//             arr.push("KASKUS")
//         } else if (val % 5 === 0) {
//             arr.push("KAS")
//         } else if (val % 6 === 0) {
//             arr.push(" KUS")
//         } else {
//             arr.push(val)
//         }
//     }
//     return console.log(arr)
// }

function deretKaskus(n) {
  let arr = [];
  for (let i = 1; i <= n; i++) {
    let val = i * 3;
    arr.push(val % 5 === 0 && val % 6 === 0 ? "KASKUS" : val % 5 === 0 ? "KAS" : val % 6 === 0 ? "KUS" : val);
  }
  return console.log(arr);
}

deretKaskus(10); // [3, 'KUS', 9, 'KUS', 'KAS', 'KUS', 21, 'KUS', 27, 'KASKUS']
