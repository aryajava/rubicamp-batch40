// Basic IntersectionObserver
// Membuat variabel cards yang berisi semua elemen dengan class card
const cards = document.querySelectorAll('.card');

// Membuat instance observer dari IntersectionObserver
const observer = new IntersectionObserver(
  entries => {
    // Callback yang akan dipanggil setiap kali elemen yang dipantau
    // masuk atau keluar dari viewport.
    entries.forEach(entry => {
      // Menambahkan atau menghapus kelas 'show' pada elemen target
      // berdasarkan apakah elemen tersebut sedang berada di dalam viewport.
      entry.target.classList.toggle('show', entry.isIntersecting);
    });
  }, {
  // Opsi-opsi untuk IntersectionObserver.
  // 1. Opsi threshold:
  // Menentukan seberapa banyak dari elemen target yang harus terlihat.
  // Jika threshold diatur ke 1
  // yang berarti callback hanya akan dipanggil ketika 100% dari elemen
  // berada di dalam viewport.
  // Jika threshold diatur ke 0.5
  // yang berarti callback akan dipanggil ketika 50% dari elemen
  // berada di dalam viewport.
  // Jika threshold diatur ke 0
  // yang berarti callback akan dipanggil ketika elemen
  // berada di dalam viewport.
  // threshold: 1,
  // 2. Opsi root:
  // Menentukan elemen yang digunakan sebagai viewport.
  // Jika tidak diatur, maka viewport akan menjadi browser window.
  // root: document.querySelector('.card-container'),
  // 3. Opsi rootMargin:
  // Menentukan margin dari elemen root yang digunakan sebagai viewport.
  // Ini berguna ketika ingin memperluas atau mempersempit area viewport.
  // Contoh kasus: Ketika ingin memunculkan elemen tetapi jaringan internet lambat,
  // maka bisa menambahkan margin pada elemen root sebelum elemen target muncul,
  // sehingga elemen target akan muncul lebih cepat.
  // rootMargin: '0px 0px 100px 0px'
}
);

// Melakukan iterasi pada setiap elemen dalam array 'cards'
cards.forEach(card => {
  // Memantau setiap elemen card menggnakan observer
  observer.observe(card);
});

// Membuat instance observer baru untuk elemen terakhir card
const lastCardObserver = new IntersectionObserver(
  entries => {
    // Mengambil elemen terakhir dari array entries
    const lastCard = entries[0];
    // Jika lastCard tidak terlihat (tidak berpotongan / Intersecting), keluar dari fungsi
    if (!lastCard.isIntersecting) return;
    // Jika lastCard terlihat (berpotongan / Intersecting), panggil fungsi untuk menambahkan card baru
    loadNewCard(lastCard);
    // Berhenti memantau elemen terakhir card
    lastCardObserver.unobserve(lastCard.target);
    // Mulai memantau elemen terakhir card yang baru
    lastCardObserver.observe(document.querySelector('.card:last-child'));
  }
);

// Pantau elemen terakhir card
lastCardObserver.observe(document.querySelector('.card:last-child'));

// Membuat variabel cardContainer yang berisi elemen dengan class card-container
const cardContainer = document.querySelector('.card-container');

// Fungsi untuk menambahkan card baru
function loadNewCard() {
  // Membuat 10 card baru
  for (let i = 0; i < 10; i++) {
    // Membuat elemen card baru
    const card = document.createElement('div');
    // Menambahkan teks 'New card' pada card baru
    card.textContent = 'New card';
    // Menambahkan class 'card' pada card baru
    card.classList.add('card');
    // Memantau card baru
    observer.observe(card);
    // Menambahkan card baru pada cardContainer
    cardContainer.append(card);
  }
}