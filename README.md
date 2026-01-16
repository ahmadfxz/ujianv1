# Try Out & Lomba Online - Website dengan SvelteKit

Website lengkap untuk Try Out dan Lomba Online dengan fitur lengkap sesuai alur pengguna.

## 🎯 Fitur Utama

### Alur Lengkap Pengguna:

1. **Beranda** - Halaman awal dengan informasi kegiatan
2. **Login** - Autentikasi peserta dengan username/password
3. **Dashboard Peserta** - Validasi data peserta sebelum ujian
4. **Petunjuk Ujian** - Informasi dan aturan ujian
5. **Pilih Kelas** - Pilihan kelas (4, 5, 6)
6. **Pilih Mata Pelajaran** - Pilihan mata pelajaran (Matematika, Bahasa Indonesia, IPA, IPS)
7. **Halaman Soal** - Soal ujian dengan timer dan navigasi
8. **Konfirmasi Selesai** - Konfirmasi sebelum submit
9. **Hasil/Nilai** - Tampilan hasil ujian
10. **Sertifikat** - Unduh Bukti Perolehan Nilai
11. **Pembetulan Data** - Form untuk pembetulan data peserta

## 🚀 Instalasi

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Build untuk production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## 📋 Demo Login

Untuk testing, gunakan akun berikut:

- **Username:** `peserta001` | **Password:** `123456`
- **Username:** `peserta002` | **Password:** `123456`

## 🛠 Teknologi

- **SvelteKit** - Full-stack framework untuk Svelte
- **Svelte** - Framework JavaScript modern
- **Vite** - Build tool dan development server
- **Svelte Stores** - State management

## 📁 Struktur Proyek

```
src/
├── routes/          # Halaman-halaman aplikasi (file-based routing)
│   ├── +layout.svelte
│   ├── +page.svelte          # Home (/)
│   ├── login/+page.svelte    # /login
│   ├── dashboard/+page.svelte # /dashboard
│   ├── petunjuk/+page.svelte
│   ├── pilih-kelas/+page.svelte
│   ├── pilih-mapel/+page.svelte
│   ├── soal/+page.svelte
│   ├── konfirmasi-selesai/+page.svelte
│   ├── hasil/+page.svelte
│   ├── sertifikat/+page.svelte
│   └── pembetulan-data/+page.svelte
├── lib/
│   ├── stores.js    # State management
│   └── data.js      # Data dummy dan soal
├── app.css          # Global styles
└── app.html         # HTML template
```

## ✨ Fitur Keunggulan

✅ **Aman** - Validasi identitas peserta  
✅ **Ramah Siswa** - UI yang mudah digunakan  
✅ **Fleksibel** - Multi kelas & mata pelajaran  
✅ **Modern** - Desain kontemporer dengan gradient hijau tipis  
✅ **Responsif** - Berfungsi di berbagai perangkat  
✅ **Timer Real-time** - Pantau waktu pengerjaan  
✅ **Navigasi Intuitif** - Mudah berpindah antar soal  
✅ **Soal Terpisah** - Setiap mata pelajaran memiliki soal sendiri  
✅ **Bukti Perolehan Nilai** - Dapat diunduh/cetak  

## 🎨 Desain

- Gradient hijau tipis (putih ke hijau muda)
- Card-based layout
- Smooth animations dan transitions
- Responsive design untuk mobile dan desktop
- Kontras text yang jelas

## 📝 Informasi

- **Penyelenggara:** Lembaga Literasi Sembilan Mutiara
- **Framework:** SvelteKit (file-based routing)
- Data saat ini menggunakan data dummy untuk demo
- Untuk production, perlu integrasi dengan backend API

## 🔄 Alur Singkat

**Beranda → Login → Dashboard → Petunjuk → Pilih Kelas → Pilih Mapel → Soal → Konfirmasi → Hasil → Bukti Perolehan Nilai**

---

Selamat coding! 🚀