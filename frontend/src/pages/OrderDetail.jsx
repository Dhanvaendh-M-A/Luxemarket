import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Package, Truck, CheckCircle, Clock, XCircle, MapPin } from 'lucide-react'
import axiosInstance from '../store/authStore'

const statusSteps = [
  { key: 'pending', label: 'Order Placed', icon: Clock },
  { key: 'processing', label: 'Processing', icon: Package },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle },
]

const statusConfig = {
  pending: { color: 'bg-yellow-500', text: 'text-yellow-600' },
  processing: { color: 'bg-blue-500', text: 'text-blue-600' },
  shipped: { color: 'bg-purple-500', text: 'text-purple-600' },
  delivered: { color: 'bg-green-500', text: 'text-green-600' },
  cancelled: { color: 'bg-red-500', text: 'text-red-600' },
}

export default function OrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchOrder()
  }, [id])

  const fetchOrder = async () => {
    try {
      const response = await axiosInstance.get(`/orders/${id}`)
      setOrder(response.data.order)
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Order not found</h2>
        </div>
      </div>
    )
  }

  const currentStatusIndex = statusSteps.findIndex(s => s.key === order.status)
  const status = statusConfig[order.status]

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/orders" className="flex items-center gap-2 text-gray-500 hover:text-accent-500 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to orders
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white">
              Order #{order._id.slice(-8)}
            </h1>
            <span className={`px-4 py-1 rounded-full text-sm font-medium ${status.color} bg-opacity-10 ${status.text}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
          <p className="text-gray-500">
            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </motion.div>

        {/* Tracking Timeline */}
        {order.status !== 'cancelled' && (
          <div className="p-6 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600 mb-6">
            <div className="flex items-center justify-between">
              {statusSteps.map((step, index) => {
                const StepIcon = step.icon
                const isCompleted = index <= currentStatusIndex
                const isCurrent = index === currentStatusIndex

                return (
                  <div key={step.key} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isCompleted
                          ? 'bg-gradient-to-r from-accent-500 to-primary-500 text-white'
                          : 'bg-gray-100 dark:bg-dark-700 text-gray-400'
                      } ${isCurrent ? 'ring-4 ring-accent-500/20' : ''}`}>
                        <StepIcon className="w-5 h-5" />
                      </div>
                      <span className={`text-xs mt-2 font-medium ${
                        isCompleted ? 'text-gray-900 dark:text-white' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                    {index < statusSteps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-2 ${
                        index < currentStatusIndex
                          ? 'bg-gradient-to-r from-accent-500 to-primary-500'
                          : 'bg-gray-200 dark:bg-dark-700'
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Order Items */}
        <div className="p-6 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600 mb-6">
          <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.orderItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <Link to={`/product/${item.product}`}>
                    <h3 className="font-medium text-gray-900 dark:text-white hover:text-accent-500 transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Shipping Address */}
          <div className="p-6 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent-500" />
              Shipping Address
            </h2>
            <div className="text-gray-600 dark:text-gray-400 space-y-1">
              <p className="font-medium text-gray-900 dark:text-white">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
              <p>{order.shippingAddress.country}</p>
              {order.shippingAddress.phone && <p className="mt-2">📞 {order.shippingAddress.phone}</p>}
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-6 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Items</span>
                <span>${order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>{order.shippingPrice === 0 ? 'Free' : `$${order.shippingPrice.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax</span>
                <span>${order.taxPrice.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-100 dark:border-dark-600 pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${order.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {order.trackingNumber && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-dark-700 rounded-xl">
                <p className="text-sm text-gray-500">Tracking Number</p>
                <p className="font-mono font-medium text-gray-900 dark:text-white">{order.trackingNumber}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
