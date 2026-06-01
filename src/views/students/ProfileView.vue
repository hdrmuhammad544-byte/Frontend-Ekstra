<template>
  <div class="profile-container">
    <div class="header-content">
      <h1>Profil Siswa</h1>
      <p class="subtitle">Lihat dan ubah informasi profilmu di sini.</p>
    </div>

    <!-- IF NOT REGISTERED -->
    <div class="status-wrapper" v-if="!profile">
      <div class="status-card glass-form">
        <div class="icon">⚠️</div>
        <h2>Belum Terdaftar</h2>
        <p>Anda belum mendaftar ekstrakurikuler. Silakan daftar terlebih dahulu untuk melihat profil Anda.</p>
        <router-link to="/student/daftar" style="width: 100%;">
          <button class="submit-btn" style="margin-top: 20px;">Daftar Ekstrakurikuler</button>
        </router-link>
      </div>
    </div>

    <!-- IF REGISTERED -->
    <div class="profile-wrapper" v-else>
      <div class="glass-form">
        
        <!-- PHOTO SECTION -->
        <div class="photo-section">
          <div class="avatar-container">
            <img :src="getFotoUrl(profile.foto)" alt="Foto Profil" class="avatar-img" />
          </div>
          <div class="upload-section">
            <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" class="d-none" id="foto-upload" />
            <label for="foto-upload" class="submit-btn outline upload-btn">
              {{ uploading ? 'Mengunggah...' : 'Ganti Foto Profil' }}
            </label>
          </div>
        </div>

        <div class="divider"></div>

        <!-- INFO SECTION -->
        <div class="info-section">
          
          <div class="info-group">
            <label>Nama Lengkap</label>
            <div class="info-value">{{ profile.nama }}</div>
          </div>
          
          <div class="info-group">
            <label>NIS</label>
            <div class="info-value">{{ profile.nis }}</div>
          </div>

          <div class="info-row">
            <div class="info-group half">
              <label>Kelas</label>
              <div class="info-value">{{ profile.kelas }}</div>
            </div>
            <div class="info-group half">
              <label>Jurusan</label>
              <div class="info-value">{{ profile.jurusan }}</div>
            </div>
          </div>

          <div class="info-group">
            <label>Nomor Telepon</label>
            <div class="info-value">{{ profile.nomor_telpon }}</div>
          </div>

          <div class="info-group">
            <label>Ekstrakurikuler yang Diikuti</label>
            <div class="info-value ekskul-badge">
              {{ profile.ekskul ? profile.ekskul.nama : 'Tidak diketahui' }}
            </div>
          </div>

          <div class="info-group">
            <label>Status Pendaftaran</label>
            <div class="info-value">
              <span :class="['status-badge', profile.status]">
                {{ getStatusText(profile.status) }}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../../plugins/axios'

const profile = ref(null)
const fileInput = ref(null)
const uploading = ref(false)

onMounted(async () => {
  await fetchProfile()
})

const fetchProfile = async () => {
  const registeredId = localStorage.getItem('registered_siswa_id')
  if (registeredId) {
    try {
      const response = await api.get(`/data-siswa/${registeredId}`)
      if (response.data.success) {
        profile.value = response.data.data
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        localStorage.removeItem('registered_siswa_id')
        profile.value = null
      }
    }
  }
}

const getFotoUrl = (foto) => {
  if (foto) {
    return `http://localhost:8000/storage/foto_siswa/${foto}`
  }
  // Default avatar if no photo
  return 'https://ui-avatars.com/api/?name=' + (profile.value?.nama || 'Siswa') + '&background=random&size=150'
}

const getStatusText = (status) => {
  if (status === 'pending') return 'Menunggu Seleksi'
  if (status === 'accepted') return 'Diterima'
  if (status === 'rejected') return 'Ditolak'
  return status
}

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const registeredId = localStorage.getItem('registered_siswa_id')
  if (!registeredId) return

  const formData = new FormData()
  formData.append('foto', file)
  
  uploading.value = true
  try {
    const response = await api.post(`/data-siswa/${registeredId}/update-profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    if (response.data.success) {
      profile.value = response.data.data
      alert('Foto profil berhasil diperbarui!')
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Gagal mengunggah foto profil.')
  } finally {
    uploading.value = false
    // reset file input
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}

</script>

<style scoped>
.profile-container {
  padding: 10px;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
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

.profile-wrapper, .status-wrapper {
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

.photo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
}

.avatar-container {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  border: 4px solid white;
  margin-bottom: 20px;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.d-none {
  display: none;
}

.upload-btn {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 14px;
}

.divider {
  height: 1px;
  background: rgba(0,0,0,0.1);
  margin: 25px 0;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-row {
  display: flex;
  gap: 15px;
}

.info-group {
  background: white;
  padding: 15px 20px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.info-group.half {
  flex: 1;
}

.info-group label {
  display: block;
  font-size: 13px;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 5px;
}

.info-value {
  font-size: 16px;
  color: #1e293b;
  font-weight: 500;
}

.ekskul-badge {
  color: #F97316;
  font-weight: 700;
}

.status-badge {
  display: inline-block;
  padding: 5px 12px;
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

.submit-btn {
  padding: 15px;
  background: linear-gradient(135deg, #1E3A8A, #F97316);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(249, 115, 22, 0.2);
}

.submit-btn.outline {
  background: transparent;
  border: 2px solid #1E3A8A;
  color: #1E3A8A;
}

.submit-btn.outline:hover {
  background: #1E3A8A;
  color: white;
}
</style>
