import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Zap, Shield, Truck, RefreshCw, Sparkles, TrendingUp, Star } from 'lucide-react'
import { useProductStore } from '../store/productStore'
import ProductCard from '../components/ProductCard'

function HeroSection() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-accent-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ y: y1 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-600 dark:text-accent-400 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              New Collection 2026
            </motion.div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Discover Your{' '}
              <span className="gradient-text">Perfect</span>
              <br />
              Style
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed">
              Curated premium products from around the world. Experience seamless shopping with our innovative platform designed for the modern consumer.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="btn-primary inline-flex items-center justify-center gap-2 text-lg">
                Explore Products
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/products?featured=true" className="btn-secondary inline-flex items-center justify-center gap-2 text-lg">
                View Featured
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-gray-200 dark:border-dark-600">
              {[
                { value: '50K+', label: 'Products' },
                { value: '100K+', label: 'Customers' },
                { value: '4.9', label: 'Rating' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            style={{ y: y2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-3xl blur-2xl transform rotate-3" />
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
                alt="Hero Product"
                className="relative rounded-3xl shadow-2xl shadow-accent-500/20 w-full aspect-[4/5] object-cover"
              />

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-8 top-1/4 glass-card-light dark:glass-card p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-500 to-primary-500 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Trending Now</p>
                    <p className="text-xs text-gray-500">2.5k sold this week</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -right-4 bottom-1/4 glass-card-light dark:glass-card p-4 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">4.9</span>
                  <span className="text-sm text-gray-500">(12k reviews)</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-600 flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Get your orders delivered within 24-48 hours with our express shipping.',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Your transactions are protected with 256-bit SSL encryption.',
      color: 'from-green-400 to-emerald-500',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Enjoy free shipping on all orders over $100. No hidden fees.',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: RefreshCw,
      title: 'Easy Returns',
      description: '30-day hassle-free return policy. Full refund guaranteed.',
      color: 'from-purple-400 to-pink-500',
    },
  ]

  return (
    <section className="py-20 bg-white dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group p-6 rounded-2xl bg-gray-50 dark:bg-dark-700 border border-gray-100 dark:border-dark-600 hover:border-accent-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/10"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedProducts() {
  const { featuredProducts, fetchFeaturedProducts } = useProductStore()

  useEffect(() => {
    fetchFeaturedProducts()
  }, [fetchFeaturedProducts])

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2"
            >
              Featured <span className="gradient-text">Products</span>
            </motion.h2>
            <p className="text-gray-600 dark:text-gray-400">Handpicked items just for you</p>
          </div>
          <Link to="/products" className="hidden sm:flex items-center gap-2 text-accent-500 hover:text-accent-600 font-medium transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoriesSection() {
  const { categories, fetchCategories } = useProductStore()

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const categoryImages = {
    'Electronics': 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=400',
    'Fashion': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
    'Home & Kitchen': 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400',
    'Sports & Outdoors': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400',
    'Food & Beverages': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    'Books': 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
    'Beauty': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    'Toys': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400',
  }

  return (
    <section className="py-20 bg-white dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center"
        >
          Shop by <span className="gradient-text">Category</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/products?category=${category}`}
                className="group relative overflow-hidden rounded-2xl aspect-square block"
              >
                <img
                  src={categoryImages[category] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'}
                  alt={category}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-semibold text-white text-lg">{category}</h3>
                  <p className="text-sm text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore →
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <FeaturedProducts />
      <CategoriesSection />
    </div>
  )
}
