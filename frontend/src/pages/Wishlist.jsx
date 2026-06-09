import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Trash2 } from 'lucide-react'
import axiosInstance from '../store/authStore'
import { useCartStore } from '../store/cartStore'
import toast from 'react-hot-toast'

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { addToCart } = useCartStore()

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    try {
      const response = await axiosInstance.get('/users/wishlist')
      setWishlist(response.data.wishlist)
    } catch (error) {
      console.error('Error fetching wishlist:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeFromWishlist = async (productId) => {
    try {
      await axiosInstance.delete(`/users/wishlist/${productId}`)
      setWishlist(wishlist.filter(item => item._id !== productId))
      toast.success('Removed from wishlist')
    } catch (error) {
      toast.error('Failed to remove from wishlist')
    }
  }

  const handleAddToCart = async (productId) => {
    const result = await addToCart(productId)
    if (result.success) {
      toast.success('Added to cart!')
    } else {
      toast.error(result.error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Save items you love for later</p>
          <Link to="/products" className="btn-primary">Explore Products</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-8"
        >
          My Wishlist ({wishlist.length})
        </motion.h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <Link to={`/product/${product._id}`}>
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleAddToCart(product._id)
                        }}
                        className="p-3 bg-white rounded-full shadow-lg hover:bg-accent-500 hover:text-white transition-colors"
                      >
                        <ShoppingBag className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          removeFromWishlist(product._id)
                        }}
                        className="p-3 bg-white rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                    <p className="font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
