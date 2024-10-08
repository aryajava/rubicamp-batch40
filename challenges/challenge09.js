function spiral(param1) {
  const matrix = [];
  let counter = 0;
  // Buat matrix dengan ukuran param1 x param1
  for (let i = 0; i < param1; i++) {
    matrix[i] = [];
    for (let j = 0; j < param1; j++) {
      matrix[i][j] = counter++;
    }
  }
  //   console.log(matrix);

  let x = 0;
  let y = 0;
  let batasAtas = param1;
  let batasBawah = 0;

  const result = [];

  while (result.length < param1 * param1) {
    // ke kanan
    for (; x < batasAtas; x++) {
      result.push(matrix[y][x]);
    }
    x--;
    y++;
    // ke bawah
    for (; y < batasAtas; y++) {
      result.push(matrix[y][x]);
    }
    y--;
    x--;
    // ke kiri
    for (; x >= batasBawah; x--) {
      result.push(matrix[y][x]);
    }
    x++;
    y--;
    // ke atas
    for (; y > batasBawah; y--) {
      result.push(matrix[y][x]);
    }
    x++;
    y++;
    batasAtas--;
    batasBawah++;
  }
  console.log(result);
}

spiral(5);
spiral(6);
spiral(7);

