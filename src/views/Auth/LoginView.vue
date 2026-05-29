<template>
  <div class="auth-container">

    <!-- LEFT SIDE -->
    <div class="left-side">

      <!-- BACKGROUND SLIDER -->
      <div class="bg-slider">

        <div
          v-for="(image, index) in images"
          :key="index"
          class="bg-image"
          :class="{ active: currentImage === index }"
          :style="{ backgroundImage: `url(${image})` }"
        ></div>

      </div>

      <!-- DARK OVERLAY -->
      <div class="overlay"></div>

      <!-- FLOATING EFFECT -->
      <div class="circle one"></div>
      <div class="circle two"></div>
      <div class="circle three"></div>

      <!-- CONTENT -->
      <div class="content">

        <h1 class="title">
          Website Ekstrakurikuler SMK Tunas Harapan Pati
        </h1>

        <p class="desc">
          Temukan ekstrakurikuler terbaik,
          lihat jadwal kegiatan,
          dan daftar secara online dengan mudah.
        </p>

        <!-- FEATURES -->
        <div class="feature-list">

          <div class="feature">
            <span>🏆</span>
            <p>Ekstrakurikuler Terbaik</p>
          </div>

          <div class="feature">
            <span>📅</span>
            <p>Jadwal Lengkap</p>
          </div>

          <div class="feature">
            <span>🎯</span>
            <p>Pendaftaran Secara Online</p>
          </div>

        </div>

      </div>

    </div>

    <!-- RIGHT SIDE -->
    <div class="right-side">

      <div class="card">

        <!-- LOGO -->
        <div class="logo">
          🎓
        </div>

        <!-- TABS -->
        <div class="tabs">

          <button
            :class="{ active: isLogin }"
            @click="isLogin = true"
          >
            Login
          </button>

          <button
            :class="{ active: !isLogin }"
            @click="isLogin = false"
          >
            Register
          </button>

        </div>

        <!-- LOGIN -->
        <div v-if="isLogin">

          <h2>Selamat Datang 👋</h2>

          <p class="subtitle">
            Silahkan login untuk masuk dashboard
          </p>

          <input
            type="email"
            placeholder="Email"
            v-model="loginData.email"
          >

          <!-- PASSWORD -->
          <div class="password-box">

            <input
              :type="showLoginPassword ? 'text' : 'password'"
              placeholder="Password"
              v-model="loginData.password"
            >

            <span
              class="eye"
              @click="showLoginPassword = !showLoginPassword"
            >
              {{ showLoginPassword ? '🙈' : '👁' }}
            </span>

          </div>

          <!-- Extra content like remember me goes here -->

          <!-- EXTRA -->
          <div class="extra">

            <label>
              <input type="checkbox">
              Remember me
            </label>

            <a href="#">
              Lupa Password?
            </a>

          </div>

          <!-- BUTTON -->
          <button class="main-btn" @click="handleLogin" :disabled="loading">
            {{ loading ? 'Loading...' : 'Login' }}
          </button>

        </div>

        <!-- REGISTER -->
        <div v-else>

          <h2>Buat Akun ✨</h2>

          <p class="subtitle">
            Daftar akun baru untuk mengikuti ekstrakurikuler favoritmu
          </p>

          <input
            type="text"
            placeholder="Nama Lengkap"
            v-model="registerData.name"
          >

          <input
            type="email"
            placeholder="Email"
            v-model="registerData.email"
          >

          <!-- PASSWORD -->
          <div class="password-box">

            <input
              :type="showRegisterPassword ? 'text' : 'password'"
              placeholder="Password"
              v-model="registerData.password"
            >

            <span
              class="eye"
              @click="showRegisterPassword = !showRegisterPassword"
            >
              {{ showRegisterPassword ? '🙈' : '👁' }}
            </span>

          </div>

          <!-- Role automatically set to admin for this page -->

          <button class="main-btn" @click="handleRegister" :disabled="loading">
            {{ loading ? 'Loading...' : 'Register' }}
          </button>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/Auth'

const isLogin = ref(true)
const showLoginPassword = ref(false)
const showRegisterPassword = ref(false)
const loading = ref(false)

const authStore = useAuthStore()
const router = useRouter()

const loginData = ref({
  email: '',
  password: ''
})

const registerData = ref({
  name: '',
  email: '',
  password: '',
  role: 'admin'
})

const handleLogin = async () => {
  if (!loginData.value.email || !loginData.value.password) return alert('Email dan password wajib diisi')
  loading.value = true
  try {
    await authStore.login(loginData.value)
    alert('Login berhasil!')
    if (authStore.role && authStore.role.toLowerCase() === 'admin') {
      router.push('/admin/dashboard')
    } else {
      alert('Akun ini bukan admin!')
      authStore.logout()
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Login gagal')
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
  if (!registerData.value.name || !registerData.value.email || !registerData.value.password) return alert('Semua form wajib diisi')
  loading.value = true
  try {
    await authStore.register(registerData.value)
    alert('Register Admin berhasil! Anda otomatis login.')
    router.push('/admin/dashboard')
  } catch (err) {
    alert('Register gagal. Cek kembali data Anda.')
  } finally {
    loading.value = false
  }
}

/* BACKGROUND IMAGES */

const images = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200',

  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200',

  'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200',

  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200'
]

const currentImage = ref(0)

onMounted(() => {

  setInterval(() => {

    currentImage.value++

    if(currentImage.value >= images.length){
      currentImage.value = 0
    }

  }, 5000)

})
</script>

<style scoped>

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.auth-container{
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
}

/* LEFT SIDE */

.left-side{
  width: 50%;
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;

  padding: 60px;
  color: white;
}

/* BACKGROUND SLIDER */

.bg-slider{
  position: absolute;
  inset: 0;
}

.bg-image{
  position: absolute;
  inset: 0;

  background-size: cover;
  background-position: center;

  opacity: 0;

  transform: scale(1);

  transition:
    opacity 1.5s ease,
    transform 6s ease;
}

/* ACTIVE IMAGE */

.bg-image.active{
  opacity: 1;
  transform: scale(1.08);
}

/* OVERLAY */

.overlay{
  position: absolute;
  inset: 0;

  background:
  linear-gradient(
    rgba(30,58,138,.7),
    rgba(249,115,22,.7)
  );

  z-index: 1;
}

/* FLOATING EFFECT */

.circle{
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,.12);
  backdrop-filter: blur(10px);

  animation: float 6s infinite ease-in-out;

  z-index: 2;
}

.one{
  width: 150px;
  height: 150px;
  top: 10%;
  right: 10%;
}

.two{
  width: 90px;
  height: 90px;
  bottom: 15%;
  left: 10%;
  animation-delay: 2s;
}

.three{
  width: 60px;
  height: 60px;
  top: 50%;
  right: 30%;
  animation-delay: 4s;
}

/* CONTENT */

.content{
  position: relative;
  z-index: 3;
}

.title{
  font-size: 52px;
  line-height: 1.2;
  margin-bottom: 20px;
}

.desc{
  max-width: 500px;
  line-height: 1.8;
  font-size: 17px;
}

/* FEATURES */

.feature-list{
  margin-top: 40px;
  display: flex;
  gap: 20px;
}

.feature{
  width: 130px;

  padding: 20px;
  border-radius: 20px;

  background: rgba(255,255,255,.15);
  backdrop-filter: blur(12px);

  text-align: center;

  transition: .3s;
}

.feature:hover{
  transform: translateY(-8px);
}

.feature span{
  font-size: 30px;
}

.feature p{
  margin-top: 10px;
  font-size: 14px;
}

/* RIGHT SIDE */

.right-side{
  width: 50%;
  background: #f8fafc;

  display: flex;
  justify-content: center;
  align-items: center;
}

/* CARD */

.card{
  width: 430px;

  background: rgba(255,255,255,.8);

  backdrop-filter: blur(20px);

  padding: 40px;
  border-radius: 30px;

  box-shadow: 0 10px 40px rgba(0,0,0,.1);
}

/* LOGO */

.logo{
  width: 70px;
  height: 70px;

  margin: auto;
  margin-bottom: 25px;

  border-radius: 20px;

  background: linear-gradient(135deg,#1E3A8A,#F97316);

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  font-size: 32px;
}

/* TABS */

.tabs{
  display: flex;
  background: #f1f5f9;

  padding: 5px;
  border-radius: 14px;

  margin-bottom: 30px;
}

.tabs button{
  flex: 1;
  padding: 13px;

  border: none;
  background: transparent;

  border-radius: 10px;
  cursor: pointer;

  font-weight: 600;
  transition: .3s;
}

.tabs .active{
  background: linear-gradient(135deg,#1E3A8A,#F97316);
  color: white;
}

/* TEXT */

h2{
  color: #1e293b;
  margin-bottom: 10px;
}

.subtitle{
  color: #64748b;
  margin-bottom: 25px;
  font-size: 14px;
}

/* INPUT */

input,
select{
  width: 100%;
  padding: 14px;

  margin-top: 15px;

  border-radius: 14px;
  border: 1px solid #e2e8f0;

  outline: none;
  transition: .3s;
}

input:focus,
select:focus{
  border-color: #1E3A8A;
  box-shadow: 0 0 0 4px rgba(30,58,138,.1);
}

/* PASSWORD */

.password-box{
  position: relative;
}

.password-box input{
  padding-right: 50px;
}

.eye{
  position: absolute;
  right: 18px;
  top: 58%;

  transform: translateY(-50%);
  cursor: pointer;
  font-size: 18px;
}

/* EXTRA */

.extra{
  margin-top: 18px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 14px;
}

.extra label{
  display: flex;
  align-items: center;
  gap: 5px;
}

.extra input{
  width: auto;
  margin: 0;
}

.extra a{
  text-decoration: none;
  color: #F97316;
}

/* BUTTON */

.main-btn{
  width: 100%;
  padding: 14px;

  margin-top: 25px;

  border: none;
  border-radius: 14px;

  background: linear-gradient(135deg,#1E3A8A,#F97316);

  color: white;
  font-size: 15px;
  font-weight: bold;

  cursor: pointer;
  transition: .3s;
}

.main-btn:hover{
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(249,115,22,.3);
}

/* FLOAT ANIMATION */

@keyframes float{

  0%{
    transform: translateY(0px);
  }

  50%{
    transform: translateY(-20px);
  }

  100%{
    transform: translateY(0px);
  }

}

/* RESPONSIVE */

@media(max-width: 900px){

  .left-side{
    display: none;
  }

  .right-side{
    width: 100%;
    padding: 20px;
  }

  .card{
    width: 100%;
    max-width: 400px;
  }

}

</style>