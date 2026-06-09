import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, Package, Truck, CheckCircle, Clock, XCircle, ChevronDown } from 'lucide-react'
import axiosInstance from '../store/authStore'
import toast from 'react-hot-toast'

const statusConfig = {
  pending: { color: 'bg-yellow-500', text: 'text-yellow-600', label: 'Pending' },
  processing: { color: 'bg-blue-500', text: 'text-blue-600', label: 'Processing' },
  shipped: { color: 'bg-purple-500', text: 'text-purple-600', label: 'Shipped' },
  delivered: { color: 'bg-green-500', text: 'text-green-600', label: 'Delivered' },
  cancelled: { color: 'bg-red-500', text: 'text-red-600', label: 'Cancelled' },
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [updatingOrder, setUpdatingOrder] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get('/orders/admin/all')
      setOrders(response.data.orders)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateStatus = async (orderId, newStatus) => {
    setUpdatingOrder(orderId)
    try {
      await axiosInstance.put(`/orders/${orderId}/status`, { status: newStatus })
      toast.success(`Order status updated to ${newStatus}`)
      fetchOrders()
    } catch (error) {
      toast.error('Failed to update status')
    } finally {
      setUpdatingOrder(null)
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white">Orders</h1>
            <p className="text-gray-500">Manage and track all orders</p>
          </motion.div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-dark-700 border-none text-sm focus:ring-2 focus:ring-accent-500"
              />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 rounded-xl bg-gray-100 dark:bg-dark-700 border-none text-sm focus:ring-2 focus:ring-accent-500 cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-dark-600">
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Order ID</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Customer</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Items</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Total</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Date</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => {
                  const status = statusConfig[order.status]
                  return (
                    <motion.tr
                      key={order._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-50 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <Link to={`/order/${order._id}`} className="font-mono text-sm text-accent-500 hover:underline">
                          #{order._id.slice(-8)}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-sm text-gray-900 dark:text-white">{order.user?.name}</p>
                          <p className="text-xs text-gray-500">{order.user?.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {order.orderItems.slice(0, 3).map((item, i) => (
                            <img key={i} src={item.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                          ))}
                          {order.orderItems.length > 3 && (
                            <span className="text-xs text-gray-500">+{order.orderItems.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        ${order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.color} bg-opacity-10 ${status.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${status.color}`} />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="relative inline-block">
                          <select
                            value={order.status}
                            onChange={(e) => updateStatus(order._id, e.target.value)}
                            disabled={updatingOrder === order._id}
                            className="appearance-none pl-3 pr-8 py-1.5 rounded-lg bg-gray-100 dark:bg-dark-700 text-sm border-none focus:ring-2 focus:ring-accent-500 cursor-pointer disabled:opacity-50"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" />
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Filter className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No orders found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
