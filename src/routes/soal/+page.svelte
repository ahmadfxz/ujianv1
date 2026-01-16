<script>
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { examData, selectedSubject, selectedClass, user } from '$lib/stores';
  import { subjects } from '$lib/data';

  let currentQuestion = 1;
  let answers = {};
  let timeRemaining = 60 * 60; // 60 menit dalam detik
  let timerInterval = null;
  let exam = null;
  let userData = null;
  let subjectName = '';

  onMount(() => {
    const unsubscribeExam = examData.subscribe(value => {
      exam = value;
      if (value && value.questions && value.questions.length > 0) {
        answers = { ...value.answers };
        if (!value.startTime) {
          examData.update(data => ({
            ...data,
            startTime: Date.now()
          }));
        }
      } else {
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

    // Start timer
    timerInterval = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
      } else {
        handleTimeUp();
      }
    }, 1000);

    return () => {
      unsubscribeExam();
      unsubscribeSubject();
      unsubscribeUser();
      if (timerInterval) clearInterval(timerInterval);
    };
  });

  onDestroy(() => {
    if (timerInterval) clearInterval(timerInterval);
  });

  function handleAnswer(questionId, answerIndex) {
    answers[questionId] = answerIndex;
    examData.update(data => ({
      ...data,
      answers: { ...answers }
    }));
  }

  function nextQuestion() {
    if (currentQuestion < exam.questions.length) {
      currentQuestion++;
    }
  }

  function prevQuestion() {
    if (currentQuestion > 1) {
      currentQuestion--;
    }
  }

  function goToQuestion(num) {
    if (num >= 1 && num <= exam.questions.length) {
      currentQuestion = num;
    }
  }

  function handleFinish() {
    goto('/konfirmasi-selesai');
  }

  function handleTimeUp() {
    if (timerInterval) clearInterval(timerInterval);
    alert('Waktu habis! Ujian akan diakhiri.');
    calculateResult();
    goto('/hasil');
  }

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${minutes}:${String(secs).padStart(2, '0')}`;
  }

  function calculateResult() {
    if (!exam || !exam.questions) return;
    
    let correct = 0;
    exam.questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        correct++;
      }
    });

    const score = (correct / exam.questions.length) * 100;
    const result = {
      totalQuestions: exam.questions.length,
      correct,
      wrong: exam.questions.length - correct,
      score: Math.round(score),
      passed: score >= 60
    };

    examData.update(data => ({
      ...data,
      endTime: Date.now()
    }));
  }
</script>

{#if exam && exam.questions && exam.questions.length > 0}
  <div class="soal-container">
    <div class="soal-header">
      <div class="header-info">
        <h1>Ujian {subjectName}</h1>
        <div class="timer {timeRemaining < 300 ? 'warning' : ''}">
          ⏱️ {formatTime(timeRemaining)}
        </div>
      </div>
    </div>

    <div class="soal-content">
      <div class="question-section">
        <div class="question-number">
          Soal {currentQuestion} dari {exam.questions.length}
        </div>

        <div class="question-card">
          <h2>{exam.questions[currentQuestion - 1].question}</h2>

          <div class="options">
            {#each exam.questions[currentQuestion - 1].options as option, index}
              <label class="option-label {answers[exam.questions[currentQuestion - 1].id] === index ? 'selected' : ''}">
                <input
                  type="radio"
                  name="question-{exam.questions[currentQuestion - 1].id}"
                  value={index}
                  checked={answers[exam.questions[currentQuestion - 1].id] === index}
                  on:change={() => handleAnswer(exam.questions[currentQuestion - 1].id, index)}
                />
                <span class="option-letter">{String.fromCharCode(65 + index)}.</span>
                <span class="option-text">{option}</span>
              </label>
            {/each}
          </div>
        </div>

        <div class="question-navigation">
          <button
            class="btn-nav"
            on:click={prevQuestion}
            disabled={currentQuestion === 1}
          >
            ← Sebelumnya
          </button>
          <button
            class="btn-nav btn-primary"
            on:click={currentQuestion === exam.questions.length ? handleFinish : nextQuestion}
          >
            {currentQuestion === exam.questions.length ? 'Selesai →' : 'Berikutnya →'}
          </button>
        </div>
      </div>

      <div class="sidebar">
        <div class="question-list-card">
          <h3>Daftar Soal</h3>
          <div class="question-grid">
            {#each exam.questions as question, index}
              <button
                class="question-btn {answers[question.id] !== undefined ? 'answered' : ''} {currentQuestion === index + 1 ? 'current' : ''}"
                on:click={() => goToQuestion(index + 1)}
              >
                {index + 1}
              </button>
            {/each}
          </div>
          <div class="legend">
            <div class="legend-item">
              <span class="legend-box answered"></span>
              <span>Terjawab</span>
            </div>
            <div class="legend-item">
              <span class="legend-box"></span>
              <span>Belum</span>
            </div>
            <div class="legend-item">
              <span class="legend-box current"></span>
              <span>Saat ini</span>
            </div>
          </div>
        </div>

        <div class="progress-card">
          <h3>Progress</h3>
          <div class="progress-bar">
            <div
              class="progress-fill"
              style="width: {(Object.keys(answers).length / exam.questions.length) * 100}%"
            ></div>
          </div>
          <p>{Object.keys(answers).length} / {exam.questions.length} soal terjawab</p>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .soal-container {
    min-height: 100vh;
    background: #f5f7fa;
    padding: 1.5rem;
  }

  .soal-header {
    background: white;
    border-radius: 12px;
    padding: 1.5rem 2rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .header-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-info h1 {
    color: #333;
    margin: 0;
    font-size: 1.5rem;
  }

  .timer {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-size: 1.2rem;
    font-weight: 600;
    font-family: monospace;
  }

  .timer.warning {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  .soal-content {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 1.5rem;
  }

  .question-section {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .question-number {
    color: #059669;
    font-weight: 600;
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
  }

  .question-card h2 {
    color: #333;
    font-size: 1.5rem;
    margin: 0 0 2rem 0;
    line-height: 1.6;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .option-label {
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .option-label:hover {
    border-color: #059669;
    background: #f8f9ff;
  }

  .option-label.selected {
    border-color: #059669;
    background: #f0f4ff;
  }

  .option-label input {
    margin-right: 1rem;
    cursor: pointer;
  }

  .option-letter {
    font-weight: 600;
    color: #059669;
    margin-right: 0.75rem;
    min-width: 25px;
  }

  .option-text {
    flex: 1;
    color: #333;
  }

  .question-navigation {
    display: flex;
    justify-content: space-between;
    padding-top: 2rem;
    border-top: 1px solid #e0e0e0;
  }

  .btn-nav {
    padding: 0.875rem 2rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    background: #6c757d;
    color: white;
  }

  .btn-nav:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .btn-nav:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-nav.btn-primary {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .question-list-card,
  .progress-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .question-list-card h3,
  .progress-card h3 {
    color: #333;
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
  }

  .question-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .question-btn {
    aspect-ratio: 1;
    border: 2px solid #e0e0e0;
    background: white;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    color: #333;
  }

  .question-btn:hover {
    border-color: #059669;
    transform: scale(1.05);
  }

  .question-btn.answered {
    background: #28a745;
    border-color: #28a745;
    color: white;
  }

  .question-btn.current {
    border-color: #059669;
    border-width: 3px;
    background: #f0f4ff;
  }

  .legend {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.85rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .legend-box {
    width: 20px;
    height: 20px;
    border: 2px solid #e0e0e0;
    border-radius: 4px;
    display: inline-block;
  }

  .legend-box.answered {
    background: #28a745;
    border-color: #28a745;
  }

  .legend-box.current {
    border-color: #059669;
    background: #f0f4ff;
  }

  .progress-bar {
    width: 100%;
    height: 12px;
    background: #e0e0e0;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    transition: width 0.3s;
  }

  .progress-card p {
    color: #666;
    font-size: 0.9rem;
    margin: 0;
  }

  @media (max-width: 1024px) {
    .soal-content {
      grid-template-columns: 1fr;
    }

    .sidebar {
      order: -1;
    }

    .question-grid {
      grid-template-columns: repeat(8, 1fr);
    }
  }

  @media (max-width: 768px) {
    .soal-container {
      padding: 1rem;
    }

    .header-info {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }

    .question-card {
      padding: 1.5rem;
    }

    .question-grid {
      grid-template-columns: repeat(5, 1fr);
    }
  }
</style>