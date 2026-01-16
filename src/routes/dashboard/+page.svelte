<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { user, isLoggedIn } from '$lib/stores';

  let userData = null;
  let dataCorrect = false;

  onMount(() => {
    const unsubscribe = user.subscribe(value => {
      userData = value;
      if (!value) {
        goto('/login');
      }
    });

    const unsubscribeLogin = isLoggedIn.subscribe(value => {
      if (!value) {
        goto('/login');
      }
    });

    return () => {
      unsubscribe();
      unsubscribeLogin();
    };
  });

  function handleDataCorrect() {
    goto('/petunjuk');
  }

  function handleDataIncorrect() {
    goto('/pembetulan-data');
  }
</script>

{#if userData}
  <div class="dashboard-container">
    <div class="dashboard-card">
      <header class="dashboard-header">
        <h1>Dashboard Peserta</h1>
        <p>Verifikasi data Anda sebelum memulai ujian</p>
      </header>

      <div class="data-section">
        <h2>Data Peserta</h2>
        <div class="data-grid">
          <div class="data-item">
            <div class="data-label">Nama Peserta</div>
            <div class="value">{userData.name}</div>
          </div>
          <div class="data-item">
            <div class="data-label">Sekolah</div>
            <div class="value">{userData.school}</div>
          </div>
          <div class="data-item">
            <div class="data-label">Tanggal Lahir</div>
            <div class="value">{userData.birthDate}</div>
          </div>
          <div class="data-item">
            <div class="data-label">Username</div>
            <div class="value">{userData.username}</div>
          </div>
        </div>

        <div class="status-badge">
          <span class="badge">Status: Terdaftar</span>
        </div>
      </div>

      <div class="action-section">
        <h3>Verifikasi Data</h3>
        <p>Pastikan semua data di atas sudah benar sebelum melanjutkan</p>

        <div class="buttons">
          <button
            class="btn-success"
            on:click={handleDataCorrect}
          >
            ✅ Data Sudah Benar - Mulai Ujian
          </button>
          <button
            class="btn-warning"
            on:click={handleDataIncorrect}
          >
            ❌ Ajukan Pembetulan Data
          </button>
        </div>
      </div>

      <div class="footer-actions">
        <a href="/"  class="back-link">← Kembali ke Beranda</a>
      </div>
    </div>
  </div>
{/if}

<style>
  .dashboard-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #ffffff 0%, #d1fae5 100%);
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dashboard-card {
    background: white;
    border-radius: 16px;
    padding: 3rem;
    max-width: 800px;
    width: 100%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .dashboard-header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid #f0f0f0;
  }

  .dashboard-header h1 {
    color: #059669;
    margin: 0 0 0.5rem 0;
    font-size: 2rem;
  }

  .dashboard-header p {
    color: #666;
    margin: 0;
  }

  .data-section {
    margin-bottom: 2.5rem;
  }

  .data-section h2 {
    color: #333;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .data-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .data-item {
    background: #f8f9fa;
    padding: 1.25rem;
    border-radius: 8px;
  }

  .data-item .data-label {
    display: block;
    color: #666;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .data-item .value {
    color: #333;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .status-badge {
    text-align: center;
  }

  .badge {
    display: inline-block;
    background: #28a745;
    color: white;
    padding: 0.5rem 1.5rem;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.95rem;
  }

  .action-section {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 2rem;
  }

  .action-section h3 {
    color: #333;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  .action-section p {
    color: #666;
    margin-bottom: 1.5rem;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  button {
    padding: 1rem 2rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .btn-success {
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    color: white;
  }

  .btn-success:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
  }

  .btn-warning {
    background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
    color: #333;
  }

  .btn-warning:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(255, 193, 7, 0.3);
  }

  .footer-actions {
    text-align: center;
    padding-top: 1.5rem;
    border-top: 1px solid #e0e0e0;
  }

  .back-link {
    color: #059669;
    text-decoration: none;
    font-weight: 600;
  }

  .back-link:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .dashboard-card {
      padding: 2rem;
    }

    .data-grid {
      grid-template-columns: 1fr;
    }
  }
</style>