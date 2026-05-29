<template>
  <div class="stat-card">
    <h3>{{ total }}</h3>
    <p>{{ title }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  total: String
})
</script>

<style scoped>
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
</style>