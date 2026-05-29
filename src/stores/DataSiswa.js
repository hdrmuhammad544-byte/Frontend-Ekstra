import { defineStore } from 'pinia'
import api from '../plugins/axios'

export const useDataSiswaStore = defineStore('dataSiswa', {
  state: () => ({
    dataSiswas: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchDataSiswas(silent = false) {
      if (!silent) this.loading = true
      this.error = null
      try {
        const response = await api.get('/data-siswa')
        this.dataSiswas = response.data.data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
      } finally {
        if (!silent) this.loading = false
      }
    },

    async registerEkskul(data) {
      this.loading = true
      this.error = null
      try {
        const response = await api.post('/data-siswa', data)
        this.dataSiswas.push(response.data.data)
        return response.data
      } catch (err) {
        this.error = err.response?.data || err
        throw err.response?.data || err
      } finally {
        this.loading = false
      }
    },

    async deleteDataSiswa(id) {
      try {
        await api.delete(`/data-siswa/${id}`)
        this.dataSiswas = this.dataSiswas.filter(p => p.id !== id)
      } catch (err) {
        throw err.response?.data || err
      }
    },

    async updateStatus(id, status) {
      try {
        const response = await api.patch(`/data-siswa/${id}/status`, { status })
        const index = this.dataSiswas.findIndex(p => p.id === id)
        if (index !== -1) {
          this.dataSiswas[index] = response.data.data
        }
        return response.data
      } catch (err) {
        throw err.response?.data || err
      }
    }
  }
})
