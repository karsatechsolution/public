# Bimbel Edufa Website

Website resmi **Bimbel Edufa** — bimbingan belajar SD, SMP & SMA di Ciseeng, Kabupaten Bogor dan sekitarnya.

Website ini bersifat **statis** (HTML + CSS + JavaScript). Tidak ada database. Semua data konten dikelola lewat satu file konfigurasi: `config.js`.

## Teknologi

- HTML5 (semantic)
- CSS3 (mobile-first, design system di `css/style.css`)
- Vanilla JavaScript (`js/main.js`) — tidak ada library berat
- SVG untuk logo, ilustrasi, ikon, dan placeholder gambar
- JSON-LD untuk Structured Data (SEO)

## Struktur project

```
bimbel-edufa/
├── index.html          # Beranda (landing semua section)
├── blog.html           # Daftar artikel blog
├── blog/               # Halaman artikel lengkap (6 artikel)
├── config.js           # SEMUA data konten (wajib dipelajari dulu)
├── js/main.js          # Semua interaksi website
├── css/style.css       # Semua gaya website
├── assets/
│   ├── img/            # Logo, ilustrasi hero, placeholder gallery & blog
│   └── og/             # Gambar untuk sharing sosial (Open Graph)
├── favicon.svg
├── robots.txt
├── sitemap.xml
└── README.md
```

## Cara menjalankan

Website murni statis, cukup buka `index.html` di browser. Untuk pengembangan disarankan menjalankan server lokal:

- **XAMPP**: letakkan folder ini di `C:\xampp\htdocs\bimbel-edufa`, lalu akses `http://localhost/bimbel-edufa/`.
- **VS Code**: pasang ekstensi Live Server, klik kanan `index.html` → *Open with Live Server*.
- **Python**: di dalam folder jalankan `python -m http.server` lalu buka `http://localhost:8000`.

## Cara mengubah nomor WhatsApp

Buka `config.js`:

```js
whatsapp: "6281234567890",  // format internasional tanpa tanda +
```

Kosongkan (`""`) jika belum punya nomor. Semua tombol WhatsApp otomatis mengarah ke nomor ini. Jika kosong, tombol menampilkan pemberitahuan dan tidak menuju nomor sembarangan.

## Cara mengubah program

Data program dapat diedit langsung di section **Program** pada `index.html`. Untuk pesan WhatsApp per program, cari tombol dengan `data-wa="sd" | "smp" | "sma"`. Teks pesan dikelola di `js/main.js` (bagian `WHATSAPP_MESSAGES`).

## Cara mengubah jadwal

Buka `config.js`, bagian `SCHEDULES`. Format per baris:

```js
items: [
  { day: "Senin", time: "16.00 - 17.30", level: "SD", subject: "Matematika" },
]
```

Penting: saat ini jadwal masih **contoh** (`isExample: true`) sehingga website menampilkan penanda "contoh format". Setelah jadwal aktual dikonfirmasi, ubah `isExample: false` dan isi data sebenarnya.

## Cara mengubah biaya

Buka `config.js`, bagian `FEES`. Saat ini harga masih "Hubungi Edufa" (`available: false`). Setelah harga tersedia:

```js
available: true,
items: [
  { name: "Bimbel SD", price: "350.000", note: "Kelas 1 - 6" },
]
```

Setelah `available: true`, harga otomatis tampil dan catatan "Hubungi Edufa" berubah.

## Cara menambah artikel

1. Salin salah satu file di folder `blog/` (misalnya `blog/cara-membantu-anak-belajar-di-rumah.html`).
2. Rename sesuai slug, misal `blog/tips-menghadapi-ujian-smp.html`.
3. Ubah judul halaman (`<title>`, meta description, canonical, URL og:image) dan isi konten pada bagian `.article-body`.
4. Daftarkan artikel di `config.js` pada `BLOG_POSTS` (agar muncul di listing beranda & `blog.html`):
   ```js
   {
     slug: "tips-menghadapi-ujian-smp",
     title: "Tips Menghadapi Ujian untuk Siswa SMP",
     date: "2026-09-20",
     category: "Tips Belajar",
     image: "assets/img/placeholder-blog-2.svg",
     excerpt: "Ringkasan artikel singkat di sini.",
   }
   ```
5. Tambahkan URL di `sitemap.xml`.

## Cara menambah gallery

Buka `config.js`, bagian `GALLERY`. Letakkan foto asli di `assets/img/gallery/` lalu:

```js
items: [
  { src: "assets/img/gallery/foto-asli-1.jpg", title: "Kegiatan belajar", category: "Kegiatan" },
]
```

Kategori bisa: `Kegiatan`, `Kelas`, `Siswa`, `Materi`. Hanya kategori yang dipakai yang tampil di filter. Gambar placeholder di folder `assets/img/` bisa dihapus setelah foto asli tersedia.

## Cara mengubah link pendaftaran

Buka `config.js`:

```js
registrationUrl: "https://daftar.bimbel-edufa.com",
```

Semua tombol **Daftar Sekarang** otomatis mengikuti. Jangan membuat form pendaftaran baru — pendaftaran ditangani subdomain `daftar.bimbel-edufa.com`.

## Cara mengubah profil Google Business

Buka `config.js`:

```js
googleBusinessUrl: "",
```

Isi dengan URL profil Google Business saat tersedia. Tombol **Lihat Profil Google** di section Biaya & Kontak otomatis muncul; jika kosong, tombol disembunyikan.

## Cara mengubah testimoni

Buka `config.js`, bagian `TESTIMONIALS`. **Jangan** menaruh testimoni palsu di website publik. Saat testimoni asli sudah terkumpul:

```js
hasReal: true,
items: [
  { name: "Ibu Sari", status: "Orang Tua", level: "SMP", comment: "Teks asli...", rating: 5 },
]
```

Rating hanya diisi jika berasal dari data nyata.

## Cara deploy

### Hosting biasa (shared hosting, cPanel, dsb.)

1. Upload seluruh isi folder `bimbel-edufa` ke folder `public_html` (atau `htdocs`) account hosting.
2. Pastikan `index.html`, `blog.html`, folder `assets/`, `js/`, `css/` ikut terupload.
3. Arahkan domain `bimbel-edufa.com` ke hosting tersebut.
4. Setelah live, submit `sitemap.xml` di Google Search Console.

### GitHub Pages (versi statis)

1. Buat repository, push seluruh isi folder.
2. Settings → Pages → deploy dari branch `main` → folder `/ (root)`.
3. Catatan: jika dipasang di GitHub Pages, ganti URL absolut di `sitemap.xml`, `robots.txt`, meta canonical/OG, dan JSON-LD dari `https://bimbel-edufa.com` ke alamat Pages Anda, karena website dirancang dengan domain utama `bimbel-edufa.com`.

## Catatan data yang belum diisi

Data berikut masih harus diisi sendiri (jangan dipalsukan):

- Nomor WhatsApp (`CONFIG.whatsapp`)
- Link pendaftaran final (`CONFIG.registrationUrl`)
- Profil Google Business (`CONFIG.googleBusinessUrl`)
- Jadwal aktual (ganti contoh di `SCHEDULES`)
- Harga program (isi `FEES`)
- Testimoni asli (`TESTIMONIALS`)
- Foto kegiatan asli (ganti placeholder di gallery)
- Logo asli jika berbeda dari placeholder (`assets/img/logo-edufa.svg`)