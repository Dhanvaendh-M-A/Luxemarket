const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Product = require('../models/Product');
const User = require('../models/User');
require('dotenv').config();

const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality. Perfect for music lovers and professionals.",
    price: 129.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    stock: 50,
    rating: 4.8,
    reviews: 124,
    featured: true,
    tags: ["audio", "wireless", "premium"]
  },
  {
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, sleep tracking, and 7-day battery life. Water-resistant up to 50 meters.",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    stock: 35,
    rating: 4.6,
    reviews: 89,
    featured: true,
    tags: ["fitness", "smartwatch", "health"]
  },
  {
    name: "Minimalist Leather Backpack",
    description: "Handcrafted genuine leather backpack with laptop compartment, multiple pockets, and adjustable straps. Timeless design for everyday use.",
    price: 89.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    stock: 25,
    rating: 4.7,
    reviews: 56,
    featured: false,
    tags: ["leather", "backpack", "fashion"]
  },
  {
    name: "Organic Green Tea Set",
    description: "Premium organic green tea collection from Japan. Includes 5 varieties: Sencha, Matcha, Gyokuro, Hojicha, and Genmaicha.",
    price: 45.99,
    category: "Food & Beverages",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500",
    stock: 100,
    rating: 4.9,
    reviews: 203,
    featured: true,
    tags: ["organic", "tea", "japanese"]
  },
  {
    name: "Mechanical Keyboard RGB",
    description: "Customizable mechanical keyboard with hot-swappable switches, per-key RGB lighting, and premium PBT keycaps. Perfect for gamers and typists.",
    price: 149.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    stock: 20,
    rating: 4.5,
    reviews: 78,
    featured: true,
    tags: ["gaming", "keyboard", "rgb"]
  },
  {
    name: "Ceramic Coffee Pour-Over Set",
    description: "Elegant ceramic pour-over coffee dripper with wooden stand and glass server. Brews 1-4 cups of artisan coffee at home.",
    price: 59.99,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1517080319809-b0d70c2d0f3c?w=500",
    stock: 40,
    rating: 4.8,
    reviews: 145,
    featured: false,
    tags: ["coffee", "kitchen", "ceramic"]
  },
  {
    name: "Yoga Mat Premium",
    description: "Extra-thick eco-friendly yoga mat with alignment lines, non-slip surface, and carrying strap. 6mm thickness for joint protection.",
    price: 39.99,
    category: "Sports & Outdoors",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
    stock: 60,
    rating: 4.7,
    reviews: 112,
    featured: false,
    tags: ["yoga", "fitness", "eco-friendly"]
  },
  {
    name: "Smart Home Hub",
    description: "Central hub for all your smart home devices. Compatible with Alexa, Google Home, and Apple HomeKit. Voice control and automation.",
    price: 79.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500",
    stock: 30,
    rating: 4.4,
    reviews: 67,
    featured: true,
    tags: ["smart-home", "iot", "automation"]
  },
  {
    name: "Artisan Candle Collection",
    description: "Hand-poured soy wax candles in reusable glass jars. Set of 4 scents: Lavender, Sandalwood, Vanilla, and Citrus.",
    price: 34.99,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1602607688656-e9f7a2e9e6e1?w=500",
    stock: 45,
    rating: 4.6,
    reviews: 98,
    featured: false,
    tags: ["candles", "home", "artisan"]
  },
  {
    name: "Portable Power Bank 20000mAh",
    description: "High-capacity power bank with USB-C PD fast charging, wireless charging pad, and LED display. Charges 4 devices simultaneously.",
    price: 49.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
    stock: 75,
    rating: 4.5,
    reviews: 234,
    featured: false,
    tags: ["power-bank", "charging", "portable"]
  },
  {
    name: "Denim Jacket Vintage Style",
    description: "Classic vintage-style denim jacket with distressed details. Made from 100% organic cotton. Available in multiple washes.",
    price: 69.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=500",
    stock: 30,
    rating: 4.3,
    reviews: 45,
    featured: false,
    tags: ["denim", "jacket", "vintage"]
  },
  {
    name: "Indoor Plant Set",
    description: "Collection of 3 low-maintenance indoor plants: Snake Plant, Pothos, and ZZ Plant. Includes decorative pots and care guide.",
    price: 29.99,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500",
    stock: 55,
    rating: 4.8,
    reviews: 167,
    featured: true,
    tags: ["plants", "indoor", "decor"]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce_db');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Seed products
    await Product.insertMany(sampleProducts);
    console.log('✅ Products seeded successfully!');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
      avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff'
    });

    // Create sample user
    const userPassword = await bcrypt.hash('user123', 10);
    await User.create({
      name: 'John Doe',
      email: 'user@example.com',
      password: userPassword,
      role: 'user',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=10b981&color=fff'
    });

    console.log('✅ Users seeded successfully!');
    console.log('
📋 Demo Credentials:');
    console.log('   Admin: admin@example.com / admin123');
    console.log('   User:  user@example.com / user123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
