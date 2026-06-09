import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export default function ProductCard({ product, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart } = useCartStore()
  const { isAuthenticated } = useAuthStore()

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to cart')
      return
    }
    const result = await addToCart(product._id)
    if (result.success) {
      toast.success('Added to cart!')
    } else {
      toast.error(result.error || 'Failed to add to cart')
    }
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) {
      toast.error('Please sign in to add to wishlist')
      return
    }
    setIsWishlisted(!isWishlisted)
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600 transition-all duration-500 card-hover">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.6 }}
            />

            {/* Overlay Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/30 flex items-center justify-center gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                className="p-3 bg-white rounded-full shadow-lg hover:bg-accent-500 hover:text-white transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWishlist}
                className={`p-3 rounded-full shadow-lg transition-colors ${
                  isWishlisted ? 'bg-red-500 text-white' : 'bg-white hover:bg-red-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white rounded-full shadow-lg hover:bg-primary-500 hover:text-white transition-colors"
              >
                <Eye className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.featured && (
                <span className="px-3 py-1 bg-gradient-to-r from-accent-500 to-primary-500 text-white text-xs font-semibold rounded-full">
                  Featured
                </span>
              )}
              {product.stock < 10 && (
                <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                  Low Stock
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviews})</span>
            </div>

            <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-accent-500 transition-colors">
              {product.name}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </span>
                {product.comparePrice > 0 && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product.comparePrice.toFixed(2)}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-400 px-2 py-1 bg-gray-100 dark:bg-dark-700 rounded-full">
                {product.category}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
