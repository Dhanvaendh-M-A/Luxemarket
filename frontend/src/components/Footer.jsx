import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Mail, MapPin, Phone, ArrowUpRight, Github, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  const footerLinks = {
    Shop: [
      { name: 'All Products', path: '/products' },
      { name: 'New Arrivals', path: '/products?sort=newest' },
      { name: 'Featured', path: '/products?featured=true' },
      { name: 'Sale', path: '/products' },
    ],
    Support: [
      { name: 'Contact Us', path: '#' },
      { name: 'FAQ', path: '#' },
      { name: 'Shipping Info', path: '#' },
      { name: 'Returns', path: '#' },
    ],
    Company: [
      { name: 'About Us', path: '#' },
      { name: 'Careers', path: '#' },
      { name: 'Blog', path: '#' },
      { name: 'Press', path: '#' },
    ],
  }

  return (
    <footer className="bg-dark-900 text-white relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-accent-500/10 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-white/10">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl font-bold mb-4"
            >
              Stay in the <span className="gradient-text">Loop</span>
            </motion.h3>
            <p className="text-gray-400 mb-8">
              Subscribe to get exclusive offers, new arrivals, and insider-only discounts.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full bg-white/5 border border-white/10 focus:border-accent-500 outline-none text-white placeholder-gray-500 transition-colors"
              />
              <button type="submit" className="btn-primary px-8">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-accent-500" />
              <span className="font-display text-xl font-bold gradient-text">LuxeMarket</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Premium e-commerce experience with curated products, seamless checkout, and exceptional customer service.
            </p>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-accent-500" />
                <span>123 Innovation Drive, Tech City, TC 12345</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent-500" />
                <span>hello@luxemarket.com</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-400 hover:text-accent-400 transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 LuxeMarket. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
              <Twitter className="w-4 h-4 text-gray-400" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
              <Instagram className="w-4 h-4 text-gray-400" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
              <Github className="w-4 h-4 text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
