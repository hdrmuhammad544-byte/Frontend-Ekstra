<template>
  <div class="card">

    <div class="icon">
      ⚽
    </div>

    <h2>{{ title }}</h2>

    <p>{{ desc }}</p>

    <button>Lihat Detail</button>

  </div>
</template>

<script setup>
defineProps({
  title: String,
  desc: String
})
</script>

<style scoped>
.card {
  background: white;
  padding: 25px;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,.1);
  transition: .3s;
}

.card:hover {
  transform: translateY(-5px);
}

.icon {
  font-size: 50px;
}

h2 {
  margin-top: 15px;
  color: #1E3A8A;
}

p {
  margin-top: 10px;
  color: gray;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  background: #F97316;
  color: white;
  border-radius: 10px;
  cursor: pointer;
}
</style>