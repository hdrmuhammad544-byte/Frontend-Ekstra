<template>
  <div class="table-wrapper">
    <table class="modern-table">
      <thead>
        <tr>
          <th>Ekskul</th>
          <th>Hari</th>
          <th>Jam</th>
          <th>Pembina</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in jadwals" :key="index" class="table-row">
          <td class="ekskul-name">
            <span class="icon">{{ item.icon }}</span>
            {{ item.name }}
          </td>
          <td><span class="badge day-badge">{{ item.hari }}</span></td>
          <td><span class="badge time-badge">{{ item.jam }}</span></td>
          <td class="pembina-name">{{ item.pembina }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const jadwals = ref([
  { name: 'Futsal', hari: 'Jumat', jam: '15:00', pembina: 'Pak Budi', icon: '⚽' },
  { name: 'Pramuka', hari: 'Sabtu', jam: '13:00', pembina: 'Bu Rina', icon: '🏕️' },
  { name: 'PMR', hari: 'Kamis', jam: '14:00', pembina: 'Bu Sinta', icon: '🚑' },
  { name: 'Basket', hari: 'Rabu', jam: '15:30', pembina: 'Pak Andi', icon: '🏀' },
  { name: 'Tari', hari: 'Selasa', jam: '14:00', pembina: 'Bu Sari', icon: '💃' },
])
</script>

<style scoped>
.table-wrapper {
  width: 100%;
  margin-top: 25px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(16px);
  border-radius: 24px;
  padding: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.8);
  overflow-x: auto;
}

.modern-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  text-align: left;
}

th {
  padding: 15px 20px;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 1px;
  border-bottom: 2px solid #e2e8f0;
}

td {
  padding: 20px;
  background: white;
  vertical-align: middle;
}

/* Rounded corners for each row */
td:first-child {
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
}
td:last-child {
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}

.table-row {
  box-shadow: 0 4px 10px rgba(0,0,0,0.02);
  transition: all 0.3s ease;
}

.table-row:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(30,58,138,0.08);
}

.ekskul-name {
  font-weight: 700;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
}

.icon {
  font-size: 24px;
  background: #f1f5f9;
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
}

.badge {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.day-badge {
  background: rgba(249,115,22,0.1);
  color: #F97316;
}

.time-badge {
  background: rgba(30,58,138,0.1);
  color: #1E3A8A;
}

.pembina-name {
  color: #475569;
  font-weight: 500;
}
</style>