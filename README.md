# 🛒 MERN E-Commerce Web Application

A modern, full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js). Features a professional UI, secure authentication, and comprehensive admin panel.

![E-Commerce App](https://img.shields.io/badge/MERN-Stack-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-yellow)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple)

## Demo

## ✨ Features

### 🔐 **Authentication & Security**

- JWT-based user authentication
- Secure password hashing with bcryptjs
- Protected routes for users and admins
- Role-based access control

### 🛍️ **Shopping Experience**

- Advanced product search with debounced input
- Category-based filtering
- Professional product cards with ratings
- Detailed product pages with image galleries
- Smart shopping cart with quantity management
- Seamless checkout process

### 👨‍💼 **Admin Panel**

- Comprehensive dashboard with statistics
- Product management (CRUD operations)
- Order management with status updates
- User management system
- Inventory tracking

### 🎨 **Modern UI/UX**

- Professional gradient design
- Responsive Bootstrap 5 layout
- Custom CSS animations and transitions
- Intuitive navigation with back buttons
- Loading states and error handling
- Mobile-optimized interface

## 🚀 Tech Stack

### **Frontend**

- **React 18** - Modern React with Hooks
- **React Router DOM** - Client-side routing
- **React Bootstrap** - UI components
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Context API** - State management

### **Backend**

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation

### **Deployment**

- **Frontend**: Vercel (Free)
- **Backend**: Render (Free)
- **Database**: MongoDB Atlas (Free Tier)

## 📁 Project Structure

```
mern-ecommerce/
├── client/                     # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── ProductCard.js
│   │   │   ├── BackButton.js
│   │   │   └── ProtectedRoute.js
│   │   ├── pages/              # Page components
│   │   │   ├── Home.js
│   │   │   ├── ProductDetails.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── admin/          # Admin pages
│   │   ├── context/            # Context providers
│   │   │   ├── AuthContext.js
│   │   │   └── CartContext.js
│   │   ├── styles/
│   │   │   └── custom.css      # Custom styling
│   │   └── App.js
│   └── package.json
├── server/                     # Node.js Backend
│   ├── models/                 # Database models
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/                 # API routes
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   └── users.js
│   ├── middleware/             # Custom middleware
│   │   └── auth.js
│   ├── data/                   # Sample data
│   │   └── sampleData.js
│   ├── scripts/                # Utility scripts
│   │   └── seedData.js
│   ├── db/                     # Database connection
│   │   └── connectDB.js
│   ├── .env                    # Environment variables
│   └── server.js               # Entry point
├── README.md
├── DEPLOYMENT.md               # Deployment guide
└── package.json                # Root package.json
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB Atlas** account (free tier)
- **Git**

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/mern-ecommerce.git
cd mern-ecommerce
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
npm run install-server

# Install client dependencies
npm run install-client
```

### 3. MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create new cluster (M0 Sandbox - Free)
3. Create database user with read/write permissions
4. Whitelist IP address (0.0.0.0/0 for development)
5. Get connection string

### 4. Environment Configuration

Create `.env` file in `server` directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_secure
JWT_EXPIRE=30d
```

### 5. Seed Database

```bash
cd server
npm run seed
```

### 6. Start Application

```bash
# From root directory
npm run dev
```

**Access the application:**

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Deployment

### Backend Deployment (Render)

1. Create account at [Render](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Configure:
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
   - Environment Variables: Add all variables from your `.env` file

### Frontend Deployment (Vercel)

1. Create account at [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Configure:
   - Framework Preset: Create React App
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Add environment variable:
   - `REACT_APP_API_URL`: Your backend URL from Render

### Alternative: Heroku Deployment

#### Backend (Heroku)

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create your-app-name-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy
git subtree push --prefix server heroku main
```

#### Frontend (Netlify)

1. Build the client: `cd client && npm run build`
2. Drag and drop the `build` folder to Netlify
3. Configure redirects for React Router

## Features Overview

### User Features

- User registration and authentication
- Browse products with search and filtering
- Product details with reviews
- Shopping cart management
- Secure checkout with Cash on Delivery
- Order tracking and history
- User profile management

### Admin Features

- Admin dashboard with statistics
- Product management (CRUD operations)
- Order management and status updates
- User management
- Inventory tracking

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart

- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:id` - Remove item from cart

### Orders

- `POST /api/orders` - Create order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)

## 🔑 Default Login Credentials

After seeding the database:

| Role      | Email             | Password |
| --------- | ----------------- | -------- |
| **Admin** | admin@example.com | 123456   |
| **User**  | john@example.com  | 123456   |
| **User**  | jane@example.com  | 123456   |

## Technologies Used

### Backend

- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Express Validator for input validation

### Frontend

- React 18 with Hooks
- React Router for navigation
- React Bootstrap for UI components
- Axios for API calls
- Context API for state management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
