// Buat sebuah function yang menerima String.
// String tersebut merupakan suatu pola perhitungan dari beberapa bilangan namun bilangan nya itu sendiri tidak lengkap
// dan tugas mu adalah menebak 1 angka yang seharusnya
// Sehingga apabila bilangan tersebut telah lengkap, maka akan membentuk suatu pola perhitungan yang benar

function pola(str) {
    let [part1, part2] = str.split('=')
    for (let i = 0; i < 10; i++) {
        let rePart1 = part1.replace('#', i)
        for (let j = 0; j < 10; j++) {
            let rePart2 = part2.replace('#', j)
            if (eval(rePart1) == rePart2) return [i, j]
        }
    }
}

console.log(pola("42#3 * 188 = 80#204")) // result: [8, 5]
console.log(pola("8#61 * 895 = 78410#5")) // result: [7, 9]