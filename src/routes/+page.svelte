<script>
  // Home page - no imports needed for routing
</script>

<div class="home-container">
  <header class="hero">
    <h1>Try Out & Lomba Online</h1>
    <p class="subtitle">Siapkan diri Anda untuk meraih prestasi terbaik</p>
  </header>

  <section class="content">
    <div class="info-card">
      <h2>Selamat Datang</h2>
      <p>
        Platform Try Out dan Lomba Online untuk siswa sekolah dasar. 
        Uji kemampuan Anda dengan berbagai mata pelajaran dan raih sertifikat.
      </p>
    </div>

    <div class="features">
      <div class="feature-card">
        <div class="icon">📝</div>
        <h3>Soal Beragam</h3>
        <p>Berbagai mata pelajaran dari kelas 4-6</p>
      </div>
      <div class="feature-card">
        <div class="icon">⏱️</div>
        <h3>Timer Real-time</h3>
        <p>Pantau waktu pengerjaan secara langsung</p>
      </div>
      <div class="feature-card">
        <div class="icon">📜</div>
        <h3>Sertifikat Digital</h3>
        <p>Dapatkan sertifikat setelah menyelesaikan ujian</p>
      </div>
    </div>

    <div class="action-section">
      <a href="/login"  class="btn-primary btn-large">
        Login Peserta
      </a>
      <p class="info-text">Informasi Penyelenggara</p>
      <p class="organizer">Lembaga Literasi Sembilan Mutiara</p>
    </div>
  </section>
</div>

<style>
  .home-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #ffffff 0%, #d1fae5 100%);
    padding: 2rem;
  }

  .hero {
    text-align: center;
    color: #059669;
    padding: 3rem 0;
    margin-bottom: 2rem;
  }

  .hero h1 {
    font-size: 3rem;
    margin: 0 0 1rem 0;
    color: #047857;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.3rem;
    color: #065f46;
    margin: 0;
  }

  .content {
    max-width: 900px;
    margin: 0 auto;
  }

  .info-card {
    background: white;
    border-radius: 16px;
    padding: 2.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .info-card h2 {
    color: #059669;
    margin-top: 0;
    font-size: 2rem;
  }

  .info-card p {
    color: #555;
    font-size: 1.1rem;
    line-height: 1.8;
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .feature-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .feature-card h3 {
    color: #059669;
    margin: 0 0 0.5rem 0;
    font-size: 1.3rem;
  }

  .feature-card p {
    color: #666;
    margin: 0;
    font-size: 0.95rem;
  }

  .action-section {
    text-align: center;
    background: white;
    border-radius: 16px;
    padding: 3rem;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .btn-primary {
    display: inline-block;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 1rem 3rem;
    border-radius: 12px;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 600;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s, box-shadow 0.2s;
    border: none;
    cursor: pointer;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  .btn-large {
    font-size: 1.3rem;
    padding: 1.2rem 4rem;
  }

  .info-text {
    margin-top: 2rem;
    color: #888;
    font-size: 0.9rem;
  }

  .organizer {
    color: #059669;
    font-weight: 600;
    font-size: 1.1rem;
    margin: 0.5rem 0 0 0;
  }

  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1rem;
    }

    .features {
      grid-template-columns: 1fr;
    }
  }
</style>