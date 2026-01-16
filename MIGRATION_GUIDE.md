# Panduan Migrasi ke SvelteKit

Migrasi dari Svelte + svelte-spa-router ke SvelteKit memerlukan perubahan struktur dan routing.

## Perubahan Utama

### 1. Routing
- **Sebelum:** Hash-based routing dengan svelte-spa-router
- **Sesudah:** File-based routing dengan SvelteKit

### 2. Struktur File
- **Sebelum:** `src/routes/Home.svelte` 
- **Sesudah:** `src/routes/+page.svelte` (home page)

- **Sebelum:** `src/routes/Login.svelte`
- **Sesudah:** `src/routes/login/+page.svelte`

### 3. Navigation
- **Sebelum:** `import { push, link } from 'svelte-spa-router'`
  - `push('/login')`
  - `<a href="/login" use:link>`
  
- **Sesudah:** `import { goto } from '$app/navigation'`
  - `goto('/login')`
  - `<a href="/login">` (tidak perlu use:link)

### 4. Stores
- Pindahkan dari `src/stores.js` ke `src/lib/stores.js`
- Import: `import { user } from '$lib/stores'`

### 5. Data
- Tetap di `src/lib/data.js`
- Import: `import { classes } from '$lib/data'`

## Struktur Route Baru

```
src/routes/
├── +layout.svelte          # Layout utama
├── +page.svelte            # Home (/)
├── login/
│   └── +page.svelte        # Login (/login)
├── dashboard/
│   └── +page.svelte        # Dashboard (/dashboard)
├── petunjuk/
│   └── +page.svelte        # Petunjuk (/petunjuk)
├── pilih-kelas/
│   └── +page.svelte        # Pilih Kelas (/pilih-kelas)
├── pilih-mapel/
│   └── +page.svelte        # Pilih Mapel (/pilih-mapel)
├── soal/
│   └── +page.svelte        # Soal (/soal)
├── konfirmasi-selesai/
│   └── +page.svelte        # Konfirmasi (/konfirmasi-selesai)
├── hasil/
│   └── +page.svelte        # Hasil (/hasil)
├── sertifikat/
│   └── +page.svelte        # Sertifikat (/sertifikat)
└── pembetulan-data/
    └── +page.svelte        # Pembetulan Data (/pembetulan-data)
```

## File yang Perlu Dihapus
- `src/App.svelte`
- `src/main.js`
- `src/index.html` (jika ada)
- `src/routes/*.svelte` (yang sudah dipindah ke folder)

## Catatan
- SvelteKit menggunakan adapter-static untuk static site
- Routing otomatis berdasarkan struktur folder
- Tidak perlu hash (#) di URL
