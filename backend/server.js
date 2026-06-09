const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// ============================================
// MIDDLEWARE
// ============================================

app.use(helmet());

// Allow requests from your Vercel frontend
app.use(cors({
  origin: 'https://luxemarket-r703qgzy6-dhanvaendh-m-a-s-projects.vercel.app',
  
  credentials: true  // only if you're using cookies/sessions
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ============================================
// STATIC FILES
// ============================================

app.use('/uploads', express.static('uploads'));

// ============================================
// ROUTES
// ============================================

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/users', require('./routes/users'));
app.use('/api/admin', require('./routes/admin'));

// ============================================
// HEALTH CHECK
// ============================================

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'E-Commerce API is running 🚀',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// ============================================
// ERROR HANDLING
// ============================================

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ============================================
// DATABASE + SERVER START
// ============================================

const connectDB = async () => {
  try {
    // 🔴 CHANGE THIS: If MONGODB_URI is not set, use fallback (for testing only)
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.error('❌ MONGODB_URI is not defined in environment variables!');
      console.log('⚠️  Please set MONGODB_URI in Render Environment settings');
      return false;
    }
    
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log('⚠️  Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
    return false;
  }
};

// Start server after DB connection attempt
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🌟 Server running on port ${PORT}`);
    console.log(`📡 API URL: http://localhost:${PORT}/api`);
  });
});

module.exports = app;
