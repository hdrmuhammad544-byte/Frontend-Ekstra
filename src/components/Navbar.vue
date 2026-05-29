<template>
  <nav class="navbar">
    <h1>Dashboard Admin</h1>

    <div class="nav-right">
      <div class="right-menu">
      </div>

      <div class="profile">
        <img src="https://i.pravatar.cc/40" />
        <span>Admin</span>
      </div>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.navbar {
  box-shadow: 0 2px 10px rgba(0,0,0,.1);
  width: auto;
  background: white;
  padding: 20px;
  margin-left: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile img {
  border-radius: 50%;
}
</style>