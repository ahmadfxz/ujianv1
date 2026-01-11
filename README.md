# Try Out & Lomba Online - Website dengan Svelte

Website lengkap untuk Try Out dan Lomba Online dengan fitur lengkap sesuai alur pengguna.

## 🎯 Fitur Utama

### Alur Lengkap Pengguna:

1. **Beranda** - Halaman awal dengan informasi kegiatan
2. **Login** - Autentikasi peserta dengan username/password
3. **Dashboard Peserta** - Validasi data peserta sebelum ujian
4. **Petunjuk Ujian** - Informasi dan aturan ujian
5. **Pilih Kelas** - Pilihan kelas (4, 5, 6)
6. **Pilih Mata Pelajaran** - Pilihan mata pelajaran
7. **Halaman Soal** - Soal ujian dengan timer dan navigasi
8. **Konfirmasi Selesai** - Konfirmasi sebelum submit
9. **Hasil/Nilai** - Tampilan hasil ujian
10. **Sertifikat** - Unduh sertifikat digital
11. **Logout** - Kembali ke beranda

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

- **Svelte** - Framework JavaScript modern
- **Vite** - Build tool dan development server
- **svelte-spa-router** - Routing untuk SPA
- **Svelte Stores** - State management

## 📁 Struktur Proyek

```
src/
├── routes/          # Halaman-halaman aplikasi
│   ├── Home.svelte
│   ├── Login.svelte
│   ├── Dashboard.svelte
│   ├── Petunjuk.svelte
│   ├── PilihKelas.svelte
│   ├── PilihMapel.svelte
│   ├── Soal.svelte
│   ├── KonfirmasiSelesai.svelte
│   ├── Hasil.svelte
│   └── Sertifikat.svelte
├── lib/
│   └── data.js      # Data dummy untuk demo
├── stores.js        # State management
├── App.svelte       # Komponen utama dengan router
├── main.js          # Entry point
└── app.css          # Global styles
```

## ✨ Fitur Keunggulan

✅ **Aman** - Validasi identitas peserta  
✅ **Ramah Siswa** - UI yang mudah digunakan  
✅ **Fleksibel** - Multi kelas & mata pelajaran  
✅ **Modern** - Desain kontemporer dengan animasi  
✅ **Responsif** - Berfungsi di berbagai perangkat  
✅ **Timer Real-time** - Pantau waktu pengerjaan  
✅ **Navigasi Intuitif** - Mudah berpindah antar soal  
✅ **Sertifikat Digital** - Dapat diunduh/cetak  

## 🎨 Desain

- Gradient modern dengan warna purple/blue
- Card-based layout
- Smooth animations dan transitions
- Responsive design untuk mobile dan desktop

## 📝 Catatan

- Data saat ini menggunakan data dummy untuk demo
- Untuk production, perlu integrasi dengan backend API
- Sertifikat dapat dicetak menggunakan fungsi print browser

## 🔄 Alur Singkat

**Beranda → Login → Dashboard → Petunjuk → Pilih Kelas → Pilih Mapel → Soal → Konfirmasi → Hasil → Sertifikat**

---

Selamat coding! 🚀