import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Edit2, Trash2, X, ImagePlus, Check } from 'lucide-react'
import { useProductStore } from '../store/productStore'
import toast from 'react-hot-toast'

export default function AdminProducts() {
  const { products, categories, pagination, isLoading, fetchProducts, fetchCategories, createProduct, updateProduct, deleteProduct } = useProductStore()
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    comparePrice: '',
    category: '',
    image: '',
    stock: '',
    featured: false,
    tags: ''
  })

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      ...formData,
      price: Number(formData.price),
      comparePrice: Number(formData.comparePrice) || 0,
      stock: Number(formData.stock),
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    }

    if (editingProduct) {
      const result = await updateProduct(editingProduct._id, data)
      if (result.success) {
        toast.success('Product updated!')
        setShowModal(false)
        setEditingProduct(null)
      } else {
        toast.error(result.error)
      }
    } else {
      const result = await createProduct(data)
      if (result.success) {
        toast.success('Product created!')
        setShowModal(false)
      } else {
        toast.error(result.error)
      }
    }
    resetForm()
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      comparePrice: product.comparePrice || '',
      category: product.category,
      image: product.image,
      stock: product.stock,
      featured: product.featured,
      tags: product.tags?.join(', ') || ''
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    const result = await deleteProduct(id)
    if (result.success) {
      toast.success('Product deleted!')
    } else {
      toast.error(result.error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '', description: '', price: '', comparePrice: '',
      category: '', image: '', stock: '', featured: false, tags: ''
    })
    setEditingProduct(null)
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
            <p className="text-gray-500">Manage your product catalog</p>
          </motion.div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-dark-700 border-none text-sm focus:ring-2 focus:ring-accent-500"
              />
            </div>
            <button
              onClick={() => { resetForm(); setShowModal(true) }}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-dark-600">
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Product</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Category</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Price</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Stock</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <motion.tr
                    key={product._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-50 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                          {product.featured && (
                            <span className="text-xs text-accent-500">Featured</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${product.stock < 10 ? 'text-red-500' : 'text-green-500'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.isActive
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/20'
                          : 'bg-red-100 text-red-600 dark:bg-red-900/20'
                      }`}>
                        {product.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 text-gray-500 hover:text-accent-500 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(pagination.pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => fetchProducts(i + 1)}
                className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                  pagination.page === i + 1
                    ? 'bg-accent-500 text-white'
                    : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600 shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none"
                    />
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none resize-none"
                  />

                  <div className="grid sm:grid-cols-3 gap-4">
                    <input
                      type="number"
                      placeholder="Price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Compare Price"
                      value={formData.comparePrice}
                      onChange={(e) => setFormData({ ...formData, comparePrice: e.target.value })}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Stock"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      required
                      min="0"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none"
                    />
                  </div>

                  <div className="relative">
                    <ImagePlus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      placeholder="Image URL"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none"
                  />

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-accent-500 focus:ring-accent-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Featured Product</span>
                  </label>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 btn-secondary"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="flex-1 btn-primary flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      {editingProduct ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
