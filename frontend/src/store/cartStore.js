import { create } from 'zustand'
import axiosInstance from './authStore'

export const useCartStore = create((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: false,

  fetchCart: async () => {
    try {
      const response = await axiosInstance.get('/cart')
      const { items, totalItems, totalPrice } = response.data.cart
      set({ items, totalItems, totalPrice })
    } catch (error) {
      console.error('Error fetching cart:', error)
    }
  },

  addToCart: async (productId, quantity = 1) => {
    set({ isLoading: true })
    try {
      const response = await axiosInstance.post('/cart', { productId, quantity })
      const { items, totalItems, totalPrice } = response.data.cart
      set({ items, totalItems, totalPrice, isLoading: false })
      return { success: true }
    } catch (error) {
      set({ isLoading: false })
      return { success: false, error: error.response?.data?.message }
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      const response = await axiosInstance.put(`/cart/${productId}`, { quantity })
      const { items, totalItems, totalPrice } = response.data.cart
      set({ items, totalItems, totalPrice })
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message }
    }
  },

  removeFromCart: async (productId) => {
    try {
      const response = await axiosInstance.delete(`/cart/${productId}`)
      const { items, totalItems, totalPrice } = response.data.cart
      set({ items, totalItems, totalPrice })
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message }
    }
  },

  clearCart: async () => {
    try {
      await axiosInstance.delete('/cart')
      set({ items: [], totalItems: 0, totalPrice: 0 })
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message }
    }
  },

  getItemQuantity: (productId) => {
    const item = get().items.find(item => item.product._id === productId)
    return item ? item.quantity : 0
  }
}))
