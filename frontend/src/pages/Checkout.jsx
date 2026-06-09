import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard, Truck, MapPin, Check, ArrowLeft } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import axiosInstance from '../store/authStore'
import toast from 'react-hot-toast'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, totalPrice, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    paymentMethod: 'card'
  })

  const shipping = totalPrice > 100 ? 0 : 10
  const tax = Number((totalPrice * 0.08).toFixed(2))
  const finalTotal = Number((totalPrice + shipping + tax).toFixed(2))

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
      return
    }

    setIsProcessing(true)
    try {
      const response = await axiosInstance.post('/orders', {
        shippingAddress: {
          fullName: formData.fullName,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          phone: formData.phone
        },
        paymentMethod: formData.paymentMethod
      })

      if (response.data.success) {
        await clearCart()
        toast.success('Order placed successfully!')
        navigate(`/order/${response.data.order._id}`)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order')
    } finally {
      setIsProcessing(false)
    }
  }

  const steps = [
    { number: 1, title: 'Shipping', icon: MapPin },
    { number: 2, title: 'Payment', icon: CreditCard },
    { number: 3, title: 'Review', icon: Check },
  ]

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-gray-500 hover:text-accent-500 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to cart
        </motion.button>

        <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Checkout
        </h1>

        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => (
            <div key={s.number} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= s.number
                  ? 'bg-gradient-to-r from-accent-500 to-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-dark-700 text-gray-400'
              }`}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className={`ml-2 text-sm font-medium hidden sm:block ${
                step >= s.number ? 'text-gray-900 dark:text-white' : 'text-gray-400'
              }`}>
                {s.title}
              </span>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  step > s.number ? 'bg-gradient-to-r from-accent-500 to-primary-500' : 'bg-gray-200 dark:bg-dark-700'
                }`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600">
                  <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent-500" />
                    Shipping Information
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                    />
                    <input
                      type="text"
                      name="street"
                      placeholder="Street Address"
                      value={formData.street}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all sm:col-span-2"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP Code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                    />
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="p-6 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600">
                <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-accent-500" />
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {[
                    { id: 'card', name: 'Credit/Debit Card', desc: 'Pay securely with your card' },
                    { id: 'paypal', name: 'PayPal', desc: 'Pay with your PayPal account' },
                    { id: 'cod', name: 'Cash on Delivery', desc: 'Pay when you receive' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.paymentMethod === method.id
                          ? 'border-accent-500 bg-accent-500/5'
                          : 'border-gray-200 dark:border-dark-600 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-accent-500"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{method.name}</p>
                        <p className="text-sm text-gray-500">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600">
                  <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Order Review</h2>

                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.product._id} className="flex items-center gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{item.product.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 dark:border-dark-600 pt-4 space-y-2">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-dark-600">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Shipping Address</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {formData.fullName}<br />
                    {formData.street}<br />
                    {formData.city}, {formData.state} {formData.zipCode}<br />
                    {formData.country}
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="btn-secondary"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : step === 3 ? (
                <>
                  <Check className="w-5 h-5" />
                  Place Order - ${finalTotal.toFixed(2)}
                </>
              ) : (
                <>
                  Continue
                  <Truck className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
