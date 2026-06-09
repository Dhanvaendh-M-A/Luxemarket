# LuxeMarket API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## Response Format
All responses follow this structure:
```json
{
  "success": true,
  "data": {},
  "message": "Optional message"
}
```

## Error Format
```json
{
  "success": false,
  "message": "Error description",
  "stack": "Stack trace (development only)"
}
```

## Endpoints

### Auth

#### POST /auth/register
Register a new user.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST /auth/login
Login existing user.

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET /auth/me
Get current user profile.

#### PUT /auth/profile
Update user profile.

**Body:**
```json
{
  "name": "John Doe",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

### Products

#### GET /products
Get all products with optional filters.

**Query Parameters:**
- `category` - Filter by category
- `search` - Text search
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `sort` - Sort by: `newest`, `price-asc`, `price-desc`, `rating`
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `featured` - Get featured products only

#### GET /products/:id
Get single product by ID.

#### POST /products (Admin)
Create new product.

**Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "image": "https://example.com/image.jpg",
  "stock": 50,
  "featured": true,
  "tags": ["tag1", "tag2"]
}
```

#### PUT /products/:id (Admin)
Update product.

#### DELETE /products/:id (Admin)
Soft delete product.

### Cart

#### GET /cart
Get current user's cart.

#### POST /cart
Add item to cart.

**Body:**
```json
{
  "productId": "...",
  "quantity": 1
}
```

#### PUT /cart/:productId
Update item quantity.

**Body:**
```json
{
  "quantity": 3
}
```

#### DELETE /cart/:productId
Remove item from cart.

#### DELETE /cart
Clear entire cart.

### Orders

#### POST /orders
Create new order from cart.

**Body:**
```json
{
  "shippingAddress": {
    "fullName": "John Doe",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA",
    "phone": "+1234567890"
  },
  "paymentMethod": "card"
}
```

#### GET /orders
Get user's orders.

#### GET /orders/:id
Get order details.

#### PUT /orders/:id/pay
Mark order as paid.

#### PUT /orders/:id/status (Admin)
Update order status.

**Body:**
```json
{
  "status": "shipped",
  "trackingNumber": "TRACK123456"
}
```

### Admin

#### GET /admin/dashboard
Get dashboard statistics.

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalUsers": 100,
    "totalProducts": 50,
    "totalOrders": 200,
    "revenue": 15000.00
  },
  "recentOrders": [...],
  "lowStock": [...]
}
```

#### GET /admin/users
Get all users (paginated).

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |
