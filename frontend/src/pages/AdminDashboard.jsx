import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Users, Package, ShoppingBag, DollarSign, TrendingUp, 
  TrendingDown, AlertTriangle, ArrowRight 
} from 'lucide-react'
import axiosInstance from '../store/authStore'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [lowStock, setLowStock] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      const response = await axiosInstance.get('/admin/dashboard')
      setStats(response.data.stats)
      setRecentOrders(response.data.recentOrders)
      setLowStock(response.data.lowStock)
    } catch (error) {
      console.error('Error fetching dashboard:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statCards = [
    { title: 'Total Users', value: stats?.totalUsers || 0, icon: Users, color: 'from-blue-500 to-cyan-500', link: '/admin/users' },
    { title: 'Products', value: stats?.totalProducts || 0, icon: Package, color: 'from-purple-500 to-pink-500', link: '/admin/products' },
    { title: 'Orders', value: stats?.totalOrders || 0, icon: ShoppingBag, color: 'from-orange-500 to-red-500', link: '/admin/orders' },
    { title: 'Revenue', value: `$${(stats?.revenue || 0).toFixed(2)}`, icon: DollarSign, color: 'from-green-500 to-emerald-500', link: '/admin/orders' },
  ]

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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-500">Overview of your store performance</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={stat.link}>
                <div className="p-6 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600 hover:border-accent-500/50 transition-all group">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2 text-accent-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm">View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="p-6 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg text-gray-900 dark:text-white">Recent Orders</h2>
              <Link to="/admin/orders" className="text-sm text-accent-500 hover:text-accent-600">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order._id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-dark-700">
                  <div>
                    <p className="font-medium text-sm text-gray-900 dark:text-white">Order #{order._id.slice(-8)}</p>
                    <p className="text-xs text-gray-500">{order.user?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">${order.totalPrice.toFixed(2)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="p-6 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                Low Stock Alert
              </h2>
              <Link to="/admin/products" className="text-sm text-accent-500 hover:text-accent-600">
                Manage
              </Link>
            </div>
            <div className="space-y-3">
              {lowStock.map((product) => (
                <div key={product._id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-dark-700">
                  <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900 dark:text-white">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${product.stock < 5 ? 'text-red-500' : 'text-yellow-500'}`}>
                      {product.stock} left
                    </p>
                  </div>
                </div>
              ))}
              {lowStock.length === 0 && (
                <p className="text-center text-gray-500 py-4">All products are well stocked!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
