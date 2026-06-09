import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-9xl font-display font-bold gradient-text mb-4">404</div>
          <p className="text-2xl text-gray-600 dark:text-gray-400 mb-2">Page Not Found</p>
          <p className="text-gray-500">The page you're looking for doesn't exist or has been moved.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/" className="btn-primary flex items-center gap-2">
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link to="/products" className="btn-secondary flex items-center gap-2">
            <Search className="w-5 h-5" />
            Browse Products
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
