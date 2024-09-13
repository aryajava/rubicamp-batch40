-- CREATE DATABASE university

-- table jurusan
-- jurusan_id (PK)     nama_jurusan
-- 1                   teknik informatika
-- 2                   sistem informasi
CREATE TABLE "jurusan" (
	"jurusan_id"	INTEGER NOT NULL,
	"nama_jurusan"	TEXT NOT NULL,
	PRIMARY KEY("jurusan_id")
);
INSERT INTO jurusan (jurusan_id,nama_jurusan) VALUES (1,'teknik informatika'), (2,'sistem informasi');

-- table matakuliah
-- matakuliah_id (PK)  nama_matakuliah        sks
-- m1                  kalkulus               3
-- m2                  matrix                 2
CREATE TABLE "matakuliah" (
	"matakuliah_id"	TEXT NOT NULL,
	"nama_matakuliah"	TEXT NOT NULL,
	"sks"	INTEGER NOT NULL,
	PRIMARY KEY("matakuliah_id")
);
INSERT INTO matakuliah (matakuliah_id,nama_matakuliah,sks) VALUES ('m1','kalkulus',3), ('m2','matrix',2);

-- table dosen
-- dosen_id (PK)    nama_dosen
-- 11               Jaya
-- 12               Marja
CREATE TABLE "dosen" (
	"dosen_id"	INTEGER NOT NULL,
	"nama_dosen"	TEXT NOT NULL,
	PRIMARY KEY("dosen_id")
);
INSERT INTO dosen (dosen_id,nama_dosen) VALUES (11,'jaya'), (12,'marja');

-- table mahasiswa
-- nim (PK)    nama_mahasiswa      alamat_mahasiswa        jurusan_id (FK)
-- 101         Java                jakarta                 1
-- 201         Arya                bandung                 2
CREATE TABLE "mahasiswa" (
	"nim"	INTEGER NOT NULL,
	"nama_mahasiswa"	TEXT NOT NULL,
	"alamat_mahasiswa"	TEXT NOT NULL,
	"jurusan_id"	INTEGER NOT NULL,
	FOREIGN KEY("jurusan_id") REFERENCES "jurusan"("jurusan_id"),
	PRIMARY KEY("nim")
);
INSERT INTO mahasiswa (nim,nama_mahasiswa,alamat_mahasiswa,jurusan_id) VALUES (101,'java','jakarta',1), (201,'arya','bandung',2);

-- table nilai_mahasiswa
-- nilai_id (PK)     nim (FK)   matakuliah_id(FK)    dosen_id (FK)  nilai
-- 1                 101        "m1"                 12             85
-- 2                 201        "m2"                 11             80
CREATE TABLE "nilai_mahasiswa" (
    "nilai_id"    INTEGER NOT NULL,
    "nim" INTEGER NOT NULL,
    "matakuliah_id"   TEXT NOT NULL,
    "dosen_id"   INTEGER NOT NULL,
    "nilai" INTEGER NOT NULL,
    FOREIGN KEY("nim") REFERENCES "mahasiswa"("nim"),
    FOREIGN KEY("matakuliah_id") REFERENCES "matakuliah"("matakuliah_id"),
    FOREIGN KEY("dosen_id") REFERENCES "dosen"("dosen_id"),
    PRIMARY KEY ("nilai_id" AUTOINCREMENT)
);
INSERT INTO nilai_mahasiswa (nim,matakuliah_id,dosen_id,nilai) VALUES (101,"m1",12,85), (201,"m2",11,80);


