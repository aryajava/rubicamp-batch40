function spiral(param1) {
    const matrix = [];
    let counter = 0;
    // Buat matrix dengan ukuran param1 x param1
    for (let i = 0; i < param1; i++) {
        const row = [];
        for (let j = 0; j < param1; j++) {
            row.push(counter++);
        }
        matrix.push(row);
    }
    
    // Mengurutkan elemen dengan pola spiral
    let matrixSize = matrix.length*matrix[0].length;
    let left = 0;
    let top = 0;
    let right = matrix[0].length-1;
    let bottom = matrix.length-1;
    const result = [];
    while (result.length < matrixSize){
        // Atas (kanan ke kiri)
        for (let i = left; i <= right && result.length < matrixSize; i++) {
            result.push(matrix[top][i])
        }
        top++;

        // Kanan (atas ke bawah)
        for (let i = top; i <= bottom && result.length < matrixSize; i++) {
            result.push(matrix[i][right])
        }
        right--;

        // Bawah (kanan ke kiri)
        for (let i = right; i >= left && result.length < matrixSize; i--) {
            result.push(matrix[bottom][i])
            
        }
        bottom--;

        // Kiri (bawah ke atas)
        for (let i = bottom; i >= top && result.length < matrixSize; i--) {
            result.push(matrix[i][left])
        }
        left++;
    }

    return console.log(result);
}

spiral(5)
spiral(6)
spiral(7)




