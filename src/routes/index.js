import { createRouter, createWebHistory } from 'vue-router'

// ================= AUTH =================
import LoginView from '../views/Auth/LoginView.vue'

// ================= ADMIN =================
import AdminDashboard from '../views/Admin/DashboardView.vue'
import AdminEkskul from '../views/Admin/EkskulView.vue'
import AdminJadwal from '../views/Admin/JadwalView.vue'

// ================= STUDENT =================
import StudentDashboard from '../views/students/DashboardView.vue'
import StudentDaftar from '../views/students/DaftarEkskulView.vue'
import StudentJadwal from '../views/students/JadwalView.vue'
import StudentEkskul from '../views/students/EkskulView.vue'
import StudentProfile from '../views/students/ProfileView.vue'

// ================= LAYOUT =================
import AdminLayout from '../layout/AdminLayout.vue'
import StudentLayout from '../layout/StudentLayout.vue'

// ================= ROUTES =================
const routes = [

  // ROOT -> redirect to student dashboard
  {
    path: '/',
    redirect: '/student/dashboard'
  },

  // LOGIN ADMIN
  {
    path: '/login-admin',
    name: 'login-admin',
    component: LoginView
  },

  // ================= ADMIN =================
  {
    path: '/admin',
    component: AdminLayout,

    children: [

      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: AdminDashboard
      },

      {
        path: 'ekskul',
        name: 'admin-ekskul',
        component: AdminEkskul
      },

      {
        path: 'jadwal',
        name: 'admin-jadwal',
        component: AdminJadwal
      },

    ]
  },

  // ================= STUDENT =================
  {
    path: '/student',
    component: StudentLayout,

    children: [

      {
        path: 'dashboard',
        name: 'student-dashboard',
        component: StudentDashboard
      },

      {
        path: 'daftar',
        name: 'student-daftar',
        component: StudentDaftar
      },

      {
        path: 'ekskul',
        name: 'student-ekskul',
        component: StudentEkskul
      },

      {
        path: 'jadwal',
        name: 'student-jadwal',
        component: StudentJadwal
      },

      {
        path: 'profile',
        name: 'student-profile',
        component: StudentProfile
      }

    ]
  }

]

// ================= ROUTER =================
const router = createRouter({
  history: createWebHistory(),

  routes,

  // ================= SMOOTH SCROLL =================
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth'
    }
  }
})

export default router