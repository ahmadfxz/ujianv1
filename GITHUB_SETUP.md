# Setup GitHub Repository

Panduan untuk push kode ke GitHub.

## Langkah-langkah

### 1. Buat Repository di GitHub

1. Buka https://github.com
2. Klik tombol **"+"** di pojok kanan atas
3. Pilih **"New repository"**
4. Isi:
   - **Repository name:** `ujianv1` (atau nama yang Anda inginkan)
   - **Description:** (opsional) "Try Out & Lomba Online website dengan Svelte"
   - **Visibility:** Public atau Private (pilih sesuai kebutuhan)
   - **JANGAN** centang "Initialize this repository with a README"
5. Klik **"Create repository"**

### 2. Push Kode ke GitHub

Setelah repository dibuat, GitHub akan menampilkan instruksi. Jalankan perintah berikut di terminal:

```bash
# Tambahkan remote repository (ganti USERNAME dengan GitHub username Anda)
git remote add origin https://github.com/USERNAME/ujianv1.git

# Atau jika menggunakan SSH:
# git remote add origin git@github.com:USERNAME/ujianv1.git

# Rename branch ke main (jika perlu)
git branch -M main

# Push ke GitHub
git push -u origin main
```

### 3. Authentikasi (jika diperlukan)

Jika diminta username dan password:
- **Username:** GitHub username Anda
- **Password:** Gunakan Personal Access Token (bukan password GitHub)

#### Membuat Personal Access Token:

1. Buka GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Klik **"Generate new token (classic)"**
3. Beri nama token (misal: "ujianv1")
4. Pilih scope: **repo** (semua centang)
5. Klik **"Generate token"**
6. **Copy token** (hanya ditampilkan sekali!)
7. Gunakan token sebagai password saat push

### 4. Verifikasi

Setelah push berhasil, buka repository di browser:
```
https://github.com/USERNAME/ujianv1
```

## Perintah Lengkap (Quick Reference)

```bash
# Inisialisasi (sudah dilakukan)
git init
git add .
git commit -m "Initial commit: Try Out & Lomba Online website dengan Svelte"

# Setup remote dan push (lakukan sekarang)
git remote add origin https://github.com/USERNAME/ujianv1.git
git branch -M main
git push -u origin main
```

## Update Kode di Masa Depan

Setelah melakukan perubahan:

```bash
git add .
git commit -m "Deskripsi perubahan"
git push
```

## Catatan

- File di folder `dist/` tidak di-commit (sudah ada di .gitignore)
- File `node_modules/` juga tidak di-commit
- Jangan commit file yang berisi informasi sensitif (password, API keys, dll)

---

Selamat! Kode Anda sekarang ada di GitHub 🎉