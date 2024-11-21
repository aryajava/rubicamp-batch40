function pola(str) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (eval(str.replace("#", i).replace("#", j).replace("=", "=="))) {
        return [i, j];
      }
    }
  }
}

console.log(pola("42#3 * 188 = 80#204")); // result: [8, 5]
console.log(pola("8#61 * 895 = 78410#5")); // result: [7, 9]
