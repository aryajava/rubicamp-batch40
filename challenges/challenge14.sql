PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE jurusan (
    id_jurusan INTEGER PRIMARY KEY AUTOINCREMENT,
    namajurusan TEXT NOT NULL
);
INSERT INTO jurusan VALUES(1,'Teknik Informatika');
INSERT INTO jurusan VALUES(2,'Sistem Informasi');
INSERT INTO jurusan VALUES(3,'Teknik Elektro');
CREATE TABLE mahasiswa (
    nim INTEGER PRIMARY KEY,
    nama TEXT NOT NULL,
    alamat TEXT,
    id_jurusan INTEGER,
    FOREIGN KEY (id_jurusan) REFERENCES jurusan(id_jurusan)
);
INSERT INTO mahasiswa VALUES(101,'Andi Wijaya','Jl. Merdeka No. 10',1);
INSERT INTO mahasiswa VALUES(102,'Budi Santoso','Jl. Diponegoro No. 15',2);
INSERT INTO mahasiswa VALUES(103,'Citra Puspita','Jl. Kartini No. 12',1);
INSERT INTO mahasiswa VALUES(104,'Dewi Anggraini','Jl. Soekarno Hatta No. 8',3);
INSERT INTO mahasiswa VALUES(105,'Eko Saputra','Jl. Gatot Subroto No. 22',2);
CREATE TABLE dosen (
    id_dosen INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL
);
INSERT INTO dosen VALUES(1,'Dr. Susilo Prabowo');
INSERT INTO dosen VALUES(2,'Prof. Arief Ramadhan');
INSERT INTO dosen VALUES(3,'Dr. Siti Hidayati');
CREATE TABLE matakuliah (
    id_matakuliah INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    sks INTEGER NOT NULL
);
INSERT INTO matakuliah VALUES(1,'Pemrograman Dasar',3);
INSERT INTO matakuliah VALUES(2,'Basis Data',4);
INSERT INTO matakuliah VALUES(3,'Jaringan Komputer',3);
INSERT INTO matakuliah VALUES(4,'Sistem Operasi',3);
INSERT INTO matakuliah VALUES(5,'Kalkulus',2);
CREATE TABLE nilai_mahasiswa (
    id_nilai INTEGER PRIMARY KEY AUTOINCREMENT,
    nim INTEGER,
    id_matakuliah INTEGER,
    id_dosen INTEGER,
    nilai TEXT CHECK( nilai IN ('A', 'B', 'C', 'D', 'E') ),
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY (id_matakuliah) REFERENCES matakuliah(id_matakuliah),
    FOREIGN KEY (id_dosen) REFERENCES dosen(id_dosen)
);
INSERT INTO nilai_mahasiswa VALUES(1,101,1,1,'A');
INSERT INTO nilai_mahasiswa VALUES(2,101,2,2,'B');
INSERT INTO nilai_mahasiswa VALUES(3,102,3,2,'C');
INSERT INTO nilai_mahasiswa VALUES(4,103,4,3,'A');
INSERT INTO nilai_mahasiswa VALUES(5,104,5,1,'B');
INSERT INTO nilai_mahasiswa VALUES(6,105,1,1,'C');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('jurusan',3);
INSERT INTO sqlite_sequence VALUES('dosen',3);
INSERT INTO sqlite_sequence VALUES('matakuliah',5);
INSERT INTO sqlite_sequence VALUES('nilai_mahasiswa',6);
COMMIT;
