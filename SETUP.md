# 🚀 Quick Start Guide

## Step 1: Install MongoDB
- Download MongoDB Community Server from https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud) for free tier

## Step 2: Setup Backend
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce_db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

Seed database with sample data:
```bash
npm run seed
```

Start backend server:
```bash
npm run dev
```

## Step 3: Setup Frontend
```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend dev server:
```bash
npm run dev
```

## Step 4: Open in Browser
- Frontend: http://localhost:3000
- Backend Health: http://localhost:5000/api/health

## Demo Login Credentials
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| User | user@example.com | user123 |

## Features to Test
1. 🏠 Browse homepage with featured products
2. 🔍 Search and filter products
3. 🛒 Add items to cart
4. 💳 Checkout with multi-step form
5. 📦 Track orders with visual timeline
6. ❤️ Add items to wishlist
7. 🌙 Toggle dark mode
8. 👤 Update profile
9. 🔐 Admin dashboard with analytics
10. 📦 Manage products and orders (Admin)
