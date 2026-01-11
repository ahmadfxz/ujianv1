<script>
  import Router from 'svelte-spa-router';
  import Home from './routes/Home.svelte';
  import Login from './routes/Login.svelte';
  import Dashboard from './routes/Dashboard.svelte';
  import Petunjuk from './routes/Petunjuk.svelte';
  import PilihKelas from './routes/PilihKelas.svelte';
  import PilihMapel from './routes/PilihMapel.svelte';
  import Soal from './routes/Soal.svelte';
  import KonfirmasiSelesai from './routes/KonfirmasiSelesai.svelte';
  import Hasil from './routes/Hasil.svelte';
  import Sertifikat from './routes/Sertifikat.svelte';

  const routes = {
    '/': Home,
    '/login': Login,
    '/dashboard': Dashboard,
    '/petunjuk': Petunjuk,
    '/pilih-kelas': PilihKelas,
    '/pilih-mapel': PilihMapel,
    '/soal': Soal,
    '/konfirmasi-selesai': KonfirmasiSelesai,
    '/hasil': Hasil,
    '/sertifikat': Sertifikat
  };
</script>

<Router {routes} />