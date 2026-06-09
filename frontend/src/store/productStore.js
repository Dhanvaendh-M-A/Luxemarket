import { create } from 'zustand'
import axiosInstance from './authStore'

export const useProductStore = create((set, get) => ({
  products: [],
  featuredProducts: [],
  categories: [],
  currentProduct: null,
  isLoading: false,
  error: null,
  pagination: { page: 1, pages: 1, total: 0, limit: 12 },
  filters: {
    category: 'all',
    search: '',
    minPrice: '',
    maxPrice: '',
    sort: 'newest'
  },

  setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),

  fetchProducts: async (page = 1) => {
    set({ isLoading: true, error: null })
    try {
      const { category, search, minPrice, maxPrice, sort } = get().filters
      let url = `/products?page=${page}&limit=12`

      if (category && category !== 'all') url += `&category=${category}`
      if (search) url += `&search=${search}`
      if (minPrice) url += `&minPrice=${minPrice}`
      if (maxPrice) url += `&maxPrice=${maxPrice}`
      if (sort) url += `&sort=${sort}`

      const response = await axiosInstance.get(url)
      set({
        products: response.data.products,
        pagination: response.data.pagination,
        isLoading: false
      })
    } catch (error) {
      set({ error: error.response?.data?.message, isLoading: false })
    }
  },

  fetchFeaturedProducts: async () => {
    try {
      const response = await axiosInstance.get('/products?featured=true&limit=8')
      set({ featuredProducts: response.data.products })
    } catch (error) {
      console.error('Error fetching featured products:', error)
    }
  },

  fetchCategories: async () => {
    try {
      const response = await axiosInstance.get('/products/categories')
      set({ categories: response.data.categories })
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  },

  fetchProductById: async (id) => {
    set({ isLoading: true, currentProduct: null })
    try {
      const response = await axiosInstance.get(`/products/${id}`)
      set({ currentProduct: response.data.product, isLoading: false })
    } catch (error) {
      set({ error: error.response?.data?.message, isLoading: false })
    }
  },

  createProduct: async (data) => {
    try {
      const response = await axiosInstance.post('/products', data)
      return { success: true, product: response.data.product }
    } catch (error) {
      return { success: false, error: error.response?.data?.message }
    }
  },

  updateProduct: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/products/${id}`, data)
      return { success: true, product: response.data.product }
    } catch (error) {
      return { success: false, error: error.response?.data?.message }
    }
  },

  deleteProduct: async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message }
    }
  }
}))
