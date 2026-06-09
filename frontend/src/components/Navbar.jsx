import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingCart, Search, User, Menu, X, Heart, 
  Package, LogOut, ChevronDown, Sun, Moon, Sparkles
} from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/cartStore'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDark, setIsDark] = useState(false)
  const { user, isAuthenticated, logout } = useAuthStore()
  const { totalItems } = useCartStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsProfileOpen(false)
  }, [location])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/products' },
    { name: 'Orders', path: '/orders', auth: true },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl shadow-lg shadow-black/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Sparkles className="w-8 h-8 text-accent-500 transition-transform group-hover:rotate-12" />
                <div className="absolute inset-0 bg-accent-500/20 rounded-full blur-xl animate-pulse-slow" />
              </div>
              <span className="font-display text-xl lg:text-2xl font-bold gradient-text">
                LuxeMarket
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                (!link.auth || isAuthenticated) && (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'text-accent-500'
                        : 'text-gray-600 dark:text-gray-300 hover:text-accent-500 dark:hover:text-accent-400'
                    }`}
                  >
                    {link.name}
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-500 to-primary-500"
                      />
                    )}
                  </Link>
                )
              ))}
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-accent-500 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-dark-700 border border-transparent focus:border-accent-500 focus:bg-white dark:focus:bg-dark-600 transition-all outline-none text-sm"
                />
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>

              {/* Wishlist */}
              {isAuthenticated && (
                <Link
                  to="/wishlist"
                  className="hidden sm:flex p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors relative"
                >
                  <Heart className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </Link>
              )}

              {/* Cart */}
              <Link
                to="/cart"
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-accent-500 to-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>

              {/* Profile / Auth */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                  >
                    <img
                      src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-800 rounded-2xl shadow-xl shadow-black/10 border border-gray-100 dark:border-dark-600 overflow-hidden"
                      >
                        <div className="p-4 border-b border-gray-100 dark:border-dark-600">
                          <p className="font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                        </div>
                        <div className="p-2">
                          <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors text-sm text-gray-700 dark:text-gray-300">
                            <User className="w-4 h-4" /> Profile
                          </Link>
                          <Link to="/orders" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors text-sm text-gray-700 dark:text-gray-300">
                            <Package className="w-4 h-4" /> Orders
                          </Link>
                          {user?.role === 'admin' && (
                            <Link to="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors text-sm text-gray-700 dark:text-gray-300">
                              <Sparkles className="w-4 h-4" /> Admin Panel
                            </Link>
                          )}
                          <button
                            onClick={() => { logout(); navigate('/') }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm text-red-600 dark:text-red-400"
                          >
                            <LogOut className="w-4 h-4" /> Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link to="/login" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-accent-500 transition-colors">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn-primary text-sm">
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white dark:bg-dark-900 border-t border-gray-100 dark:border-dark-700"
            >
              <div className="px-4 py-4 space-y-3">
                <form onSubmit={handleSearch} className="md:hidden">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-dark-700 border border-transparent focus:border-accent-500 outline-none text-sm"
                    />
                  </div>
                </form>
                {navLinks.map((link) => (
                  (!link.auth || isAuthenticated) && (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="block py-2 text-gray-700 dark:text-gray-300 hover:text-accent-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  )
                ))}
                {!isAuthenticated && (
                  <div className="flex gap-3 pt-2">
                    <Link to="/login" className="flex-1 text-center py-2 rounded-full border border-gray-300 dark:border-gray-600 text-sm font-medium">
                      Sign In
                    </Link>
                    <Link to="/register" className="flex-1 text-center py-2 rounded-full bg-gradient-to-r from-accent-500 to-primary-500 text-white text-sm font-medium">
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isProfileOpen && (
          <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
        )}
      </AnimatePresence>
    </>
  )
}
