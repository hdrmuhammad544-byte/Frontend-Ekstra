import { defineStore } from 'pinia'
import api from '../plugins/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isLogin: !!localStorage.getItem('token'),
  }),
  getters: {
    role: (state) => state.user?.role || null
  },
  actions: {
    async login(credentials) {
      const response = await api.post('/login', credentials)
      
      const { access_token, data } = response.data
      
      this.token = access_token
      this.user = data
      this.isLogin = true
      
      localStorage.setItem('token', access_token)
      localStorage.setItem('user', JSON.stringify(data))
      
      return response.data
    },

    async register(userData) {
      const response = await api.post('/register', userData)
      
      const { access_token, data } = response.data
      
      this.token = access_token
      this.user = data
      this.isLogin = true
      
      localStorage.setItem('token', access_token)
      localStorage.setItem('user', JSON.stringify(data))
      
      return response.data
    },

    async logout() {
      try {
        await api.post('/logout')
      } catch (error) {
        console.error('Logout failed on server', error)
      } finally {
        this.user = null
        this.token = null
        this.isLogin = false
        
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
  }
})