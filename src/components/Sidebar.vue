<template>
  <aside class="sidebar">
    <h2>Ekstrakulikuler SMK Tunas Harapan Pati</h2>

    <router-link to="/admin/dashboard">
      <b>Dashboard</b>
    </router-link>

    <router-link to="/admin/ekskul">
      <b>Daftar Ekskul THP</b>
    </router-link>

    <router-link to="/admin/jadwal">
      <b>Jadwal</b>
    </router-link>

    <div class="logout-btn-wrapper">
      <button class="logout-btn" @click="handleLogout">
        <b>Logout</b>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/Auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = async () => {
  if (confirm('Apakah Anda yakin ingin keluar?')) {
    await authStore.logout()
    router.push('/login-admin')
  }
}
</script>

<style scoped>
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
  margin: 15px 0;
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

.logout-btn-wrapper {
  position: absolute;
  bottom: 30px;
  width: calc(100% - 40px);
}

.logout-btn {
  width: 100%;
  padding: 12px;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
  text-align: left;
}

.logout-btn:hover {
  background: #b91c1c;
}
</style>