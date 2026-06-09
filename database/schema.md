# Database Schema Reference

## MongoDB Collections

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  avatar: String,
  role: String (enum: ['user', 'admin']),
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  wishlist: [ObjectId],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  comparePrice: Number,
  category: String,
  image: String,
  images: [String],
  stock: Number,
  rating: Number,
  reviews: Number,
  featured: Boolean,
  tags: [String],
  specifications: [{ key: String, value: String }],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Carts Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number
  }],
  updatedAt: Date,
  createdAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  orderItems: [{
    product: ObjectId (ref: Product),
    name: String,
    image: String,
    price: Number,
    quantity: Number
  }],
  shippingAddress: {
    fullName: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phone: String
  },
  paymentMethod: String (enum: ['card', 'paypal', 'cod']),
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  itemsPrice: Number,
  shippingPrice: Number,
  taxPrice: Number,
  totalPrice: Number,
  status: String (enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  isPaid: Boolean,
  paidAt: Date,
  isDelivered: Boolean,
  deliveredAt: Date,
  trackingNumber: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Indexes

- Products: Text index on name, description, tags
- Users: Unique index on email
- Carts: Unique index on user
- Orders: Index on user and status
