-- tampilkan seluruh data mahasiswa beserta jurusannya
-- SELECT nim, nama_mahasiswa, alamat_mahasiswa, jurusan.nama_jurusan, umur
-- FROM mahasiswa
-- JOIN jurusan USING (jurusan_id);

SELECT m.*, j.nama_jurusan
FROM mahasiswa as m
JOIN jurusan as j USING (jurusan_id);

-- tampilkan mahasiswa yang memiliki umur dibawah 20 tahun
-- SELECT nim, nama_mahasiswa, alamat_mahasiswa, jurusan.nama_jurusan, umur
-- FROM mahasiswa
-- JOIN jurusan USING (jurusan_id)
-- WHERE umur < 20 ;

SELECT m.* 
FROM mahasiswa as m
WHERE (strftime('%Y', 'now') - strftime('%Y', tgl_lahir)) - (strftime('%m-%d', 'now') < strftime('%m-%d', tgl_lahir)) < 20 ;

-- tampilkan mahasiswa yang memiliki nilai B keatas
-- SELECT nim, nama_mahasiswa, matakuliah.nama_matakuliah, nilai
-- FROM nilai_mahasiswa
-- INNER JOIN mahasiswa USING (nim)
-- INNER JOIN matakuliah USING (matakuliah_id)
-- WHERE 'B' > nilai;

SELECT m.*
FROM nilai_mahasiswa
INNER JOIN mahasiswa as m USING (nim)
WHERE 'B' > nilai;

-- tampilkan mahasiswa yang memiliki jumlah sks lebih dari 10
SELECT m.nim, m.nama_mahasiswa, j.nama_jurusan, sum(mk.sks) AS total_sks
FROM nilai_mahasiswa
INNER JOIN mahasiswa as m USING (nim)
INNER JOIN matakuliah as mk USING (matakuliah_id)
INNER JOIN jurusan as j USING(jurusan_id)
GROUP BY m.nim, m.nama_mahasiswa
HAVING sum(mk.sks) > 10;

-- tampilkan mahasiswa yang mengambil matakuliah 'data mining'
SELECT m.nim, m.nama_mahasiswa, j.nama_jurusan, mk.nama_matakuliah
FROM nilai_mahasiswa
INNER JOIN mahasiswa as m USING (nim)
INNER JOIN matakuliah as mk USING (matakuliah_id)
INNER JOIN jurusan as j USING(jurusan_id)
WHERE mk.nama_matakuliah = 'data mining';

-- tampilkan jumlah mahasiswa untuk setiap dosennya
SELECT d.dosen_id, d.nama_dosen, count(DISTINCT m.nim) AS jumlah_mahasiswa
FROM nilai_mahasiswa
INNER JOIN mahasiswa as m USING (nim)
INNER JOIN dosen as d USING (dosen_id)
GROUP BY d.dosen_id, d.nama_dosen;

-- urutkan mahasiswa berdasarkan umurnya
SELECT nim, nama_mahasiswa, alamat_mahasiswa, j.nama_jurusan, (strftime('%Y', 'now') - strftime('%Y', tgl_lahir)) - (strftime('%m-%d', 'now') < strftime('%m-%d', tgl_lahir)) AS umur
FROM mahasiswa
JOIN jurusan j USING (jurusan_id)
ORDER BY umur;

-- menampilkan matakuliah dengan nilai D dan E, serta menampilkan data mahasiswa jurusan dan dosen
-- SELECT *
-- FROM nilai_mahasiswa
-- INNER JOIN mahasiswa USING (nim)
-- INNER JOIN matakuliah USING (matakuliah_id)
-- INNER JOIN jurusan USING(jurusan_id)
-- INNER JOIN dosen USING (dosen_id)
-- WHERE nilai IN ('D','E');

SELECT m.*, j.nama_jurusan, d.nama_dosen, mk.nama_matakuliah
FROM nilai_mahasiswa
INNER JOIN mahasiswa as m USING (nim)
INNER JOIN matakuliah as mk USING (matakuliah_id)
INNER JOIN jurusan as j USING(jurusan_id)
INNER JOIN dosen as d USING (dosen_id)      
WHERE nilai IN ('D','E');