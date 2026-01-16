<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { examData, selectedSubject, user, examResult } from '$lib/stores';
  import { subjects } from '$lib/data';

  let exam = null;
  let result = null;
  let userData = null;
  let subjectName = '';
  let calculated = false;

  onMount(() => {
    const unsubscribeExam = examData.subscribe(value => {
      exam = value;
      if (!calculated && value && value.questions && value.questions.length > 0) {
        calculateResult();
        calculated = true;
      }
      if (!value || !value.questions || value.questions.length === 0) {
        goto('/pilih-mapel');
      }
    });

    const unsubscribeSubject = selectedSubject.subscribe(value => {
      if (value) {
        const subj = subjects.find(s => s.id === value);
        subjectName = subj ? subj.name : '';
      }
    });

    const unsubscribeUser = user.subscribe(value => {
      userData = value;
    });

    return () => {
      unsubscribeExam();
      unsubscribeSubject();
      unsubscribeUser();
    };
  });

  function calculateResult() {
    if (!exam || !exam.questions) return;
    
    let correct = 0;
    exam.questions.forEach(q => {
      if (exam.answers[q.id] === q.correct) {
        correct++;
      }
    });

    const score = (correct / exam.questions.length) * 100;
    result = {
      totalQuestions: exam.questions.length,
      correct,
      wrong: exam.questions.length - correct,
      score: Math.round(score),
      passed: score >= 60,
      timestamp: Date.now()
    };

    examResult.set(result);
  }

  function handleDownloadCertificate() {
    goto('/sertifikat');
  }

  function handleLogout() {
    goto('/');
  }
</script>

{#if result && userData}
  <div class="hasil-container">
    <div class="hasil-card">
      <div class="hasil-header">
        <div class="result-icon {result.passed ? 'passed' : 'failed'}">
          {result.passed ? '✅' : '❌'}
        </div>
        <h1>{result.passed ? 'Selamat!' : 'Belum Lulus'}</h1>
        <p class="subtitle">Hasil Ujian {subjectName}</p>
      </div>

      <div class="score-section">
        <div class="score-circle {result.passed ? 'passed' : 'failed'}">
          <div class="score-value">{result.score}</div>
          <div class="score-label">Nilai</div>
        </div>
      </div>

      <div class="details-section">
        <h2>Rincian Hasil</h2>
        <div class="details-grid">
          <div class="detail-item">
            <div class="detail-icon">📝</div>
            <div class="detail-text">
              <div class="detail-label">Total Soal</div>
              <div class="detail-value">{result.totalQuestions}</div>
            </div>
          </div>
          <div class="detail-item success">
            <div class="detail-icon">✅</div>
            <div class="detail-text">
              <div class="detail-label">Benar</div>
              <div class="detail-value">{result.correct}</div>
            </div>
          </div>
          <div class="detail-item error">
            <div class="detail-icon">❌</div>
            <div class="detail-text">
              <div class="detail-label">Salah</div>
              <div class="detail-value">{result.wrong}</div>
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-icon">📊</div>
            <div class="detail-text">
              <div class="detail-label">Nilai</div>
              <div class="detail-value">{result.score}/100</div>
            </div>
          </div>
        </div>
      </div>

      <div class="status-card {result.passed ? 'passed' : 'failed'}">
        <h3>{result.passed ? 'Status: Lulus ✅' : 'Status: Belum Lulus ❌'}</h3>
        <p>
          {result.passed 
            ? 'Anda telah berhasil melewati batas nilai minimal (60). Silakan unduh sertifikat Anda.' 
            : 'Nilai Anda belum mencapai batas minimal (60). Silakan coba lagi di kesempatan berikutnya.'}
        </p>
      </div>

      <div class="student-info">
        <h3>Data Peserta</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Nama:</span>
            <span class="info-value">{userData.name}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Sekolah:</span>
            <span class="info-value">{userData.school}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Mata Pelajaran:</span>
            <span class="info-value">{subjectName}</span>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        {#if result.passed}
          <button class="btn-primary" on:click={handleDownloadCertificate}>
            📜 Bukti Perolehan Nilai
          </button>
        {/if}
        <button class="btn-secondary" on:click={handleLogout}>
          Kembali ke Beranda
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .hasil-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #ffffff 0%, #d1fae5 100%);
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hasil-card {
    background: white;
    border-radius: 16px;
    padding: 3rem;
    max-width: 800px;
    width: 100%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .hasil-header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid #f0f0f0;
  }

  .result-icon {
    font-size: 5rem;
    margin-bottom: 1rem;
  }

  .hasil-header h1 {
    color: #333;
    margin: 0 0 0.5rem 0;
    font-size: 2.5rem;
  }

  .subtitle {
    color: #666;
    font-size: 1.1rem;
    margin: 0;
  }

  .score-section {
    text-align: center;
    margin-bottom: 3rem;
  }

  .score-circle {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    border: 8px solid;
    margin: 0 auto;
  }

  .score-circle.passed {
    border-color: #28a745;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    color: white;
  }

  .score-circle.failed {
    border-color: #dc3545;
    background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%);
    color: white;
  }

  .score-value {
    font-size: 4rem;
    font-weight: 700;
    line-height: 1;
  }

  .score-label {
    font-size: 1.1rem;
    font-weight: 600;
    margin-top: 0.5rem;
  }

  .details-section {
    margin-bottom: 2rem;
  }

  .details-section h2 {
    color: #333;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  .details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    gap: 1.5rem;
  }

  .detail-item {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .detail-item.success {
    background: #d4edda;
    border: 2px solid #28a745;
  }

  .detail-item.error {
    background: #f8d7da;
    border: 2px solid #dc3545;
  }

  .detail-icon {
    font-size: 2.5rem;
  }

  .detail-text {
    flex: 1;
  }

  .detail-label {
    display: block;
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
  }

  .detail-value {
    display: block;
    color: #333;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .status-card {
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .status-card.passed {
    background: #d4edda;
    border: 2px solid #28a745;
  }

  .status-card.failed {
    background: #f8d7da;
    border: 2px solid #dc3545;
  }

  .status-card h3 {
    color: #333;
    margin: 0 0 0.5rem 0;
    font-size: 1.3rem;
  }

  .status-card p {
    color: #333;
    margin: 0;
    line-height: 1.6;
  }

  .student-info {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .student-info h3 {
    color: #333;
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
  }

  .info-grid {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .info-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e0e0e0;
  }

  .info-item:last-child {
    border-bottom: none;
  }

  .info-label {
    color: #666;
    font-weight: 600;
  }

  .info-value {
    color: #333;
    font-weight: 600;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
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
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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

  @media (max-width: 768px) {
    .hasil-card {
      padding: 2rem;
    }

    .details-grid {
      grid-template-columns: 1fr;
    }

    .action-buttons {
      flex-direction: column;
    }

    button {
      width: 100%;
    }
  }
</style>