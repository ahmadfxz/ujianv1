<script>
  import { push } from 'svelte-spa-router';
  import { examData } from '../stores.js';
  import { onMount } from 'svelte';

  let exam = null;

  onMount(() => {
    const unsubscribe = examData.subscribe(value => {
      exam = value;
      if (!value || !value.questions || value.questions.length === 0) {
        push('/pilih-mapel');
      }
    });
    return unsubscribe;
  });

  function handleConfirm() {
    // Calculate result
    if (!exam) return;
    
    let correct = 0;
    exam.questions.forEach(q => {
      if (exam.answers[q.id] === q.correct) {
        correct++;
      }
    });

    const score = (correct / exam.questions.length) * 100;
    const result = {
      totalQuestions: exam.questions.length,
      correct,
      wrong: exam.questions.length - correct,
      score: Math.round(score),
      passed: score >= 60,
      timestamp: Date.now()
    };

    examData.update(data => ({
      ...data,
      endTime: Date.now()
    }));

    // Store result in localStorage or state
    push('/hasil');
  }

  function handleCancel() {
    push('/soal');
  }
</script>

<div class="konfirmasi-container">
  <div class="konfirmasi-card">
    <div class="konfirmasi-icon">⚠️</div>
    <h1>Konfirmasi Selesai</h1>
    <p class="message">
      Apakah Anda yakin ingin mengakhiri ujian?
    </p>
    <p class="warning">
      Pastikan semua soal sudah terjawab. Setelah mengkonfirmasi, 
      Anda tidak dapat kembali untuk mengubah jawaban.
    </p>

    {#if exam && exam.questions}
      <div class="summary">
        <div class="summary-item">
          <span class="label">Total Soal:</span>
          <span class="value">{exam.questions.length}</span>
        </div>
        <div class="summary-item">
          <span class="label">Soal Terjawab:</span>
          <span class="value">{Object.keys(exam.answers || {}).length}</span>
        </div>
        <div class="summary-item">
          <span class="label">Soal Belum Terjawab:</span>
          <span class="value">{exam.questions.length - Object.keys(exam.answers || {}).length}</span>
        </div>
      </div>
    {/if}

    <div class="action-buttons">
      <button class="btn-secondary" on:click={handleCancel}>
        ← Kembali ke Soal
      </button>
      <button class="btn-primary" on:click={handleConfirm}>
        Ya, Selesai →
      </button>
    </div>
  </div>
</div>

<style>
  .konfirmasi-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .konfirmasi-card {
    background: white;
    border-radius: 16px;
    padding: 3rem;
    max-width: 600px;
    width: 100%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  .konfirmasi-icon {
    font-size: 5rem;
    margin-bottom: 1.5rem;
  }

  .konfirmasi-card h1 {
    color: #333;
    margin: 0 0 1rem 0;
    font-size: 2rem;
  }

  .message {
    color: #333;
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0 0 1.5rem 0;
  }

  .warning {
    color: #666;
    font-size: 1rem;
    line-height: 1.6;
    margin: 0 0 2rem 0;
    background: #fff3cd;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #ffc107;
  }

  .summary {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    text-align: left;
  }

  .summary-item {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 0;
    border-bottom: 1px solid #e0e0e0;
  }

  .summary-item:last-child {
    border-bottom: none;
  }

  .label {
    color: #666;
    font-weight: 600;
  }

  .value {
    color: #333;
    font-weight: 600;
    font-size: 1.1rem;
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
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    color: white;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
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
    .konfirmasi-card {
      padding: 2rem;
    }

    .action-buttons {
      flex-direction: column;
    }

    button {
      width: 100%;
    }
  }
</style>