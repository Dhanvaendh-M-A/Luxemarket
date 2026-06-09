import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Camera, Save } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export default function Profile() {
  const { user, updateProfile } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zipCode: user?.address?.zipCode || '',
      country: user?.address?.country || ''
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await updateProfile(formData)
    if (result.success) {
      toast.success('Profile updated successfully!')
      setIsEditing(false)
    } else {
      toast.error(result.error)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="relative inline-block">
            <img
              src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=random`}
              alt={user?.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-dark-700 shadow-lg"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-accent-500 text-white rounded-full shadow-lg hover:bg-accent-600 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white mt-4">
            {user?.name}
          </h1>
          <p className="text-gray-500">{user?.email}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-accent-500/10 text-accent-600 text-sm font-medium rounded-full capitalize">
            {user?.role}
          </span>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="p-6 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg text-gray-900 dark:text-white">Personal Information</h2>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-sm text-accent-500 hover:text-accent-600 font-medium"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all disabled:opacity-60"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 opacity-60 cursor-not-allowed"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Phone Number"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all disabled:opacity-60"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent-500" />
              Address
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                value={formData.address.street}
                onChange={(e) => setFormData({
                  ...formData,
                  address: { ...formData.address, street: e.target.value }
                })}
                disabled={!isEditing}
                placeholder="Street Address"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all disabled:opacity-60"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.address.city}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, city: e.target.value }
                  })}
                  disabled={!isEditing}
                  placeholder="City"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all disabled:opacity-60"
                />
                <input
                  type="text"
                  value={formData.address.state}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, state: e.target.value }
                  })}
                  disabled={!isEditing}
                  placeholder="State"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all disabled:opacity-60"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.address.zipCode}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, zipCode: e.target.value }
                  })}
                  disabled={!isEditing}
                  placeholder="ZIP Code"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all disabled:opacity-60"
                />
                <input
                  type="text"
                  value={formData.address.country}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, country: e.target.value }
                  })}
                  disabled={!isEditing}
                  placeholder="Country"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all disabled:opacity-60"
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              type="submit"
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </motion.button>
          )}
        </motion.form>
      </div>
    </div>
  )
}
