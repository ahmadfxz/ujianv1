<script>
  import { link, push } from 'svelte-spa-router';
  import { isLoggedIn } from '../stores.js';
  import { onMount } from 'svelte';

  onMount(() => {
    const unsubscribe = isLoggedIn.subscribe(value => {
      if (!value) {
        push('/login');
      }
    });
    return unsubscribe;
  });
</script>

<div class="petunjuk-container">
  <div class="petunjuk-card">
    <header class="petunjuk-header">
      <h1>📋 Petunjuk Ujian</h1>
      <p>Baca dengan seksama sebelum memulai ujian</p>
    </header>

    <div class="petunjuk-content">
      <div class="info-section">
        <h2>Informasi Ujian</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-icon">📝</div>
            <div class="info-text">
              <strong>Jumlah Soal</strong>
              <p>5 soal per mata pelajaran</p>
            </div>
          </div>
          <div class="info-item">
            <div class="info-icon">⏱️</div>
            <div class="info-text">
              <strong>Waktu Pengerjaan</strong>
              <p>60 menit</p>
            </div>
          </div>
          <div class="info-item">
            <div class="info-icon">📊</div>
            <div class="info-text">
              <strong>Sistem Penilaian</strong>
              <p>Setiap jawaban benar = 20 poin</p>
            </div>
          </div>
          <div class="info-item">
            <div class="info-icon">✅</div>
            <div class="info-text">
              <strong>Nilai Minimal</strong>
              <p>60 (Lulus) / 100 (Sempurna)</p>
            </div>
          </div>
        </div>
      </div>

      <div class="aturan-section">
        <h2>Aturan Ujian</h2>
        <ul class="aturan-list">
          <li>✅ Kerjakan soal dengan teliti dan jujur</li>
          <li>✅ Pastikan koneksi internet stabil selama ujian</li>
          <li>✅ Perhatikan waktu yang tersisa di timer</li>
          <li>✅ Jawaban yang sudah disubmit tidak dapat diubah</li>
          <li>✅ Dilarang menggunakan bantuan pihak ketiga</li>
          <li>✅ Pastikan semua soal sudah dijawab sebelum submit</li>
        </ul>
      </div>

      <div class="alert-box">
        <strong>⚠️ Peringatan:</strong> Pastikan Anda sudah siap sebelum memulai ujian. 
        Timer akan dimulai begitu Anda memulai ujian.
      </div>
    </div>

    <div class="action-buttons">
      <a href="/dashboard" use:link class="btn-secondary">Kembali</a>
      <button class="btn-primary" on:click={() => push('/pilih-kelas')}>
        Lanjutkan →
      </button>
    </div>
  </div>
</div>

<style>
  .petunjuk-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .petunjuk-card {
    background: white;
    border-radius: 16px;
    padding: 3rem;
    max-width: 900px;
    width: 100%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .petunjuk-header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid #f0f0f0;
  }

  .petunjuk-header h1 {
    color: #667eea;
    margin: 0 0 0.5rem 0;
    font-size: 2rem;
  }

  .petunjuk-header p {
    color: #666;
    margin: 0;
  }

  .info-section {
    margin-bottom: 2.5rem;
  }

  .info-section h2 {
    color: #333;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .info-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 12px;
  }

  .info-icon {
    font-size: 2.5rem;
  }

  .info-text strong {
    display: block;
    color: #333;
    margin-bottom: 0.3rem;
    font-size: 0.95rem;
  }

  .info-text p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }

  .aturan-section {
    margin-bottom: 2rem;
  }

  .aturan-section h2 {
    color: #333;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  .aturan-list {
    list-style: none;
    padding: 0;
    margin: 0;
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 12px;
  }

  .aturan-list li {
    padding: 0.75rem 0;
    color: #333;
    font-size: 1rem;
    border-bottom: 1px solid #e0e0e0;
  }

  .aturan-list li:last-child {
    border-bottom: none;
  }

  .alert-box {
    background: #fff3cd;
    border: 1px solid #ffc107;
    border-radius: 8px;
    padding: 1.25rem;
    color: #856404;
    margin-bottom: 2rem;
  }

  .alert-box strong {
    display: block;
    margin-bottom: 0.5rem;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    padding-top: 2rem;
    border-top: 1px solid #e0e0e0;
  }

  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .btn-secondary {
    background: #6c757d;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .btn-secondary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    .petunjuk-card {
      padding: 2rem;
    }

    .info-grid {
      grid-template-columns: 1fr;
    }

    .action-buttons {
      flex-direction: column;
    }

    .btn-primary,
    .btn-secondary {
      width: 100%;
    }
  }
</style>