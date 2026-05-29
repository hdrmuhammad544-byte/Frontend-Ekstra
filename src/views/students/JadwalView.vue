<template>
  <div class="jadwal-container">
    <div class="header-content">
      <h1>Jadwal Kegiatan</h1>
      <p class="subtitle">Lihat jadwal kegiatan ekstrakurikuler yang akan datang.</p>
    </div>
    
    <TableJadwal />
  </div>
</template>

<script setup>
import TableJadwal from '../../components/TableJadwal.vue'
</script>

<style scoped>
.jadwal-container {
  padding: 10px;
}

.header-content h1 {
  font-size: 28px;
  color: #1e293b;
  margin-bottom: 5px;
}

.subtitle {
  color: #64748b;
  font-size: 15px;
  margin-bottom: 20px;
}
</style>