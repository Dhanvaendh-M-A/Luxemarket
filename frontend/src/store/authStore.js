import { create } from 'zustand'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  checkAuth: async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      set({ isAuthenticated: false, user: null })
      return
    }

    try {
      const response = await axiosInstance.get('/auth/me')
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false
      })
    } catch (error) {
      localStorage.removeItem('token')
      set({ user: null, isAuthenticated: false })
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axiosInstance.post('/auth/login', { email, password })
      localStorage.setItem('token', response.data.token)
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false
      })
      return { success: true }
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Login failed',
        isLoading: false
      })
      return { success: false, error: error.response?.data?.message }
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axiosInstance.post('/auth/register', { name, email, password })
      localStorage.setItem('token', response.data.token)
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false
      })
      return { success: true }
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Registration failed',
        isLoading: false
      })
      return { success: false, error: error.response?.data?.message }
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, isAuthenticated: false, error: null })
  },

  updateProfile: async (data) => {
    try {
      const response = await axiosInstance.put('/auth/profile', data)
      set({ user: response.data.user })
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message }
    }
  },

  clearError: () => set({ error: null })
}))

export default axiosInstance
