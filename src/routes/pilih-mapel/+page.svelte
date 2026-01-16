<script>
  import { goto } from '$app/navigation';
  import { selectedSubject, selectedClass, examData, user } from '$lib/stores';
  import { subjects, generateQuestions } from '$lib/data';
  import { onMount } from 'svelte';
  import { isLoggedIn } from '$lib/stores';

  let currentClass = null;
  let userData = null;

  onMount(() => {
    const unsubscribeLogin = isLoggedIn.subscribe(value => {
      if (!value) {
        goto('/login');
      }
    });

    const unsubscribeClass = selectedClass.subscribe(value => {
      currentClass = value;
      if (!value) {
        goto('/pilih-kelas');
      }
    });

    const unsubscribeUser = user.subscribe(value => {
      userData = value;
    });

    return () => {
      unsubscribeLogin();
      unsubscribeClass();
      unsubscribeUser();
    };
  });

  function selectSubject(subjectId) {
    selectedSubject.set(subjectId);
    const questions = generateQuestions(subjectId, currentClass);
    examData.set({
      questions: questions,
      answers: {},
      startTime: null,
      endTime: null,
      timeLimit: 60 * 60 * 1000
    });
    goto('/soal');
  }

  function getClassName(classId) {
    const classNames = { '4': 'Kelas 4', '5': 'Kelas 5', '6': 'Kelas 6' };
    return classNames[classId] || 'Kelas';
  }
</script>

<div class="pilih-mapel-container">
  <div class="pilih-mapel-card">
    <header class="pilih-mapel-header">
      <h1>📖 Pilih Mata Pelajaran</h1>
      <p>Kelas yang dipilih: <strong>{#if currentClass}{getClassName(currentClass)}{/if}</strong></p>
    </header>

    <div class="subjects-grid">
      {#each subjects as subject}
        <div 
          class="subject-card" 
          on:click={() => selectSubject(subject.id)}
          on:keydown={(e) => e.key === 'Enter' && selectSubject(subject.id)}
          role="button" 
          tabindex="0"
        >
          <div class="subject-icon">{subject.icon}</div>
          <h2>{subject.name}</h2>
          <div class="status-badge">Belum dikerjakan</div>
          <div class="select-indicator">Mulai Ujian →</div>
        </div>
      {/each}
    </div>

    <div class="action-buttons">
      <a href="/pilih-kelas"  class="btn-secondary">Kembali</a>
    </div>
  </div>
</div>

<style>
  .pilih-mapel-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #ffffff 0%, #d1fae5 100%);
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pilih-mapel-card {
    background: white;
    border-radius: 16px;
    padding: 3rem;
    max-width: 1000px;
    width: 100%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .pilih-mapel-header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid #f0f0f0;
  }

  .pilih-mapel-header h1 {
    color: #059669;
    margin: 0 0 0.5rem 0;
    font-size: 2rem;
  }

  .pilih-mapel-header p {
    color: #666;
    margin: 0;
  }

  .pilih-mapel-header strong {
    color: #059669;
  }

  .subjects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .subject-card {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border: 2px solid #e0e0e0;
    border-radius: 16px;
    padding: 2.5rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
  }

  .subject-card:hover {
    transform: translateY(-5px);
    border-color: #059669;
    box-shadow: 0 8px 16px rgba(16, 185, 129, 0.2);
    background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  }

  .subject-card:hover .subject-icon,
  .subject-card:hover h2,
  .subject-card:hover .select-indicator {
    color: #047857;
  }

  .subject-card:hover .status-badge {
    background: #059669;
    color: white;
  }

  .subject-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .subject-card h2 {
    color: #333;
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
    transition: color 0.3s;
  }

  .status-badge {
    display: inline-block;
    background: #6c757d;
    color: white;
    padding: 0.4rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 1rem;
    transition: all 0.3s;
  }

  .select-indicator {
    color: #059669;
    font-weight: 600;
    font-size: 1rem;
    transition: color 0.3s;
  }

  .action-buttons {
    display: flex;
    justify-content: flex-start;
    padding-top: 2rem;
    border-top: 1px solid #e0e0e0;
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
    .pilih-mapel-card {
      padding: 2rem;
    }

    .subjects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>