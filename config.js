// ============================================================
// Bimbel Edufa - Konfigurasi Terpusat
// Ubah nilai di file ini saja, semua bagian website akan
// mengikuti secara otomatis.
// ============================================================

const CONFIG = {
  businessName: "Bimbel Edufa",
  website: "https://bimbel-edufa.com",
  // Subdomain pendaftaran barang calon siswa.
  registrationUrl: "https://daftar.bimbel-edufa.com",

  // Nomor WhatsApp dalam format internasional tanpa tanda +.
  // Contoh untuk 0812 3456 7890 (Indonesia): "6281234567890"
  // KOSONGKAN jika belum ada. Tombol WhatsApp otomatis aman
  // dan tidak mengarah ke nomor sembarangan.
  whatsapp: "",

  // URL Google Business / Google Maps. KOSONGKAN jika belum ada,
  // tombol "Lihat Profil Google" otomatis disembunyikan.
  googleBusinessUrl: "https://www.google.com/maps/place/Bimbel+Edufa+ESC/@-6.4599335,106.6605175,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69e7fc3cf91735:0x29200fbec1b33d38!8m2!3d-6.4599335!4d106.6605175!16s%2Fg%2F11xcsq8b0c?entry=ttu&g_ep=EgoyMDI2MDkwOS4wIKXMDSoASAFQAw%3D%3D",

  location: "Ciseeng, Kabupaten Bogor",
  serviceArea: "Ciseeng, Kabupaten Bogor dan sekitarnya",
};

// ============================================================
// DATA MATA PELAJARAN
// Daftar mata pelajaran yang benar-benar tersedia di Bimbel Edufa.
// ============================================================
const SUBJECTS = {
  matematika: "Matematika",
  ipas: "IPAS",
  ipa: "IPA",
  bahasaInggris: "Bahasa Inggris",
  informatika: "Informatika",
};

// ============================================================
// LEVEL / KELAS
// Ekspos: SD kelas 1-6, SMP kelas 7-9, SMA kelas 10-12.
// ============================================================
const LEVELS = {
  sd: {
    label: "SD",
    name: "Sekolah Dasar",
    accent: "green",
    classes: [1, 2, 3, 4, 5, 6],
  },
  smp: {
    label: "SMP",
    name: "Sekolah Menengah Pertama",
    accent: "blue",
    classes: [7, 8, 9],
  },
  sma: {
    label: "SMA",
    name: "Sekolah Menengah Atas",
    accent: "amber",
    classes: [10, 11, 12],
  },
};

// ============================================================
// JADWAL BELAJAR (CONTOH)
// Penting: ini data contoh untuk memperlihatkan format jadwal.
// Ganti dengan jadwal aktual Bimbel Edufa sebelum dipublikasikan.
// isExample = true => website menampilkan penanda "Contoh jadwal".
// ============================================================
const SCHEDULES = {
  isExample: true,
  items: [
    { day: "Senin", time: "16.00 - 17.30", level: "SD", subject: "Matematika" },
    { day: "Selasa", time: "16.00 - 17.30", level: "SMP", subject: "IPA" },
    { day: "Rabu", time: "16.00 - 17.30", level: "SD", subject: "Bahasa Inggris" },
    { day: "Kamis", time: "16.00 - 17.30", level: "SMP", subject: "Informatika" },
    { day: "Jumat", time: "16.00 - 17.30", level: "SMA", subject: "Matematika" },
  ],
};

// ============================================================
// BIAYA
// Harga belum tersedia => gunakan "Hubungi Edufa".
// Saat sudah punya harga, isi di bawah dan section otomatis menampilkannya.
// Setiap item: name, note. price diisi string harga ATAU null untuk "Hubungi".
// ============================================================
const FEES = {
  available: false, // ubah true setelah harga siap
  currency: "Rp",
  items: [
    { name: "Bimbel SD", price: null, note: "Kelas 1 - 6" },
    { name: "Bimbel SMP", price: null, note: "Kelas 7 - 9" },
    { name: "Bimbel SMA", price: null, note: "Kelas 10 - 12" },
  ],
  note: "Biaya dapat berbeda sesuai jenjang, mata pelajaran, dan frekuensi pertemuan. Hubungi Edufa untuk informasi biaya dan program terbaru.",
};

// ============================================================
// TESTIMONI
// JANGAN menaruh testimoni palsu di website publik.
// Array di bawah adalah TEMPLATE kosong. Ganti demo:true dengan
// testimoni asli sebelum dipublikasikan. Jika testimonials tetap
// berisi demo, website hanya menampilkan kolom kosong "siap diisi".
// ============================================================
const TESTIMONIALS = {
  enabled: true,
  hasReal: false, // ubah true setelah ada testimoni asli
  items: [
    {
      name: "Nama Orang Tua Asli",
      status: "Orang Tua",
      level: "SMP",
      comment: "Tulis komentar asli dari orang tua di sini.",
      rating: null, // hanya isi angka 1-5 jika dari data nyata
    },
  ],
};

// ============================================================
// GALLERY
// Gunakan foto asli kegiatan. Kosongkan items jika belum punya.
// Cukup letakkan file di folder assets/img/gallery lalu ubah src.
// ============================================================
const GALLERY = {
  items: [
    { src: "assets/img/placeholder-gallery-1.svg", title: "Suasana Belajar", category: "Kelas" },
    { src: "assets/img/placeholder-gallery-2.svg", title: "Diskusi Materi", category: "Kegiatan" },
    { src: "assets/img/placeholder-gallery-3.svg", title: "Pendampingan Siswa", category: "Siswa" },
    { src: "assets/img/placeholder-gallery-4.svg", title: "Belajar Matematika", category: "Materi" },
    { src: "assets/img/placeholder-gallery-5.svg", title: "Suasana Belajar", category: "Kegiatan" },
    { src: "assets/img/placeholder-gallery-6.svg", title: "Foto Kegiatan Edufa", category: "Kegiatan" },
  ],
};

// ============================================================
// BLOG
// Data ringkas untuk halaman index (preview) & blog.html (listing).
// Artikel lengkap berada di folder /blog/.
// ============================================================
const BLOG_POSTS = [
  {
    slug: "kenapa-anak-sulit-memahami-matematika",
    title: "Kenapa Anak Sulit Memahami Matematika?",
    date: "2026-09-12",
    category: "Tips Belajar",
    image: "assets/img/placeholder-blog-1.svg",
    excerpt:
      "Matematika sering terasa sulit bukan karena anak tidak pintar, tetapi karena cara memahami konsepnya yang belum pas. Simak cara mengatasinya.",
  },
  {
    slug: "kapan-anak-sebaiknya-mengikuti-bimbel",
    title: "Kapan Anak Sebaiknya Mengikuti Bimbel?",
    date: "2026-09-05",
    category: "Info Bimbel",
    image: "assets/img/placeholder-blog-2.svg",
    excerpt:
      "Tidak selalu harus 'mulai sedini mungkin'. Kenali tanda-tanda anak sebenarnya membutuhkan pendampingan belajar tambahan.",
  },
  {
    slug: "cara-membantu-anak-belajar-di-rumah",
    title: "Cara Membantu Anak Belajar di Rumah",
    date: "2026-08-28",
    category: "Tips Belajar",
    image: "assets/img/placeholder-blog-3.svg",
    excerpt:
      "Orang tua tidak perlu menjadi guru. Kadang cukup menyediakan suasana, rutinitas, dan cara bicara yang tepat saat anak belajar di rumah.",
  },
  {
    slug: "tips-belajar-matematika-untuk-siswa-sd",
    title: "Tips Belajar Matematika untuk Siswa SD",
    date: "2026-08-21",
    category: "Tips Belajar",
    image: "assets/img/placeholder-blog-4.svg",
    excerpt:
      "Dari berhitung dengan benda nyata sampai latihan rutin singkat. Cara sederhana agar matematika tidak terasa menakutkan bagi siswa SD.",
  },
  {
    slug: "cara-mempersiapkan-anak-menghadapi-ujian",
    title: "Cara Mempersiapkan Anak Menghadapi Ujian",
    date: "2026-08-14",
    category: "Info Bimbel",
    image: "assets/img/placeholder-blog-5.svg",
    excerpt:
      "Persiapan ujian bukan hanya soal menghafal. Latihan soal, manajemen waktu, dan kondisi mental anak berperan besar terhadap hasil.",
  },
  {
    slug: "bimbel-sd-smp-sma-apa-yang-perlu-dipertimbangkan",
    title: "Bimbel SD, SMP atau SMA: Apa yang Perlu Dipertimbangkan?",
    date: "2026-08-07",
    category: "Info Bimbel",
    image: "assets/img/placeholder-blog-6.svg",
    excerpt:
      "Kebutuhan siswa SD, SMP, dan SMA berbeda. Pahami perbedaannya sebelum memilih program bimbel untuk anak Anda.",
  },
];
