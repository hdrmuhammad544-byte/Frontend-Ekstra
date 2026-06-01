<template>
  <div class="pendaftaran-container">
    <div class="header-content">
      <h1>Pendaftaran Ekstrakurikuler</h1>
      <p class="subtitle" v-if="!registeredStatus">Isi form di bawah ini untuk mendaftar ekstrakurikuler pilihanmu.</p>
    </div>

    <!-- PENDING UI -->
    <div class="status-wrapper pending" v-if="registeredStatus === 'pending'">
      <div class="status-card glass-form">
        <div class="icon">⏳</div>
        <h2>Sedang Diseleksi</h2>
        <p>Pendaftaran kamu sedang ditinjau oleh Admin. Harap tunggu informasi selanjutnya.</p>
      </div>
    </div>

    <!-- ACCEPTED UI -->
    <div class="status-wrapper accepted" v-else-if="registeredStatus === 'accepted'">
      <div class="status-card glass-form">
        <div class="icon">🎉</div>
        <h2>Siswa Diterima</h2>
        <p>Selamat! Pendaftaran kamu telah diterima. Silakan cek jadwal kegiatan ekstrakurikuler.</p>
        <div class="button-group">
          <router-link to="/student/jadwal" style="width: 100%;">
            <button class="submit-btn" style="margin-top: 20px;">Lihat Jadwal</button>
          </router-link>
          <button class="submit-btn outline" style="margin-top: 10px;" @click="resetRegistration">Kembali Mengisi Form</button>
        </div>
      </div>
    </div>

    <!-- REJECTED UI -->
    <div class="status-wrapper rejected" v-else-if="registeredStatus === 'rejected'">
      <div class="status-card glass-form">
        <div class="icon">❌</div>
        <h2>Coba Lagi</h2>
        <p>Maaf, pendaftaran kamu tidak disetujui saat ini. Kamu bisa mencoba mendaftar ekstrakurikuler yang lain.</p>
        <button class="submit-btn" style="margin-top: 20px;" @click="resetRegistration">Daftar Ekstra Baru</button>
      </div>
    </div>

    <!-- FORM UI -->
    <div class="form-wrapper" v-else>
      <form @submit.prevent="submitForm" class="glass-form">
        <div class="input-group">
          <label>Nama Lengkap</label>
          <input type="text" v-model="formData.nama" placeholder="Masukkan nama lengkap" required />
        </div>

        <div class="input-group">
          <label>NIS (Nomor Induk Siswa)</label>
          <input type="text" v-model="formData.nis" placeholder="Masukkan NIS" required />
        </div>

        <div class="input-group">
          <label>Kelas</label>
          <input type="text" v-model="formData.kelas" placeholder="Contoh: 10 atau 11" required />
        </div>

        <div class="input-group">
          <label>Jurusan</label>
          <input type="text" v-model="formData.jurusan" placeholder="Contoh: RPL" required />
        </div>

        <div class="input-group">
          <label>Nomor Telepon</label>
          <input type="text" v-model="formData.nomor_telpon" placeholder="Contoh: 081234567890" required />
        </div>
        
        <div class="input-group">
          <label>Pilih Ekstrakurikuler</label>
          <select v-model="formData.ekskul_id" required>
            <option value="" disabled>-- Pilih Ekskul --</option>
            <option v-for="ekskul in ekskulStore.ekskuls" :key="ekskul.id" :value="ekskul.id">
              {{ ekskul.nama }}
            </option>
          </select>
        </div>

        <button type="submit" class="submit-btn" :disabled="dataSiswaStore.loading">
          {{ dataSiswaStore.loading ? 'Mendaftar...' : 'Daftar Sekarang' }}
        </button>
      </form>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useEkskulStore } from '../../stores/Ekskul'
import { useDataSiswaStore } from '../../stores/DataSiswa'
import api from '../../plugins/axios'

const ekskulStore = useEkskulStore()
const dataSiswaStore = useDataSiswaStore()

const formData = ref({
  nama: '',
  nis: '',
  kelas: '',
  jurusan: '',
  nomor_telpon: '',
  ekskul_id: ''
})

const registeredStatus = ref(null)

onMounted(async () => {
  ekskulStore.fetchEkskuls()
  await checkRegistrationStatus()
})

const checkRegistrationStatus = async () => {
  const registeredId = localStorage.getItem('registered_siswa_id')
  if (registeredId) {
    try {
      const response = await api.get(`/data-siswa/${registeredId}`)
      if (response.data.success) {
        registeredStatus.value = response.data.data.status
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        localStorage.removeItem('registered_siswa_id')
        registeredStatus.value = null
      }
    }
  }
}

const resetRegistration = () => {
  localStorage.removeItem('registered_siswa_id')
  registeredStatus.value = null
  formData.value = {
    nama: '',
    nis: '',
    kelas: '',
    jurusan: '',
    nomor_telpon: '',
    ekskul_id: ''
  }
}

const submitForm = async () => {
  try {
    const result = await dataSiswaStore.registerEkskul(formData.value)
    if (result.success && result.data && result.data.id) {
      localStorage.setItem('registered_siswa_id', result.data.id)
      registeredStatus.value = result.data.status || 'pending'
    }
  } catch (err) {
    alert(err.message || 'Terjadi kesalahan saat mendaftar.')
  }
}
</script>

<style scoped>
.pendaftaran-container {
  padding: 10px;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header-content {
  text-align: center;
  margin-bottom: 20px;
}

.header-content h1 {
  font-size: 28px;
  color: #1e293b;
  margin-bottom: 5px;
}

.subtitle {
  color: #64748b;
  font-size: 15px;
  margin-bottom: 25px;
}

.form-wrapper, .status-wrapper {
  max-width: 600px;
  width: 100%;
}

.glass-form {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(16px);
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.status-card {
  text-align: center;
  padding: 50px 30px;
}

.status-card .icon {
  font-size: 60px;
  margin-bottom: 20px;
}

.status-card h2 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #1e293b;
}

.status-card p {
  color: #64748b;
  line-height: 1.6;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 8px;
  text-align: left;
}

input, select {
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  background: white;
  font-size: 15px;
  transition: all 0.3s ease;
  outline: none;
}

input:focus, select:focus {
  border-color: #1E3A8A;
  box-shadow: 0 0 0 4px rgba(30,58,138,0.1);
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.submit-btn {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #1E3A8A, #F97316);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(249, 115, 22, 0.2);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.submit-btn.outline {
  background: transparent;
  border: 2px solid #1E3A8A;
  color: #1E3A8A;
}

.submit-btn.outline:hover {
  background: #1E3A8A;
  color: white;
  box-shadow: 0 5px 15px rgba(30, 58, 138, 0.2);
}
</style>