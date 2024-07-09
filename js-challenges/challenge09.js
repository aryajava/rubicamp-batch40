/*
Buat sebuah function bernama spiral yang memiliki sebuah parameter (param1)
yang berisi angka. Setelah itu, generate secara otomatis array sebanyak param1 x param1 dan
menampilkan juga urutan angka sesuai dengna pola spiral.
*/

/*
Contoh 1:
console.log(spiral(5))

Ilustrasi:
0, 1, 2, 3, 4
5, 6, 7, 8, 9
10, 11, 12, 13, 14
15, 16, 17, 18, 19
20, 21, 22, 23, 24

Tampilan result nya:
[0,1,2,3,4,9,14,19,24,23,22,21,20,15,19,5,6,7,8,13,18,17,16,11,12]

Contoh 2:
console.log(spiral(7))

Ilustrasi:
0,1,2,3,4,5,6
7,8,9,10,11,12,13
14,15,16,17,18,19,20
21,22,23,24,25,26,27
28,29,30,31,32,33,34
35,36,37,38,39,40,41
42,43,44,45,46,47,48

Tampilan result nya:
[0,1,2,3,4,5,6,13,20,27,34,41,48,47,46,45,44,43,42,35,28,21,14,7,8,9,10,11,12,19,26,33,40,
39,38,37,36,29,22,15,16,17,18,25,32,31,30,23,24]
*/

function spiral(param1) {
    const matrix = []
    let counter = 0
    // Buat matrix dengan ukuran param1 x param1
    for (let i = 0; i < param1; i++) {
        const row = []
        for (let j = 0; j < param1; j++) {
            row.push(counter++)
        }
        matrix.push(row)
    }
    const result = []
    // Mengurutkan elemen dengan pola spiral
    while (matrix.length > 0){
        result.push(...matrix.shift()) // Ambil baris atas
        matrix.forEach(row => result.push(row.pop())) // Ambil elemen terakhir
        if (matrix.length > 0) {
            result.push(...matrix.pop().reverse()) // Ambil baris bawah dari belakang
        }
        for (let i = matrix.length -1; i >= 0; i--) {
            result.push(matrix[i].shift()) // Ambil elemen pertama dari setiap baris yang tersisa dari bawah
        }
        // kembali looping jika matrix masih ada
    }
    return JSON.stringify(result)
}

// Contoh penggunaan
console.log(spiral(5))
console.log(spiral(6))
console.log(spiral(7))




