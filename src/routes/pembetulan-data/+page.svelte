<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { user, isLoggedIn } from '$lib/stores';

  let userData = null;
  let showForm = false;
  let formData = {
    name: '',
    school: '',
    birthDate: ''
  };
  let submitted = false;

  onMount(() => {
    const unsubscribe = user.subscribe(value => {
      userData = value;
      if (value) {
        formData.name = value.name;
        formData.school = value.school;
        formData.birthDate = value.birthDate;
      }
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

  function handleSubmit(e) {
    e.preventDefault();
    // Simulasi submit - di production akan kirim ke backend
    submitted = true;
    
    setTimeout(() => {
      alert('Permohonan pembetulan data telah dikirim. Admin akan memverifikasi dalam 1x24 jam.');
      goto('/dashboard');
    }, 500);
  }

  function handleCancel() {
    goto('/dashboard');
  }
</script>

{#if userData}
  <div class="pembetulan-container">
    <div class="pembetulan-card">
      <header class="pembetulan-header">
        <h1>📝 Form Pembetulan Data</h1>
        <p>Isi form di bawah untuk mengajukan pembetulan data</p>
      </header>

      {#if submitted}
        <div class="success-message">
          <div class="success-icon">✅</div>
          <h2>Permohonan Terkirim</h2>
          <p>Permohonan pembetulan data Anda telah dikirim. Admin akan memverifikasi dalam 1x24 jam.</p>
          <button class="btn-primary" on:click={handleCancel}>Kembali ke Dashboard</button>
        </div>
      {:else}
        <div class="current-data">
          <h3>Data Saat Ini</h3>
          <div class="data-display">
            <div class="data-item">
              <span class="label">Nama:</span>
              <span class="value">{userData.name}</span>
            </div>
            <div class="data-item">
              <span class="label">Sekolah:</span>
              <span class="value">{userData.school}</span>
            </div>
            <div class="data-item">
              <span class="label">Tanggal Lahir:</span>
              <span class="value">{userData.birthDate}</span>
            </div>
          </div>
        </div>

        <form on:submit={handleSubmit} class="pembetulan-form">
          <div class="form-group">
            <label for="name">Nama Peserta (Baru)</label>
            <input
              type="text"
              id="name"
              bind:value={formData.name}
              placeholder="Masukkan nama yang benar"
              required
            />
          </div>

          <div class="form-group">
            <label for="school">Sekolah (Baru)</label>
            <input
              type="text"
              id="school"
              bind:value={formData.school}
              placeholder="Masukkan nama sekolah yang benar"
              required
            />
          </div>

          <div class="form-group">
            <label for="birthDate">Tanggal Lahir (Baru)</label>
            <input
              type="date"
              id="birthDate"
              bind:value={formData.birthDate}
              required
            />
          </div>

          <div class="form-note">
            <p><strong>Catatan:</strong> Admin akan memverifikasi pembetulan data Anda dalam 1x24 jam. Data akan diupdate setelah verifikasi selesai.</p>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-secondary" on:click={handleCancel}>
              Batal
            </button>
            <button type="submit" class="btn-primary">
              Kirim Permohonan
            </button>
          </div>
        </form>
      {/if}
    </div>
  </div>
{/if}

<style>
  .pembetulan-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #ffffff 0%, #d1fae5 100%);
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pembetulan-card {
    background: white;
    border-radius: 16px;
    padding: 3rem;
    max-width: 700px;
    width: 100%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .pembetulan-header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid #f0f0f0;
  }

  .pembetulan-header h1 {
    color: #059669;
    margin: 0 0 0.5rem 0;
    font-size: 2rem;
  }

  .pembetulan-header p {
    color: #666;
    margin: 0;
  }

  .current-data {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .current-data h3 {
    color: #333;
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
  }

  .data-display {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .data-item {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem;
    background: white;
    border-radius: 8px;
  }

  .data-item .label {
    color: #666;
    font-weight: 600;
  }

  .data-item .value {
    color: #333;
    font-weight: 600;
  }

  .pembetulan-form {
    margin-top: 2rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    color: #333;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  input {
    width: 100%;
    padding: 0.875rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
    border-color: #10b981;
  }

  .form-note {
    background: #fff3cd;
    border: 1px solid #ffc107;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 2rem;
    color: #856404;
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
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
    box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
  }

  .btn-secondary {
    background: #6c757d;
    color: white;
  }

  .btn-secondary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .success-message {
    text-align: center;
    padding: 2rem 0;
  }

  .success-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .success-message h2 {
    color: #059669;
    margin: 0 0 1rem 0;
    font-size: 1.8rem;
  }

  .success-message p {
    color: #666;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .pembetulan-card {
      padding: 2rem;
    }

    .form-actions {
      flex-direction: column;
    }

    button {
      width: 100%;
    }
  }
</style>