-- table jurusan
CREATE TABLE jurusan (
    id_jurusan VARCHAR(10) PRIMARY KEY,
    namajurusan VARCHAR(100) NOT NULL
);
INSERT INTO jurusan (id_jurusan, namajurusan) VALUES 
('11', 'Teknik Informatika'),
('12', 'Sistem Informasi'),
('13', 'Teknik Elektro');

-- table matakuliah
CREATE TABLE matakuliah (
    id_matakuliah VARCHAR(10) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    sks INTEGER NOT NULL
);
INSERT INTO matakuliah (id_matakuliah, nama, sks) VALUES 
('KM01', 'Pemrograman Dasar', 3),
('KM02', 'Basis Data', 4),
('KM03', 'Jaringan Komputer', 3),
('KM04', 'Sistem Operasi', 3),
('KM05', 'Kalkulus', 2);

-- table dosen
CREATE TABLE dosen (
    id_dosen VARCHAR(10) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL
);
INSERT INTO dosen (id_dosen, nama) VALUES 
('KD01', 'Dr. Susilo Prabowo'),
('KD02', 'Prof. Arief Ramadhan'),
('KD03', 'Dr. Siti Hidayati');

-- table mahasiswa
CREATE TABLE mahasiswa (
    nim VARCHAR(10) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    alamat VARCHAR(255),
    id_jurusan VARCHAR(10),
    FOREIGN KEY (id_jurusan) REFERENCES jurusan(id_jurusan)
);
INSERT INTO mahasiswa (nim, nama, alamat, id_jurusan) VALUES 
('1811001', 'Andi Wijaya', 'Jl. Merdeka No. 10', '11'),
('1812001', 'Budi Santoso', 'Jl. Diponegoro No. 15', '12'),
('1811002', 'Citra Puspita', 'Jl. Kartini No. 12', '11'),
('1913001', 'Dewi Anggraini', 'Jl. Soekarno Hatta No. 8', '13'),
('1912002', 'Eko Saputra', 'Jl. Gatot Subroto No. 22', '12');

-- table nilai_mahasiswa
CREATE TABLE nilai_mahasiswa (
    id_nilai INTEGER PRIMARY KEY AUTOINCREMENT,
    nim VARCHAR(10),
    id_matakuliah VARCHAR(10),
    id_dosen VARCHAR(10),
    nilai VARCHAR(2) CHECK( nilai IN ('A', 'B', 'C', 'D', 'E') ),
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY (id_matakuliah) REFERENCES matakuliah(id_matakuliah),
    FOREIGN KEY (id_dosen) REFERENCES dosen(id_dosen)
);
INSERT INTO nilai_mahasiswa (nim, id_matakuliah, id_dosen, nilai) VALUES 
('1811001', 'KM01', 'KD01', 'A'),
('1811001', 'KM02', 'KD02', 'B'),
('1812001', 'KM03', 'KD02', 'C'),
('1811002', 'KM04', 'KD03', 'A'),
('1913001', 'KM05', 'KD01', 'B'),
('1912002', 'KM01', 'KD01', 'C');
