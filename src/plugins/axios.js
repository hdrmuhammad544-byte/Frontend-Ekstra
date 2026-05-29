import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Sesuaikan dengan URL backend Anda
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Jika token expired atau unauthenticated, hapus token tanpa refresh otomatis
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    return Promise.reject(error)
  }
)

export default api
