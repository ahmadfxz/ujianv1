<script>
  import { link, push } from 'svelte-spa-router';
  import { user, isLoggedIn } from '../stores.js';
  import { dummyUsers } from '../lib/data.js';

  let username = '';
  let password = '';
  let error = '';
  let loading = false;

  function handleLogin(e) {
    e.preventDefault();
    error = '';
    loading = true;

    // Simulasi delay
    setTimeout(() => {
      const foundUser = dummyUsers.find(
        u => u.username === username && u.password === password
      );

      if (foundUser) {
        user.set(foundUser);
        isLoggedIn.set(true);
        push('/dashboard');
      } else {
        error = 'Username atau password salah!';
        loading = false;
      }
    }, 500);
  }
</script>

<div class="login-container">
  <div class="login-card">
    <div class="login-header">
      <h1>Login Peserta</h1>
      <p>Masuk ke akun Anda untuk mulai ujian</p>
    </div>

    <form on:submit={handleLogin}>
      {#if error}
        <div class="error-message">{error}</div>
      {/if}

      <div class="form-group">
        <label for="username">Username / Nomor Peserta</label>
        <input
          type="text"
          id="username"
          bind:value={username}
          placeholder="Masukkan username"
          required
          disabled={loading}
        />
      </div>

      <div class="form-group">
        <label for="password">Password / Tanggal Lahir</label>
        <input
          type="password"
          id="password"
          bind:value={password}
          placeholder="Masukkan password"
          required
          disabled={loading}
        />
      </div>

      <button type="submit" class="btn-primary btn-block" disabled={loading}>
        {loading ? 'Memproses...' : 'Masuk'}
      </button>
    </form>

    <div class="login-footer">
      <p>Belum punya akun? Hubungi admin</p>
      <a href="/" use:link class="back-link">← Kembali ke Beranda</a>
    </div>

    <div class="demo-info">
      <p><strong>Demo Login:</strong></p>
      <p>Username: peserta001 | Password: 123456</p>
      <p>Username: peserta002 | Password: 123456</p>
    </div>
  </div>
</div>

<style>
  .login-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .login-card {
    background: white;
    border-radius: 16px;
    padding: 3rem;
    max-width: 450px;
    width: 100%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .login-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .login-header h1 {
    color: #667eea;
    margin: 0 0 0.5rem 0;
    font-size: 2rem;
  }

  .login-header p {
    color: #666;
    margin: 0;
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
    border-color: #667eea;
  }

  input:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }

  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 1rem;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    width: 100%;
  }

  .btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-block {
    width: 100%;
  }

  .error-message {
    background: #fee;
    color: #c33;
    padding: 0.875rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    border: 1px solid #fcc;
  }

  .login-footer {
    text-align: center;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #e0e0e0;
  }

  .login-footer p {
    color: #666;
    font-size: 0.9rem;
    margin: 0 0 0.5rem 0;
  }

  .back-link {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
  }

  .back-link:hover {
    text-decoration: underline;
  }

  .demo-info {
    margin-top: 1.5rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
    font-size: 0.85rem;
    color: #555;
  }

  .demo-info p {
    margin: 0.3rem 0;
  }

  .demo-info strong {
    color: #667eea;
  }
</style>