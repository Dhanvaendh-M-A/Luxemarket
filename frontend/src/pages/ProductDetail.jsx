import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingCart, Heart, Star, Minus, Plus, Truck, Shield, 
  ArrowLeft, Share2, Check, AlertCircle 
} from 'lucide-react'
import { useProductStore } from '../store/productStore'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { currentProduct, isLoading, fetchProductById } = useProductStore()
  const { addToCart } = useCartStore()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    fetchProductById(id)
  }, [id, fetchProductById])

  useEffect(() => {
    setQuantity(1)
    setActiveImage(0)
  }, [id])

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to cart')
      return
    }
    const result = await addToCart(id, quantity)
    if (result.success) {
      toast.success(`Added ${quantity} item(s) to cart!`)
    } else {
      toast.error(result.error || 'Failed to add to cart')
    }
  }

  const handleWishlist = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add to wishlist')
      return
    }
    setIsWishlisted(!isWishlisted)
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!currentProduct) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Product not found</h2>
        </div>
      </div>
    )
  }

  const images = [currentProduct.image, ...(currentProduct.images || [])]

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-accent-500 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to products
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-dark-700 mb-4">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={images[activeImage]}
                alt={currentProduct.name}
                className="w-full h-full object-cover"
              />
              {currentProduct.stock < 10 && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                  Only {currentProduct.stock} left
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                      activeImage === index ? 'border-accent-500' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-accent-500/10 text-accent-600 dark:text-accent-400 text-sm font-medium rounded-full">
                {currentProduct.category}
              </span>
              {currentProduct.featured && (
                <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-sm font-medium rounded-full">
                  Featured
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {currentProduct.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(currentProduct.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                {currentProduct.rating} ({currentProduct.reviews} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ${currentProduct.price.toFixed(2)}
              </span>
              {currentProduct.comparePrice > 0 && (
                <span className="text-xl text-gray-400 line-through">
                  ${currentProduct.comparePrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              {currentProduct.description}
            </p>

            {/* Tags */}
            {currentProduct.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {currentProduct.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-dark-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(currentProduct.stock, quantity + 1))}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-dark-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart - ${(currentProduct.price * quantity).toFixed(2)}
              </button>

              <button
                onClick={handleWishlist}
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isWishlisted
                    ? 'border-red-500 bg-red-50 text-red-500'
                    : 'border-gray-200 dark:border-dark-600 hover:border-accent-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-gray-50 dark:bg-dark-700/50">
              {[
                { icon: Truck, title: 'Free Shipping', desc: 'Orders over $100' },
                { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
                { icon: Check, title: 'Quality Guarantee', desc: '30-day returns' },
              ].map((feature) => (
                <div key={feature.title} className="text-center">
                  <feature.icon className="w-6 h-6 text-accent-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{feature.title}</p>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
