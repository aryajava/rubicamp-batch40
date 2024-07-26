-- tampilkan seluruh data mahasiswa beserta jurusannya
SELECT nim, nama_mahasiswa, alamat_mahasiswa, jurusan.nama_jurusan, umur
FROM mahasiswa
JOIN jurusan USING (jurusan_id);

-- tampilkan mahasiswa yang memiliki umur dibawah 20 tahun
SELECT nim, nama_mahasiswa, alamat_mahasiswa, jurusan.nama_jurusan, umur
FROM mahasiswa
JOIN jurusan USING (jurusan_id)
WHERE umur < 20 ;

-- tampilkan mahasiswa yang memiliki nilai B keatas
SELECT nim, nama_mahasiswa, matakuliah.nama_matakuliah, nilai
FROM nilai_mahasiswa
INNER JOIN mahasiswa USING (nim)
INNER JOIN matakuliah USING (matakuliah_id)
WHERE 'B' > nilai;

-- tampilkan mahasiswa yang memiliki jumlah sks lebih dari 10
SELECT nim, nama_mahasiswa, jurusan.nama_jurusan, sum(matakuliah.sks) AS total_sks
FROM nilai_mahasiswa
INNER JOIN mahasiswa USING (nim)
INNER JOIN matakuliah USING (matakuliah_id)
INNER JOIN jurusan USING(jurusan_id)
GROUP BY nim, nama_mahasiswa
HAVING sum(matakuliah.sks) > 10;

-- tampilkan mahasiswa yang mengambil matakuliah 'data mining'
SELECT nim, nama_mahasiswa, jurusan.nama_jurusan, matakuliah.nama_matakuliah
FROM nilai_mahasiswa
INNER JOIN mahasiswa USING (nim)
INNER JOIN matakuliah USING (matakuliah_id)
INNER JOIN jurusan USING(jurusan_id)
WHERE matakuliah.nama_matakuliah = 'data mining';

-- tampilkan jumlah mahasiswa untuk setiap dosennya
SELECT dosen.dosen_id, dosen.nama_dosen, count(DISTINCT mahasiswa.nim) AS jumlah_mahasiswa
FROM nilai_mahasiswa
INNER JOIN mahasiswa USING (nim)
INNER JOIN dosen USING (dosen_id)
GROUP BY dosen.dosen_id, dosen.nama_dosen;

-- urutkan mahasiswa berdasarkan umurnya
SELECT nim, nama_mahasiswa, alamat_mahasiswa, jurusan.nama_jurusan, (strftime('%Y', 'now') - strftime('%Y', tgl_lahir)) - (strftime('%m-%d', 'now') < strftime('%m-%d', tgl_lahir)) AS umur
FROM mahasiswa
JOIN jurusan USING (jurusan_id)
ORDER BY umur;

-- menampilkan matakuliah dengan nilai D dan E, serta menampilkan data mahasiswa jurusan dan dosen
SELECT *
FROM nilai_mahasiswa
INNER JOIN mahasiswa USING (nim)
INNER JOIN matakuliah USING (matakuliah_id)
INNER JOIN jurusan USING(jurusan_id)
INNER JOIN dosen USING (dosen_id)
WHERE nilai IN ('D','E');