import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight, Package } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export default function Cart() {
  const { items, totalItems, totalPrice, fetchCart, updateQuantity, removeFromCart } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart()
    }
  }, [isAuthenticated, fetchCart])

  const handleQuantityChange = async (productId, newQuantity) => {
    const result = await updateQuantity(productId, newQuantity)
    if (!result.success) {
      toast.error(result.error)
    }
  }

  const handleRemove = async (productId) => {
    const result = await removeFromCart(productId)
    if (result.success) {
      toast.success('Item removed from cart')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Please sign in</h2>
          <p className="text-gray-500 mb-4">Sign in to view your cart</p>
          <Link to="/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some products to get started</p>
          <Link to="/products" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  const shipping = totalPrice > 100 ? 0 : 10
  const tax = Number((totalPrice * 0.08).toFixed(2))
  const finalTotal = Number((totalPrice + shipping + tax).toFixed(2))

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-8"
        >
          Shopping Cart ({totalItems} items)
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.product._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600"
                >
                  <Link to={`/product/${item.product._id}`} className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.product._id}`}>
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate hover:text-accent-500 transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 mb-2">{item.product.category}</p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-dark-700 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-dark-700 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="p-6 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600">
              <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 dark:border-dark-600 pt-3">
                  <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Free shipping on orders over $100
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
