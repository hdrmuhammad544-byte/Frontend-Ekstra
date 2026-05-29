<template>

  <!-- SIDEBAR -->
  <Sidebar />

  <!-- MAIN -->
  <div class="main">

    <!-- NAVBAR -->
    <Navbar />

    <!-- CONTENT -->
    <main>

      <!-- TRANSITION PAGE -->
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>

    </main>

  </div>

</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
</script>

<style scoped>

/* MAIN */
.main {
  margin-left: 250px;
  min-height: 100vh;
  background: #f8fafc;
}

/* CONTENT */
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