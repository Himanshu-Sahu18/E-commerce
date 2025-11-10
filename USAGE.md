# 🛒 E-Commerce Application Usage Guide

> **MERN Stack** | **JWT Auth** | **MongoDB Atlas** | **Responsive Design**

---

## 🚀 Quick Start

### 📋 Prerequisites
- ✅ Node.js (v14 or higher)
- ✅ MongoDB Atlas account
- ✅ Git version control

### ⚙️ Installation & Setup

**1. Clone Repository**
```bash
git clone https://github.com/Himanshu-Sahu18/E-commerce.git
cd E-commerce
```

**2. Install Dependencies**
```bash
npm run install-all
```

**3. Database Configuration**
```bash
# Create .env file in server/ directory
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d
```

**4. Seed Database & Start**
```bash
cd server && npm run seed
cd .. && npm run dev
```

### 🌐 Access URLs
- **🖥️ Frontend:** [http://localhost:3000](http://localhost:3000)
- **⚙️ Backend API:** [http://localhost:5000](http://localhost:5000)

---

## 📈 User Journey Flowchart

```
🎯 START
    │
    ▼
┌─────────────┐
│ 🏠 HOMEPAGE │ ←─── Search & Filter Products
│ Browse      │
│ Products    │
└──────┬──────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│ 📦 PRODUCT  │ ←───┤ 🖱️ Click     │
│ DETAILS     │     │ Product Card │
│ ℹ️ View Info │     └─────────────┘
│ ➕ Add to Cart│
└──────┬──────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│ 🛒 VIEW CART │ ←───┤ 🔄 Update Qty │
│ 📋 Review   │     │ 🗑️ Remove Item │
│ Items       │     └─────────────┘
│ 💳 Checkout │
└──────┬──────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│ 🔐 LOGIN    │ ←───┤ 🚫 Not Logged│
│ (Required)  │     │ In          │
└──────┬──────┘     └─────────────┘
       │
       ▼
┌─────────────┐
│ 📝 CHECKOUT │
│ 📍 Shipping │
│ Info        │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ ✅ PLACE    │
│ ORDER       │
│ 💵 Cash on  │
│ Delivery    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ 🎉 SUCCESS! │
│ 📊 Track    │
│ Order       │
└─────────────┘
```

---

## 👤 Customer Guide

### 🔑 Default Test Accounts
| Role | Email | Password |
|------|-------|----------|
| 👤 User | `john@example.com` | `123456` |
| 👤 User | `jane@example.com` | `123456` |

### 🛍️ Shopping Workflow

#### 🔍 **Browse & Search**
- **Homepage:** Featured products with search bar
- **Categories:** Filter by Electronics, Clothing, Books, etc.
- **Pagination:** Navigate through product pages

#### 📦 **Product Interaction**
- **Details:** Click any product card for full information
- **Gallery:** View product images and specifications
- **Cart:** Add items with quantity selection

#### 🛒 **Cart Management**
- **View Cart:** Access via header cart icon
- **Modify:** Update quantities or remove items
- **Continue:** Return to shopping or proceed to checkout

#### 💳 **Checkout Process**
- **🔐 Authentication Required**
- **📋 Order Review:** Verify items and totals
- **📍 Shipping:** Enter delivery information
- **💵 Payment:** Cash on Delivery only
- **📧 Confirmation:** Order ID and success message

#### 📊 **Order Tracking**
- **Profile:** Access "My Orders" section
- **Status:** Monitor order progress
- **History:** View past purchases

---

## 👨‍💼 Administrator Guide

### 🔑 Admin Credentials
| Role | Email | Password |
|------|-------|----------|
| 👑 Admin | `admin@example.com` | `123456` |

### 📊 Dashboard Overview
**Route:** `/admin/dashboard`
- 📈 **Statistics:** Total users, products, orders, revenue
- 🚀 **Quick Access:** Management shortcuts

### 📦 Product Management
**Route:** `/admin/products`

| Action | Description |
|--------|-------------|
| ➕ **Add** | Create new products with details |
| ✏️ **Edit** | Modify existing product information |
| 🗑️ **Delete** | Remove products (with confirmation) |
| 📊 **Inventory** | Track and update stock levels |

### 📋 Order Management
**Route:** `/admin/orders`

| Feature | Description |
|---------|-------------|
| 👁️ **View All** | Complete order list with details |
| 📝 **Order Details** | Individual order information |
| 🔄 **Status Updates** | Change order status workflow |
| 📈 **History** | Track order changes and timestamps |

### 👥 User Management
**Route:** `/admin/users`

| Feature | Description |
|---------|-------------|
| 📋 **User List** | All registered users |
| 👤 **Profiles** | Individual user details and history |
| 🏷️ **Roles** | User/Admin role management |
| 📊 **Activity** | Monitor user registration and actions |

---

## 🔌 API Reference

### 🔐 Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user account |
| `POST` | `/api/auth/login` | User authentication |
| `GET` | `/api/auth/me` | Get current user profile |

### 📦 Product Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/products` | Get all products (with filters) | Public |
| `GET` | `/api/products/:id` | Get single product details | Public |
| `POST` | `/api/products` | Create new product | Admin |
| `PUT` | `/api/products/:id` | Update product | Admin |
| `DELETE` | `/api/products/:id` | Delete product | Admin |

### 🛒 Cart Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/cart` | Get user's shopping cart |
| `POST` | `/api/cart/add` | Add item to cart |
| `PUT` | `/api/cart/update` | Update cart item quantity |
| `DELETE` | `/api/cart/remove/:id` | Remove item from cart |

### 📋 Order Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `POST` | `/api/orders` | Create new order | User |
| `GET` | `/api/orders/myorders` | Get user's orders | User |
| `GET` | `/api/orders/:id` | Get order details | User |
| `GET` | `/api/orders` | Get all orders | Admin |
| `PUT` | `/api/orders/:id/status` | Update order status | Admin |

---

## 🛠️ Troubleshooting Guide

| Issue | 🔍 Symptoms | ✅ Solutions |
|-------|-------------|-------------|
| 🚫 **App Won't Start** | Server fails to launch | Check MongoDB URI, env vars, ports 3000/5000 |
| 🔐 **Login Problems** | Can't authenticate | Verify seeded data, JWT_SECRET, credentials |
| 📦 **Products Not Loading** | Empty product list | Check backend port 5000, MongoDB connection |
| 🛒 **Cart Issues** | Can't add/modify cart | Ensure user login, check cart storage |
| 👑 **Admin Access Denied** | Can't access admin routes | Use admin@example.com/123456, verify role |
| 🔧 **Development Mode** | Hot reload not working | Frontend proxies to backend automatically |
| 🚀 **Production Issues** | App not working in prod | Set NODE_ENV=production, update API URLs |

---

## ✨ Key Features

### 👤 Customer Features
- 🔍 **Advanced Search** - Real-time product search
- 🏷️ **Category Filters** - Filter by product categories
- 🛒 **Smart Cart** - Quantity management and persistence
- 💳 **Secure Checkout** - Cash on Delivery payment
- 📊 **Order Tracking** - Real-time status updates
- 👤 **User Profiles** - Account management

### 👨‍💼 Admin Features
- 📈 **Analytics Dashboard** - Business metrics and KPIs
- 📦 **Product CRUD** - Complete product lifecycle management
- 📋 **Order Processing** - Status management and fulfillment
- 👥 **User Management** - Customer account oversight
- 📊 **Inventory Control** - Stock level monitoring

### 🔒 Security Features
- 🔐 **JWT Authentication** - Secure token-based auth
- 🔒 **Password Hashing** - bcrypt encryption
- 🛡️ **Protected Routes** - Role-based access control
- ✅ **Input Validation** - Server-side data validation
- 🌐 **CORS Protection** - Cross-origin security

---

## 📞 Support & Resources

### 📚 Documentation
- **📖 README.md** - Project overview and setup
- **🚀 DEPLOYMENT.md** - Production deployment guide

### 🆘 Getting Help
1. 📋 **Check this guide** first
2. 🔍 **Review application logs**
3. ⚙️ **Verify configuration** settings
4. 🧪 **Test with default credentials**
5. 🐛 **Check GitHub issues** for known problems

### 🔗 Quick Links
- [🏠 Homepage](http://localhost:3000) (when running)
- [📊 Admin Dashboard](http://localhost:3000/admin/dashboard) (when running)
- [📚 GitHub Repository](https://github.com/Himanshu-Sahu18/E-commerce)

---

*Built with ❤️ using MERN Stack*
