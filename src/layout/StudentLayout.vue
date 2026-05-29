<template>
  <div class="layout">

    <!-- Sidebar -->
    <aside class="sidebar">

      <h2>Ekstrakulikuler SMK Tunas Harapan Pati</h2>

      <router-link to="/student/dashboard">
        <b>Dashboard</b>
      </router-link>

      <router-link to="/student/ekskul">
        <b>Daftar Ekskul THP</b>
      </router-link>

      <router-link to="/student/daftar">
        <b>Pendaftaran Ekskul</b>
      </router-link>

      <router-link to="/student/jadwal">
        <b>Jadwal</b>
      </router-link>

    </aside>

    <!-- Content -->
    <div class="content">

      <!-- Navbar -->
      <nav class="navbar">
        <h1>Dashboard Siswa</h1>
      </nav>



      <main>

        <!-- TRANSITION PAGE -->
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>

      </main>

    </div>

  </div>
</template>

<style scoped>

.layout {
  display: flex;
}

/* SIDEBAR */
.sidebar {
  width: 250px;
  height: 100vh;
  background: #1E3A8A;
  padding: 20px;
  position: fixed;
}

.sidebar h2 {
  color: white;
  margin-bottom: 30px;
  font-size: 22px;
  line-height: 1.5;
}

.sidebar a {
  display: block;
  color: white;
  text-decoration: none;
  margin: 10px 0;
  padding: 12px;
  border-radius: 10px;
  transition: .3s;
}

.sidebar a:hover {
  background: #F97316;
}

/* ACTIVE MENU */
.router-link-active {
  background: #F97316;
}

/* CONTENT */
.content {
  margin-left: 250px;
  width: 100%;
  min-height: 100vh;
  background: #f8fafc;
}

/* NAVBAR */
.navbar {
  background: white;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

/* MAIN */
main {
  padding: 30px;
  overflow: hidden;
}

/* ================= TRANSITION ================= */

.page-enter-active,
.page-leave-active {
  transition: all .45s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.page-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.page-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

</style>