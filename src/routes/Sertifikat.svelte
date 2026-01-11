<script>
  import { onMount } from 'svelte';
  import { push } from 'svelte-spa-router';
  import { examResult, user, selectedSubject } from '../stores.js';
  import { subjects } from '../lib/data.js';

  let result = null;
  let userData = null;
  let subjectName = '';

  onMount(() => {
    const unsubscribeResult = examResult.subscribe(value => {
      result = value;
      if (!value) {
        push('/hasil');
      }
    });

    const unsubscribeUser = user.subscribe(value => {
      userData = value;
      if (!value) {
        push('/login');
      }
    });

    const unsubscribeSubject = selectedSubject.subscribe(value => {
      if (value) {
        const subj = subjects.find(s => s.id === value);
        subjectName = subj ? subj.name : '';
      }
    });

    return () => {
      unsubscribeResult();
      unsubscribeUser();
      unsubscribeSubject();
    };
  });

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  }

  function handleDownload() {
    window.print();
  }

  function handleBack() {
    push('/hasil');
  }
</script>

{#if result && userData}
  <div class="sertifikat-container">
    <div class="sertifikat-card" id="sertifikat">
      <div class="sertifikat-header">
        <div class="logo">🎓</div>
        <h1>Sertifikat Sementara</h1>
        <p class="cert-title">Bukti Telah Mengikuti Ujian Online</p>
      </div>

      <div class="sertifikat-body">
        <p class="cert-text">Dengan ini menyatakan bahwa:</p>
        
        <div class="cert-info">
          <div class="info-row">
            <span class="label">Nama Peserta:</span>
            <span class="value">{userData.name}</span>
          </div>
          <div class="info-row">
            <span class="label">Sekolah:</span>
            <span class="value">{userData.school}</span>
          </div>
          <div class="info-row">
            <span class="label">Mata Pelajaran:</span>
            <span class="value">{subjectName}</span>
          </div>
          <div class="info-row">
            <span class="label">Nilai:</span>
            <span class="value score">{result.score}</span>
          </div>
          <div class="info-row">
            <span class="label">Tanggal Ujian:</span>
            <span class="value">{formatDate(result.timestamp)}</span>
          </div>
        </div>

        <p class="cert-status">
          Status: <strong class="{result.passed ? 'passed' : 'failed'}">
            {result.passed ? 'LULUS' : 'BELUM LULUS'}
          </strong>
        </p>

        <div class="cert-note">
          <p><strong>Keterangan:</strong></p>
          <p>Sertifikat ini merupakan sertifikat sementara yang diterbitkan secara digital. 
          Sertifikat resmi akan diterbitkan oleh pihak penyelenggara setelah verifikasi data.</p>
        </div>
      </div>

      <div class="sertifikat-footer">
        <div class="footer-item">
          <div class="signature-line"></div>
          <p>Peserta</p>
        </div>
        <div class="footer-item">
          <div class="signature-line"></div>
          <p>Penyelenggara</p>
        </div>
      </div>
    </div>

    <div class="action-buttons">
      <button class="btn-secondary" on:click={handleBack}>
        ← Kembali
      </button>
      <button class="btn-primary" on:click={handleDownload}>
        🖨️ Cetak / Unduh PDF
      </button>
    </div>
  </div>
{/if}

<style>
  .sertifikat-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .sertifikat-card {
    background: white;
    border: 8px solid #667eea;
    border-radius: 16px;
    padding: 3rem;
    max-width: 900px;
    width: 100%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    margin-bottom: 2rem;
    position: relative;
  }

  .sertifikat-header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 3px solid #667eea;
  }

  .logo {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .sertifikat-header h1 {
    color: #667eea;
    margin: 0 0 0.5rem 0;
    font-size: 2.5rem;
    font-weight: 700;
  }

  .cert-title {
    color: #666;
    font-size: 1.1rem;
    margin: 0;
    font-weight: 600;
  }

  .sertifikat-body {
    margin-bottom: 3rem;
  }

  .cert-text {
    text-align: center;
    font-size: 1.1rem;
    color: #333;
    margin-bottom: 2rem;
  }

  .cert-info {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 2rem;
    margin-bottom: 2rem;
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    border-bottom: 1px solid #e0e0e0;
  }

  .info-row:last-child {
    border-bottom: none;
  }

  .label {
    color: #666;
    font-weight: 600;
    font-size: 1rem;
  }

  .value {
    color: #333;
    font-weight: 600;
    font-size: 1.1rem;
    text-align: right;
  }

  .value.score {
    font-size: 1.5rem;
    color: #667eea;
  }

  .cert-status {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .cert-status strong {
    font-size: 1.3rem;
  }

  .cert-status strong.passed {
    color: #28a745;
  }

  .cert-status strong.failed {
    color: #dc3545;
  }

  .cert-note {
    background: #fff3cd;
    border: 1px solid #ffc107;
    border-radius: 8px;
    padding: 1.5rem;
    color: #856404;
  }

  .cert-note p {
    margin: 0.5rem 0;
    line-height: 1.6;
  }

  .cert-note p:first-child {
    margin-top: 0;
  }

  .cert-note p:last-child {
    margin-bottom: 0;
  }

  .sertifikat-footer {
    display: flex;
    justify-content: space-around;
    padding-top: 3rem;
    border-top: 2px solid #e0e0e0;
  }

  .footer-item {
    text-align: center;
    flex: 1;
  }

  .signature-line {
    width: 200px;
    height: 1px;
    background: #333;
    margin: 0 auto 0.5rem;
  }

  .footer-item p {
    color: #666;
    font-weight: 600;
    margin: 0;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
    max-width: 900px;
    width: 100%;
    justify-content: center;
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

  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .btn-secondary {
    background: #6c757d;
    color: white;
  }

  .btn-secondary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media print {
    .sertifikat-container {
      background: white;
      padding: 0;
    }

    .action-buttons {
      display: none;
    }

    .sertifikat-card {
      border: none;
      box-shadow: none;
      margin: 0;
      padding: 2rem;
    }
  }

  @media (max-width: 768px) {
    .sertifikat-card {
      padding: 2rem;
    }

    .sertifikat-header h1 {
      font-size: 2rem;
    }

    .info-row {
      flex-direction: column;
      gap: 0.5rem;
    }

    .value {
      text-align: left;
    }

    .sertifikat-footer {
      flex-direction: column;
      gap: 2rem;
    }

    .action-buttons {
      flex-direction: column;
    }

    button {
      width: 100%;
    }
  }
</style>