PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "jurusan" (

	"jurusan_id"	INTEGER NOT NULL,

	"nama_jurusan"	TEXT NOT NULL,

	PRIMARY KEY("jurusan_id")

);
INSERT INTO jurusan VALUES(1,'teknik informatika');
INSERT INTO jurusan VALUES(2,'sistem informasi');
CREATE TABLE IF NOT EXISTS "matakuliah" (

	"matakuliah_id"	TEXT NOT NULL,

	"nama_matakuliah"	TEXT NOT NULL,

	"sks"	INTEGER NOT NULL,

	PRIMARY KEY("matakuliah_id")

);
INSERT INTO matakuliah VALUES('m1','kalkulus',3);
INSERT INTO matakuliah VALUES('m2','matrix',2);
INSERT INTO matakuliah VALUES('m3','pemrograman dasar',4);
INSERT INTO matakuliah VALUES('m4','struktur data',3);
INSERT INTO matakuliah VALUES('m5','basis data',4);
INSERT INTO matakuliah VALUES('m6','data mining',3);
INSERT INTO matakuliah VALUES('m7','pengantar rekayasa perangkat lunak',3);
CREATE TABLE IF NOT EXISTS "dosen" (

	"dosen_id"	INTEGER NOT NULL,

	"nama_dosen"	TEXT NOT NULL,

	PRIMARY KEY("dosen_id")

);
INSERT INTO dosen VALUES(11,'jaya');
INSERT INTO dosen VALUES(12,'marja');
CREATE TABLE IF NOT EXISTS "mahasiswa" (
	"nim"	INTEGER NOT NULL,
	"nama_mahasiswa"	TEXT NOT NULL,
	"alamat_mahasiswa"	TEXT NOT NULL,
	"jurusan_id"	INTEGER NOT NULL,
	"tgl_lahir" TEXT NOT NULL,
	FOREIGN KEY("jurusan_id") REFERENCES "jurusan"("jurusan_id"),
	PRIMARY KEY("nim")
);
INSERT INTO mahasiswa VALUES(101,'java','jakarta',1,'2005-07-25');
INSERT INTO mahasiswa VALUES(102,'andi','semarang',1,'2004-07-25');
INSERT INTO mahasiswa VALUES(103,'budi','kudus',1,'2005-07-25');
INSERT INTO mahasiswa VALUES(104,'citra','surabaya',1,'2003-07-25');
INSERT INTO mahasiswa VALUES(105,'fandi','bogor',1,'2004-07-25');
INSERT INTO mahasiswa VALUES(201,'arya','bandung',2,'2005-07-25');
INSERT INTO mahasiswa VALUES(202,'dewi','depok',2,'2002-07-25');
INSERT INTO mahasiswa VALUES(203,'eka','bekasi',2,'2006-07-25');
CREATE TABLE IF NOT EXISTS "nilai_mahasiswa" (
	"nilai_id"	INTEGER NOT NULL,
	"nim"	INTEGER NOT NULL,
	"matakuliah_id"	TEXT NOT NULL,
	"dosen_id"	INTEGER NOT NULL,
	"nilai"	TEXT NOT NULL,
	PRIMARY KEY("nilai_id" AUTOINCREMENT),
	FOREIGN KEY("nim") REFERENCES "mahasiswa"("nim"),
	FOREIGN KEY("dosen_id") REFERENCES "dosen"("dosen_id"),
	FOREIGN KEY("matakuliah_id") REFERENCES "matakuliah"("matakuliah_id")
);
INSERT INTO nilai_mahasiswa VALUES(3,101,'m3',11,'A');
INSERT INTO nilai_mahasiswa VALUES(4,101,'m5',12,'B');
INSERT INTO nilai_mahasiswa VALUES(5,101,'m2',11,'C');
INSERT INTO nilai_mahasiswa VALUES(6,102,'m1',12,'E');
INSERT INTO nilai_mahasiswa VALUES(7,102,'m4',11,'B');
INSERT INTO nilai_mahasiswa VALUES(8,102,'m6',12,'A');
INSERT INTO nilai_mahasiswa VALUES(9,201,'m3',11,'D');
INSERT INTO nilai_mahasiswa VALUES(10,201,'m5',12,'A');
INSERT INTO nilai_mahasiswa VALUES(11,201,'m7',11,'B');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('nilai_mahasiswa',11);
COMMIT;
