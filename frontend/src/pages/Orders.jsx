import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle } from 'lucide-react'
import { useState } from 'react'
import axiosInstance from '../store/authStore'

const statusConfig = {
  pending: { color: 'bg-yellow-500', icon: Clock, text: 'Pending' },
  processing: { color: 'bg-blue-500', icon: Package, text: 'Processing' },
  shipped: { color: 'bg-purple-500', icon: Truck, text: 'Shipped' },
  delivered: { color: 'bg-green-500', icon: CheckCircle, text: 'Delivered' },
  cancelled: { color: 'bg-red-500', icon: XCircle, text: 'Cancelled' },
}

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get('/orders')
      setOrders(response.data.orders)
    } catch (error) {
      console.error('Error fetching orders:', error)
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

  if (orders.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
          <Link to="/products" className="btn-primary">Start Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-8"
        >
          My Orders
        </motion.h1>

        <div className="space-y-4">
          {orders.map((order, index) => {
            const status = statusConfig[order.status]
            const StatusIcon = status.icon

            return (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/order/${order._id}`}>
                  <div className="p-6 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600 hover:border-accent-500/50 transition-all group">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Order #{order._id.slice(-8)}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${status.color} bg-opacity-10`}>
                        <StatusIcon className={`w-4 h-4 ${status.color.replace('bg-', 'text-')}`} />
                        <span className={`text-sm font-medium ${status.color.replace('bg-', 'text-')}`}>
                          {status.text}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      {order.orderItems.slice(0, 3).map((item, i) => (
                        <img
                          key={i}
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                      ))}
                      {order.orderItems.length > 3 && (
                        <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-dark-700 flex items-center justify-center text-sm text-gray-500">
                          +{order.orderItems.length - 3}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="font-bold text-gray-900 dark:text-white">
                        ${order.totalPrice.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-1 text-accent-500 group-hover:translate-x-1 transition-transform">
                        <span className="text-sm font-medium">View Details</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
