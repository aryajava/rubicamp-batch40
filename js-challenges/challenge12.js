import readline from "readline"
import fs from "fs"

// Membuat argument
const args = process.argv.slice(2)

// Membaca input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Fungsi validasi soal
function validasiSoal(x) {
    return Array.isArray(x) && x.every(key => typeof key.definition === 'string' && typeof key.term === 'string')
}

// Validasi apakah terdapat argument
if (args.length > 0) {
    const filename = args[0]
    // Validasi apakah arg tersebut file soal
    try {
        let data = JSON.parse(fs.readFileSync(filename, "utf-8"))
        if (validasiSoal(data)) {
            let wAnsw = 0, index = 0
            const skippedQuestions = []
            console.log(`Selamat Datang di permainan 'Tebak-tebakan'. Kamu akan diberikan pertanyaan dari file ini '${filename}'.\nUntuk bermain, jawablah dengan jawaban yang sesuai.`)

            function askQuestion() {
                // Validasi jumlah pertanyaan
                if (index < data.length) {
                    // Mulai pertanyaan
                    console.log(`\nPertanyaan: ${capitalizeFirstLetter(data[index].definition)}`)
                    getAnswer()
                } else if (skippedQuestions.length > 0) {
                    // Jika ada pertanyaan yang diskip, tanyakan ulang
                    data = skippedQuestions.slice()
                    // Reset variabel
                    index = 0
                    wAnsw = 0
                    skippedQuestions.length = 0
                    askQuestion() // Lanjut pertanyaan yang diulang
                } else {
                    // Jika tidak ada lagi pertanyaan
                    console.log("Anda berhasil!")
                    rl.close()
                }
            }

            function getAnswer() {
                rl.question('Tebakan: ', answer => {
                    if (answer.toLowerCase() === 'skip') {
                        // Simpan index pertanyaan
                        skippedQuestions.push(data[index])
                        index++
                        askQuestion() // Lanjut pertanyaan berikutnya
                    } else if (answer.toLowerCase() === data[index].term.toLowerCase()) {
                        console.log('\nAnda beruntung!')
                        index++
                        askQuestion() // Lanjut pertanyaan berikutnya
                    } else {
                        wAnsw++ // Tambah Total tebakan salah
                        console.log(`\nAnda kurang beruntung! Anda telah salah ${wAnsw} kali, silahkan coba lagi.`)
                        getAnswer() // Ulangi input Tebakan
                    }
                })
            }

            // Fungsi membuat huruf kapital
            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1)
            }
            askQuestion()
        } else {
            console.error('File tidak valid.')
            process.exit(1)
        }
    } catch (err) {
        console.error('Gagal membaca file soal, file: ', err)
        process.exit(1)
    }
} else {
    console.log(`Tolong sertakan nama file sebagai inputan soalnya.\nMisalnya 'node input.js soal.json'.`)
    process.exit(1)
}
