<template>
  <div class="dashboard">

    <!-- HERO -->
    <div class="hero">
      <div class="hero-text">
        <span class="badge">
          Dashboard Admin
        </span>
        <h1>
          Selamat Datang Admin 👋
        </h1>
        <p>
          Kelola data pendaftaran siswa, ekstrakurikuler,
          dan jadwal kegiatan SMK Tunas Harapan Pati.
        </p>
      </div>

      <div class="hero-logo">
        <img src="/src/assets/logothp.png" alt="Logo Sekolah">
      </div>
    </div>

    <!-- STATISTICS -->
    <div class="stats">
      <Cardstats
        title="Total Pendaftar"
        :total="dataSiswaStore.dataSiswas.length"
      />
      <Cardstats
        title="Pending"
        :total="dataSiswaStore.dataSiswas.filter(s => s.status === 'pending').length"
      />
      <Cardstats
        title="Diterima"
        :total="dataSiswaStore.dataSiswas.filter(s => s.status === 'accepted').length"
      />
    </div>

    <!-- TITLE -->
    <div class="section-title">
      <div>
        <h2>Seleksi Pendaftaran Ekskul</h2>
        <p>
          Terima atau tolak pendaftaran siswa yang masuk
        </p>
      </div>
    </div>

    <!-- TABLE -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Kelas</th>
            <th>NIS</th>
            <th>Ekskul</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="dataSiswaStore.loading">
            <td colspan="7" style="text-align: center; padding: 20px;">Memuat data...</td>
          </tr>
          <tr v-else-if="dataSiswaStore.dataSiswas.length === 0">
            <td colspan="7" style="text-align: center; padding: 20px;">Belum ada pendaftar.</td>
          </tr>
          <tr
            v-for="(student, index) in dataSiswaStore.dataSiswas"
            :key="student.id"
            v-else
          >
            <td>{{ index + 1 }}</td>
            <td>{{ student.nama }}</td>
            <td>{{ student.kelas }}</td>
            <td>{{ student.nis }}</td>
            <td>{{ student.ekskul?.nama || '-' }}</td>
            <td>
              <span class="status-badge" :class="student.status">
                {{ formatStatus(student.status) }}
              </span>
            </td>
            <td class="action">
              <template v-if="student.status === 'pending'">
                <button
                  class="edit"
                  @click="handleStatus(student.id, 'accepted')"
                >
                  Terima
                </button>
                <button
                  class="delete"
                  @click="handleStatus(student.id, 'rejected')"
                >
                  Tolak
                </button>
              </template>
              <template v-else>
                <span style="color: gray; font-size: 14px;">Selesai</span>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import Cardstats from '../../components/Cardstats.vue'
import { useDataSiswaStore } from '../../stores/DataSiswa'

const dataSiswaStore = useDataSiswaStore()
let pollingInterval = null

onMounted(() => {
  dataSiswaStore.fetchDataSiswas()
  
  // Autoload / auto refresh data every 5 seconds without showing loading indicator
  pollingInterval = setInterval(() => {
    dataSiswaStore.fetchDataSiswas(true)
  }, 5000)
})

onUnmounted(() => {
  if (pollingInterval) clearInterval(pollingInterval)
})

const formatStatus = (status) => {
  if (status === 'accepted') return 'Diterima'
  if (status === 'rejected') return 'Ditolak'
  return 'Pending'
}

const handleStatus = async (id, status) => {
  const confirmMsg = status === 'accepted' ? 'Terima pendaftaran ini?' : 'Tolak pendaftaran ini?'
  if (confirm(confirmMsg)) {
    try {
      await dataSiswaStore.updateStatus(id, status)
      alert('Status berhasil diperbarui!')
    } catch (err) {
      console.error(err)
      alert('Gagal: ' + (err.response?.data?.message || err.message || 'Terjadi kesalahan'))
    }
  }
}
</script>

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
  padding: 50px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 15px 40px rgba(0,0,0,.1);
}

.badge {
  background: rgba(255,255,255,.2);
  padding: 10px 18px;
  border-radius: 30px;
  font-size: 14px;
}

.hero-text h1 {
  font-size: 55px;
  margin-top: 20px;
}

.hero-text p {
  margin-top: 15px;
  width: 600px;
  line-height: 1.8;
  font-size: 18px;
}

.hero-logo img {
  width: 230px;
  animation: floating 3s ease-in-out infinite;
}

@keyframes floating {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

/* STATS */
.stats {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 20px;
}

/* SECTION */
.section-title {
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title h2 {
  font-size: 35px;
  color: #0f172a;
}

.section-title p {
  margin-top: 10px;
  color: gray;
}

/* TABLE */
.table-container {
  margin-top: 25px;
  background: white;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,.08);
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #1E3A8A;
  color: white;
}

th, td {
  padding: 18px;
  text-align: left;
}

tbody tr {
  border-bottom: 1px solid #eee;
}

tbody tr:hover {
  background: #f8fafc;
}

/* ACTION */
.action {
  display: flex;
  gap: 10px;
  align-items: center;
}

.edit {
  background: #16a34a;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
}

.delete {
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
}

/* STATUS BADGE */
.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}
.status-badge.pending {
  background: #fef08a;
  color: #854d0e;
}
.status-badge.accepted {
  background: #bbf7d0;
  color: #166534;
}
.status-badge.rejected {
  background: #fecaca;
  color: #991b1b;
}

/* RESPONSIVE */
@media(max-width: 1000px){
  .hero { flex-direction: column; text-align: center; }
  .hero-text p { width: 100%; }
  .hero-logo img { margin-top: 30px; }
  .stats { grid-template-columns: 1fr; }
}

@media(max-width: 768px){
  .dashboard { padding: 20px; }
  .hero { padding: 35px 25px; }
  .hero-text h1 { font-size: 40px; }
  .section-title { flex-direction: column; align-items: start; gap: 20px; }
  .table-container { overflow-x: auto; }
}
</style>