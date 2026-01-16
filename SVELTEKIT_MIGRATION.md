# Migrasi ke SvelteKit - Status

Migrasi dari Svelte + svelte-spa-router ke SvelteKit sedang dalam proses.

## ✅ Yang Sudah Dilakukan

1. ✅ Install SvelteKit dependencies
2. ✅ Setup svelte.config.js dengan adapter-static
3. ✅ Update vite.config.js untuk SvelteKit
4. ✅ Update package.json scripts
5. ✅ Buat struktur routes dengan folder-based routing
6. ✅ Copy semua route files ke struktur baru
7. ✅ Buat +layout.svelte
8. ✅ Pindahkan stores ke src/lib/stores.js
9. ✅ Pindahkan data.js ke src/lib/data.js
10. ✅ Buat app.html

## ⚠️ Yang Perlu Dilakukan

### 1. Perbaiki Import Statements

Semua file perlu diupdate:

**Dari:**
```js
import { link, push } from 'svelte-spa-router';
import { user } from '../stores.js';
import { classes } from '../lib/data.js';
```

**Ke:**
```js
import { goto } from '$app/navigation';
import { user } from '$lib/stores';
import { classes } from '$lib/data';
```

**Dari:**
```svelte
<a href="/login" use:link>Login</a>
push('/dashboard');
```

**Ke:**
```svelte
<a href="/login">Login</a>
goto('/dashboard');
```

### 2. File yang Perlu Diupdate

- [ ] src/routes/+page.svelte (Home)
- [ ] src/routes/login/+page.svelte
- [ ] src/routes/dashboard/+page.svelte
- [ ] src/routes/petunjuk/+page.svelte
- [ ] src/routes/pilih-kelas/+page.svelte
- [ ] src/routes/pilih-mapel/+page.svelte
- [ ] src/routes/soal/+page.svelte
- [ ] src/routes/konfirmasi-selesai/+page.svelte
- [ ] src/routes/hasil/+page.svelte
- [ ] src/routes/sertifikat/+page.svelte
- [ ] src/routes/pembetulan-data/+page.svelte

### 3. Hapus File Lama

- [ ] src/App.svelte (sudah)
- [ ] src/main.js (sudah)
- [ ] src/routes/*.svelte di root routes (sudah)
- [ ] index.html di root (bisa dihapus)

### 4. Test

```bash
npm run dev
```

## Struktur Baru

```
src/
├── app.html              # HTML template SvelteKit
├── app.css               # Global styles
├── routes/
│   ├── +layout.svelte    # Layout utama
│   ├── +page.svelte      # Home (/)
│   ├── login/
│   │   └── +page.svelte  # /login
│   ├── dashboard/
│   │   └── +page.svelte  # /dashboard
│   └── ...
└── lib/
    ├── stores.js         # State management
    └── data.js           # Data dummy
```

## Catatan

- SvelteKit menggunakan file-based routing
- Import dengan `$lib/` untuk files di src/lib/
- Import dengan `$app/` untuk SvelteKit APIs
- Tidak perlu use:link, langsung pakai `<a href>`
- goto() menggantikan push() dari svelte-spa-router
