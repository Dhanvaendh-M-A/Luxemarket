# 🛍️ LuxeMarket - Full-Stack E-Commerce Application

A modern, feature-rich e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js). Features a stunning creative UI, role-based access control, and complete order management.

![LuxeMarket](https://img.shields.io/badge/LuxeMarket-E--Commerce-ff6b6b?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248?style=for-the-badge&logo=mongodb)

## ✨ Features

### Customer Features
- 🎨 **Modern Creative UI** - Glassmorphism, gradient effects, smooth animations
- 🔍 **Product Catalog** - Browse, search, and filter products
- 🛒 **Shopping Cart** - Add, update, remove items with real-time totals
- 💳 **Checkout Flow** - Multi-step checkout with shipping, payment, and review
- 📦 **Order Tracking** - Visual timeline for order status
- ❤️ **Wishlist** - Save favorite products
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive** - Fully responsive across all devices

### Admin Features
- 📊 **Dashboard** - Analytics with stats, charts, and insights
- 📦 **Product Management** - CRUD operations for products
- 📋 **Order Management** - Update order statuses, track shipments
- 👥 **User Management** - View and manage customers
- 🔔 **Low Stock Alerts** - Automatic alerts for low inventory

## 🚀 Tech Stack

### Backend
- **Node.js** + **Express.js** - Server framework
- **MongoDB** + **Mongoose** - Database & ODM
- **JWT** - Authentication & authorization
- **Bcrypt.js** - Password hashing
- **Helmet** + **CORS** + **Rate Limiting** - Security
- **Stripe** - Payment processing (ready for integration)

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **Zustand** - State management
- **React Router** - Navigation
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## 📁 Project Structure

```
ecommerce-app/
├── backend/
│   ├── config/
│   │   ├── db.js              # Database connection
│   │   └── seed.js            # Database seeder with sample data
│   ├── middleware/
│   │   ├── auth.js            # JWT authentication
│   │   ├── upload.js          # File upload handler
│   │   └── errorHandler.js    # Global error handler
│   ├── models/
│   │   ├── User.js            # User model
│   │   ├── Product.js         # Product model
│   │   ├── Order.js           # Order model
│   │   └── Cart.js            # Cart model
│   ├── routes/
│   │   ├── auth.js            # Auth routes (login, register, profile)
│   │   ├── products.js        # Product routes
│   │   ├── orders.js          # Order routes
│   │   ├── cart.js            # Cart routes
│   │   ├── users.js           # User routes (wishlist)
│   │   └── admin.js           # Admin dashboard routes
│   ├── .env.example           # Environment variables template
│   ├── package.json
│   └── server.js              # Main server file
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── AdminRoute.jsx
│   │   │   └── ScrollToTop.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── OrderDetail.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Wishlist.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminProducts.jsx
│   │   │   ├── AdminOrders.jsx
│   │   │   └── NotFound.jsx
│   │   ├── store/
│   │   │   ├── authStore.js   # Authentication state
│   │   │   ├── cartStore.js   # Cart state
│   │   │   └── productStore.js # Product state
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── docs/
│   └── API.md                 # API documentation
├── database/
│   └── schema.sql             # Database schema reference
├── .gitignore
└── README.md
```

## 🛠️ Installation

### Prerequisites
- Node.js 20+
- MongoDB 8.0+ (local or MongoDB Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/luxemarket.git
cd luxemarket
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce_db
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
NODE_ENV=development
```

Seed the database:
```bash
npm run seed
```

Start the server:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:
```bash
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- API Health Check: http://localhost:5000/api/health

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| User | user@example.com | user123 |

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |
| PUT | /api/auth/profile | Update profile |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products (with filters) |
| GET | /api/products/featured | Get featured products |
| GET | /api/products/:id | Get single product |
| POST | /api/products | Create product (Admin) |
| PUT | /api/products/:id | Update product (Admin) |
| DELETE | /api/products/:id | Delete product (Admin) |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/cart | Get cart |
| POST | /api/cart | Add to cart |
| PUT | /api/cart/:id | Update quantity |
| DELETE | /api/cart/:id | Remove item |
| DELETE | /api/cart | Clear cart |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/orders | Create order |
| GET | /api/orders | Get user orders |
| GET | /api/orders/:id | Get order details |
| PUT | /api/orders/:id/pay | Mark as paid |
| PUT | /api/orders/:id/status | Update status (Admin) |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/dashboard | Dashboard stats |
| GET | /api/admin/users | All users |

## 🎨 UI Features

- **Glassmorphism Cards** - Modern translucent design
- **Gradient Text & Borders** - Eye-catching visual elements
- **Smooth Animations** - Framer Motion page transitions and hover effects
- **Floating Elements** - Animated decorative elements
- **Dark Mode** - Full dark theme support
- **Responsive Grid** - Bento-style layouts
- **Loading Skeletons** - Smooth loading states
- **Toast Notifications** - User-friendly feedback

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Rate limiting on API endpoints
- Helmet.js for security headers
- CORS configuration
- Input validation with express-validator

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce_db
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Deployment

### Backend (Render/Railway/Heroku)
1. Set environment variables
2. Add `npm start` as start command
3. Ensure MongoDB Atlas URI is configured

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Set `VITE_API_URL` to production API URL
3. Deploy `dist/` folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ for the modern web.

---

⭐ Star this repo if you find it helpful!
