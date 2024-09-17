-- 1. tampilkan seluruh data mahasiswa beserta jurusannya
SELECT m.*, j.namajurusan
FROM mahasiswa as m
INNER JOIN jurusan as j ON m.id_jurusan=j.id_jurusan;

-- 2. tampilkan mahasiswa yang memiliki umur dibawah 20 tahun
SELECT m.*
FROM mahasiswa as m
WHERE (strftime('%Y', 'now') - strftime('%Y', tgllahir)) - (strftime('%m-%d', 'now') < strftime('%m-%d', tgllahir)) < 20 ;

-- 3. tampilkan mahasiswa yang memiliki nilai B keatas
SELECT m.*
FROM nilai_mahasiswa as nm
INNER JOIN mahasiswa as m ON nm.nim=m.nim
WHERE 'B' > nilai;

-- 4. tampilkan mahasiswa yang memiliki jumlah sks lebih dari 10
SELECT m.nim, m.nama, m.tgllahir, m.alamat, j.namajurusan, sum(mk.sks) AS total_sks
FROM nilai_mahasiswa as nm
INNER JOIN mahasiswa as m ON nm.nim=m.nim
INNER JOIN matakuliah as mk ON nm.id_matakuliah=mk.id_matakuliah
INNER JOIN jurusan as j ON m.id_jurusan=j.id_jurusan
HAVING sum(mk.sks) > 10;

-- 5. tampilkan mahasiswa yang mengambil matakuliah 'Data Mining'
SELECT m.nim, m.nama, m.tgllahir, m.alamat, j.namajurusan
FROM nilai_mahasiswa as nm
INNER JOIN mahasiswa as m ON nm.nim=m.nim
INNER JOIN matakuliah as mk ON nm.id_matakuliah=mk.id_matakuliah
INNER JOIN jurusan as j ON m.id_jurusan=j.id_jurusan
WHERE mk.nama = 'Data Mining';

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
SELECT m.nim, m.nama, m.tgllahir, m.alamat, j.id_jurusan, j.namajurusan, d.id_dosen, d.nama, mk.id_matakuliah, mk.nama
FROM nilai_mahasiswa as nm
INNER JOIN mahasiswa as m ON nm.nim=m.nim
INNER JOIN matakuliah as mk ON nm.id_matakuliah=mk.id_matakuliah
INNER JOIN jurusan as j ON m.id_jurusan=j.id_jurusan
INNER JOIN dosen as d ON nm.id_dosen=d.id_dosen     
WHERE nilai IN ('D','E');


-- Beberapa table yang diubah:

-- table mahasiswa
-- add column tgllahir
CREATE TABLE mahasiswaa (
    nim VARCHAR(10) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    tgllahir VARCHAR(50) NOT NULL,
    alamat VARCHAR(255),
    id_jurusan VARCHAR(10),
    FOREIGN KEY (id_jurusan) REFERENCES jurusan(id_jurusan)
);

INSERT INTO mahasiswaa (nim, nama, tgllahir, alamat, id_jurusan) VALUES 
('1811001', 'Andi Wijaya', '2005-07-25', 'Jl. Merdeka No. 10', '11'),
('1812001', 'Budi Santoso', '2006-05-24', 'Jl. Diponegoro No. 15', '12'),
('1811002', 'Citra Puspita', '2005-02-20', 'Jl. Kartini No. 12', '11'),
('1913001', 'Dewi Anggraini', '2007-01-20', 'Jl. Soekarno Hatta No. 8', '13'),
('1912002', 'Eko Saputra', '2005-10-20', 'Jl. Gatot Subroto No. 22', '12');

DROP TABLE mahasiswa;

ALTER TABLE mahasiswaa RENAME TO mahasiswa;

-- table matakuliah
-- update id_matakuliah = 'KM03' set nama = 'Data Mining'
UPDATE matakuliah
SET nama = 'Data Mining'
WHERE id_matakuliah = 'KM03';

-- table nilai_mahasiswa
-- update id_nilai = 6 set nilai = 'D'
UPDATE nilai_mahasiswa
SET nilai = 'D'
WHERE id_nilai = 6;