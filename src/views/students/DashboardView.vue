<template>
  <div class="dashboard">

    <!-- HERO SECTION -->
    <div class="hero">

      <div class="hero-text">

        <span class="badge">
          Website Ekstrakurikuler
        </span>

        <h1 class="title">
          Halo Siswa 👋
        </h1>

        <p class="subtitle">
          Selamat datang di website ekstrakurikuler
          SMK Tunas Harapan Pati.
          Temukan bakat dan minat terbaikmu disini 🚀
        </p>

        <div class="hero-button">

        <router-link to="/student/ekskul">
            <button class="btn-primary">
            Jelajahi Ekskul
            </button>
        </router-link>

        <router-link to="/student/jadwal">
            <button class="btn-secondary">
            Lihat Jadwal
            </button>
        </router-link>

        </div>

      </div>

      <div class="hero-image">
        <img src="/src/assets/logothp.png" alt="Logo THP">
      </div>

    </div>

    <!-- STATISTICS -->
    <div class="stats">

      <div class="stat-card">
        <h3>30+</h3>
        <p>Total Ekskul</p>
      </div>

      <div class="stat-card">
        <h3>850+</h3>
        <p>Total Siswa</p>
      </div>

      <div class="stat-card">
        <h3>25+</h3>
        <p>Kegiatan Aktif</p>
      </div>

    </div>

    <!-- TITLE -->
    <div class="section-title">
      <h2>Ekstrakurikuler Populer</h2>
      <p>Pilih ekstrakurikuler favoritmu 🔥</p>
    </div>

    <!-- CARD EKSKUL -->
    <div class="cards">

      <!-- FUTSAL -->
      <div class="ekskul-card">

        <div class="icon">
          ⚽
        </div>

        <h2>Futsal</h2>

        <p>
          Mengembangkan kemampuan olahraga,
          teamwork, dan sportivitas.
        </p>

        <div class="schedule">
          Jumat • 15:00 WIB
        </div>

        <router-link to="/student/daftar">
            <button class="btn-primary">
            Gabung Sekarang
            </button>
        </router-link>

      </div>

      <!-- PRAMUKA -->
      <div class="ekskul-card">

        <div class="icon">
          ⛺
        </div>

        <h2>Pramuka</h2>

        <p>
          Membentuk karakter disiplin,
          mandiri, dan kepemimpinan.
        </p>

        <div class="schedule">
          Sabtu • 13:00 WIB
        </div>

        <router-link to="/student/daftar">
            <button class="btn-primary">
            Gabung Sekarang
            </button>
        </router-link>

      </div>

      <!-- PMR -->
      <div class="ekskul-card">

        <div class="icon">
          🩺
        </div>

        <h2>PMR</h2>

        <p>
          Belajar kesehatan dan pertolongan
          pertama dengan menyenangkan.
        </p>

        <div class="schedule">
          Kamis • 14:00 WIB
        </div>

        <router-link to="/student/daftar">
            <button class="btn-primary">
            Gabung Sekarang
            </button>
        </router-link>

      </div>

         <!-- PRAMUKA -->
      <div class="ekskul-card">

        <div class="icon">
          ⛺
        </div>

        <h2>Pramuka</h2>

        <p>
          Membentuk karakter disiplin,
          mandiri, dan kepemimpinan.
        </p>

        <div class="schedule">
          Sabtu • 13:00 WIB
        </div>

        <router-link to="/student/daftar">
            <button class="btn-primary">
            Gabung Sekarang
            </button>
        </router-link>

      </div>

         <!-- PRAMUKA -->
      <div class="ekskul-card">

        <div class="icon">
          ⛺
        </div>

        <h2>Pramuka</h2>

        <p>
          Membentuk karakter disiplin,
          mandiri, dan kepemimpinan.
        </p>

        <div class="schedule">
          Sabtu • 13:00 WIB
        </div>

        <router-link to="/student/daftar">
            <button class="btn-primary">
            Gabung Sekarang
            </button>
        </router-link>

      </div>

         <!-- PRAMUKA -->
      <div class="ekskul-card">

        <div class="icon">
          ⛺
        </div>

        <h2>Pramuka</h2>

        <p>
          Membentuk karakter disiplin,
          mandiri, dan kepemimpinan.
        </p>

        <div class="schedule">
          Sabtu • 13:00 WIB
        </div>

        <router-link to="/student/daftar">
            <button class="btn-primary">
            Gabung Sekarang
            </button>
        </router-link>

      </div>

    </div>

  </div>
</template>

<style scoped>

/* DASHBOARD */
.dashboard {
  padding: 35px;
  background: #f8fafc;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
}

/* HERO */
.hero {
  background: linear-gradient(135deg,#1E3A8A,#F97316);
  border-radius: 30px;
  padding: 60px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  position: relative;
  box-shadow: 0 15px 40px rgba(0,0,0,.15);
}

/* BADGE */
.badge {
  background: rgba(255,255,255,.2);
  padding: 10px 18px;
  border-radius: 30px;
  font-size: 14px;
  backdrop-filter: blur(10px);
}

/* TITLE */
.title {
  font-size: 65px;
  font-weight: 700;
  margin-top: 20px;
  line-height: 1.1;
}

/* SUBTITLE */
.subtitle {
  margin-top: 20px;
  font-size: 20px;
  width: 600px;
  line-height: 1.8;
  opacity: .9;
}

/* BUTTON */
.hero-button {
  display: flex;
  gap: 15px;
  margin-top: 35px;
}

.btn-primary {
  background: white;
  color: #1E3A8A;
  border: none;
  padding: 15px 28px;
  border-radius: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: .3s;
}

.btn-primary:hover {
  transform: translateY(-3px);
}

.btn-secondary {
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 15px 28px;
  border-radius: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: .3s;
}

.btn-secondary:hover {
  background: white;
  color: #1E3A8A;
}

/* IMAGE */
.hero-image img {
  width: 260px;
  animation: float 3s ease-in-out infinite;
}

/* FLOAT ANIMATION */
@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-15px);
  }

  100% {
    transform: translateY(0px);
  }
}

/* STATS */
.stats {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 20px;
  margin-top: 30px;
}

.stat-card {
  background: white;
  padding: 30px;
  border-radius: 25px;
  box-shadow: 0 10px 25px rgba(0,0,0,.08);
  transition: .6s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-card h3 {
  color: #1E3A8A;
  font-size: 38px;
}

.stat-card p {
  margin-top: 10px;
  color: gray;
}

/* SECTION TITLE */
.section-title {
  margin-top: 50px;
}

.section-title h2 {
  font-size: 35px;
  color: #0f172a;
}

.section-title p {
  margin-top: 8px;
  color: gray;
}

/* CARDS */
.cards {
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 25px;
}

/* EKSKUL CARD */
.ekskul-card {
  background: white;
  padding: 30px;
  border-radius: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,.08);
  transition: .4s;
  position: relative;
  overflow: hidden;
}

.ekskul-card::before {
  content: '';
  width: 100%;
  height: 6px;
  background: linear-gradient(135deg,#1E3A8A,#F97316);
  position: absolute;
  top: 0;
  left: 0;
}

.ekskul-card:hover {
  transform: translateY(-8px);
}

/* ICON */
.icon {
  font-size: 60px;
}

/* TITLE */
.ekskul-card h2 {
  margin-top: 20px;
  color: #1E3A8A;
  font-size: 28px;
}

/* DESC */
.ekskul-card p {
  margin-top: 15px;
  color: gray;
  line-height: 1.8;
}

/* SCHEDULE */
.schedule {
  margin-top: 20px;
  background: #eff6ff;
  color: #1E3A8A;
  padding: 12px;
  border-radius: 12px;
  font-weight: 600;
}

/* BUTTON */
.ekskul-card button {
  width: 100%;
  margin-top: 25px;
  padding: 15px;
  border: none;
  background: linear-gradient(135deg,#1E3A8A,#F97316);
  color: white;
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: .3s;
}

.ekskul-card button:hover {
  transform: scale(1.03);
}

/* RESPONSIVE */
@media(max-width: 1000px){

  .hero {
    flex-direction: column;
    text-align: center;
  }

  .subtitle {
    width: 100%;
  }

  .hero-image img {
    margin-top: 40px;
    width: 220px;
  }

  .cards,
  .stats {
    grid-template-columns: 1fr;
  }

}

@media(max-width: 768px){

  .dashboard {
    padding: 20px;
  }

  .hero {
    padding: 40px 25px;
  }

  .title {
    font-size: 45px;
  }

  .subtitle {
    font-size: 17px;
  }

}

</style>