import { defineStore } from 'pinia'
import api from '../plugins/axios'

export const useEkskulStore = defineStore('ekskul', {
  state: () => ({
    ekskuls: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchEkskuls() {
      this.loading = true
      this.error = null
      try {
        const response = await api.get('/ekskul')
        this.ekskuls = response.data.data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
      } finally {
        this.loading = false
      }
    },

    async addEkskul(data) {
      try {
        const response = await api.post('/ekskul', data)
        this.ekskuls.push(response.data.data)
        return response.data
      } catch (err) {
        throw err.response?.data || err
      }
    },

    async updateEkskul(id, data) {
      try {
        const response = await api.put(`/ekskul/${id}`, data)
        const index = this.ekskuls.findIndex(e => e.id === id)
        if (index !== -1) {
          this.ekskuls[index] = response.data.data
        }
        return response.data
      } catch (err) {
        throw err.response?.data || err
      }
    },

    async deleteEkskul(id) {
      try {
        await api.delete(`/ekskul/${id}`)
        this.ekskuls = this.ekskuls.filter(e => e.id !== id)
      } catch (err) {
        throw err.response?.data || err
      }
    }
  }
})
