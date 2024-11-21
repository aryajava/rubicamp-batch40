-- 1. tampilkan seluruh data mahasiswa beserta jurusannya
SELECT m.*, j.namajurusan 
FROM mahasiswa as m 
INNER JOIN jurusan as j ON m.id_jurusan=j.id_jurusan;

-- 2. tampilkan mahasiswa yang memiliki umur dibawah 20 tahun
SELECT m.* 
FROM mahasiswa as m 
WHERE (strftime('%Y', 'now') - strftime('%Y', tgllahir)) - (strftime('%m-%d', 'now') < strftime('%m-%d', tgllahir)) < 20 ;

-- 3. tampilkan mahasiswa yang memiliki nilai B keatas
SELECT m.*, nm.nilai 
FROM nilai_mahasiswa as nm 
INNER JOIN mahasiswa as m ON nm.nim = m.nim 
WHERE nm.nilai <= 'B';

-- 4. tampilkan mahasiswa yang memiliki jumlah sks lebih dari 10
SELECT m.nim, m.nama, m.tgllahir, m.alamat, j.namajurusan, sum(mk.sks) AS total_sks
FROM nilai_mahasiswa as nm
INNER JOIN mahasiswa as m ON nm.nim=m.nim
INNER JOIN matakuliah as mk ON nm.id_matakuliah=mk.id_matakuliah
INNER JOIN jurusan as j ON m.id_jurusan=j.id_jurusan
HAVING sum(mk.sks) > 10;

-- 5. tampilkan mahasiswa yang mengambil matakuliah 'data mining'
SELECT m.nim, m.nama, m.tgllahir, m.alamat, j.namajurusan, mk.nama
FROM nilai_mahasiswa as nm
INNER JOIN mahasiswa as m ON nm.nim=m.nim
INNER JOIN matakuliah as mk ON nm.id_matakuliah=mk.id_matakuliah
INNER JOIN jurusan as j ON m.id_jurusan=j.id_jurusan
WHERE mk.nama LIKE '%data mining%';

-- 6. tampilkan jumlah mahasiswa untuk setiap dosen
SELECT d.*, count(DISTINCT m.nim) AS jumlah_mahasiswa
FROM nilai_mahasiswa as nm
INNER JOIN mahasiswa as m ON nm.nim=m.nim
INNER JOIN dosen as d ON nm.id_dosen=d.id_dosen
GROUP BY d.id_dosen;

-- 7. urutkan mahasiswa berdasarkan umurnya
SELECT m.nim, m.nama, m.tgllahir, m.alamat, j.namajurusan, (strftime('%Y', 'now') - strftime('%Y', tgllahir)) - (strftime('%m-%d', 'now') < strftime('%m-%d', tgllahir)) AS umur
FROM mahasiswa as m
JOIN jurusan as j ON m.id_jurusan=j.id_jurusan
ORDER BY umur;

-- 8. tampilkan kontrak matakuliah yang harus diulang(nilai D dan E),
-- serta tampilkan data mahasiswa jurusan dan dosen secara lengkap,
-- gunakan mode JOIN dan WHERE clause (solusi dari 2 syntax SQL)
SELECT m.nim, m.nama, m.tgllahir, m.alamat, j.id_jurusan, j.namajurusan, d.id_dosen, d.nama, mk.id_matakuliah, mk.nama, nm.nilai
FROM nilai_mahasiswa as nm 
INNER JOIN mahasiswa as m ON nm.nim=m.nim 
INNER JOIN matakuliah as mk ON nm.id_matakuliah=mk.id_matakuliah 
INNER JOIN jurusan as j ON m.id_jurusan=j.id_jurusan 
INNER JOIN dosen as d ON nm.id_dosen=d.id_dosen 
WHERE nilai IN ('D','E');

SELECT 
    m.nim, 
    m.nama, 
    m.tgllahir, 
    m.alamat, 
    j.id_jurusan, 
    j.namajurusan, 
    d.id_dosen, 
    d.nama AS nama_dosen, 
    mk.id_matakuliah, 
    mk.nama AS nama_matakuliah, 
    nm.nilai
FROM nilai_mahasiswa AS nm, mahasiswa AS m, jurusan AS j, dosen AS d, matakuliah AS mk
WHERE 
    nm.nim = m.nim
    AND m.id_jurusan = j.id_jurusan
    AND nm.id_dosen = d.id_dosen
    AND nm.id_matakuliah = mk.id_matakuliah
    AND nm.nilai IN ('D', 'E');


-- Beberapa table yang diubah:

-- table mahasiswa
-- add column tgllahir
ALTER TABLE mahasiswa
ADD COLUMN tgllahir DATE;

UPDATE mahasiswa
SET tgllahir = '2002-07-25'
WHERE nim = '1811001';

UPDATE mahasiswa
SET tgllahir = '2003-05-24'
WHERE nim = '1812001';

UPDATE mahasiswa
SET tgllahir = '2004-02-20'
WHERE nim = '1811002';

UPDATE mahasiswa
SET tgllahir = '2004-01-20'
WHERE nim = '1913001';

UPDATE mahasiswa
SET tgllahir = '2005-10-20'
WHERE nim = '1912002';

-- table matakuliah
-- update id_matakuliah = 'KM03' set nama = 'Data Mining'
UPDATE matakuliah
SET nama = 'Pemrograman Data Mining'
WHERE id_matakuliah = 'KM03';

-- table nilai_mahasiswa
-- update id_nilai = 6 set nilai = 'D'
UPDATE nilai_mahasiswa
SET nilai = 'D'
WHERE id_nilai = 6;