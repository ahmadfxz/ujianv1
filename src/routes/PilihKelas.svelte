<script>
  import { link, push } from 'svelte-spa-router';
  import { selectedClass } from '../stores.js';
  import { classes } from '../lib/data.js';
  import { onMount } from 'svelte';
  import { isLoggedIn } from '../stores.js';

  onMount(() => {
    const unsubscribe = isLoggedIn.subscribe(value => {
      if (!value) {
        push('/login');
      }
    });
    return unsubscribe;
  });

  function selectClass(classId) {
    selectedClass.set(classId);
    push('/pilih-mapel');
  }
</script>

<div class="pilih-kelas-container">
  <div class="pilih-kelas-card">
    <header class="pilih-kelas-header">
      <h1>📚 Pilih Kelas</h1>
      <p>Pilih kelas sesuai tingkat Anda</p>
    </header>

    <div class="classes-grid">
      {#each classes as kelas}
        <div class="class-card" on:click={() => selectClass(kelas.id)} role="button" tabindex="0">
          <div class="class-icon">🎓</div>
          <h2>{kelas.name}</h2>
          <p>{kelas.description}</p>
          <div class="select-indicator">Pilih →</div>
        </div>
      {/each}
    </div>

    <div class="action-buttons">
      <a href="/petunjuk" use:link class="btn-secondary">Kembali</a>
    </div>
  </div>
</div>

<style>
  .pilih-kelas-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pilih-kelas-card {
    background: white;
    border-radius: 16px;
    padding: 3rem;
    max-width: 900px;
    width: 100%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .pilih-kelas-header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid #f0f0f0;
  }

  .pilih-kelas-header h1 {
    color: #667eea;
    margin: 0 0 0.5rem 0;
    font-size: 2rem;
  }

  .pilih-kelas-header p {
    color: #666;
    margin: 0;
  }

  .classes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .class-card {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border: 2px solid #e0e0e0;
    border-radius: 16px;
    padding: 2.5rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
  }

  .class-card:hover {
    transform: translateY(-5px);
    border-color: #667eea;
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.2);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .class-card:hover .class-icon,
  .class-card:hover h2,
  .class-card:hover p {
    color: white;
  }

  .class-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .class-card h2 {
    color: #667eea;
    margin: 0 0 1rem 0;
    font-size: 1.8rem;
    transition: color 0.3s;
  }

  .class-card p {
    color: #666;
    margin: 0 0 1.5rem 0;
    font-size: 1rem;
    transition: color 0.3s;
  }

  .select-indicator {
    color: #667eea;
    font-weight: 600;
    font-size: 1rem;
    transition: color 0.3s;
  }

  .class-card:hover .select-indicator {
    color: white;
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
    .pilih-kelas-card {
      padding: 2rem;
    }

    .classes-grid {
      grid-template-columns: 1fr;
    }
  }
</style>