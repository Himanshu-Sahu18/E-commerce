const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "admin",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "user",
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "user",
  },
];

const products = [
  {
    name: "iPhone 13 Pro",
    description:
      "Latest iPhone with advanced camera system and A15 Bionic chip",
    price: 999.99,
    category: "Electronics",
    brand: "Apple",
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=300",
    ],
    featured: true,
  },
  {
    name: "Samsung Galaxy S21",
    description: "Flagship Android phone with excellent camera and display",
    price: 799.99,
    category: "Electronics",
    brand: "Samsung",
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300",
    ],
  },
  {
    name: 'MacBook Pro 14"',
    description: "Powerful laptop with M1 Pro chip for professionals",
    price: 1999.99,
    category: "Electronics",
    brand: "Apple",
    stock: 25,
    images: ["https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300"],
  },
  {
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with Air Max technology",
    price: 129.99,
    category: "Sports",
    brand: "Nike",
    stock: 100,
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300"],
  },
  {
    name: "Levi's 501 Jeans",
    description: "Classic straight-fit jeans made from premium denim",
    price: 89.99,
    category: "Clothing",
    brand: "Levi's",
    stock: 75,
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=300"],
  },
  {
    name: "The Great Gatsby",
    description: "Classic American novel by F. Scott Fitzgerald",
    price: 12.99,
    category: "Books",
    brand: "Scribner",
    stock: 200,
    images: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300"],
  },
  {
    name: "Coffee Maker",
    description: "Programmable coffee maker with thermal carafe",
    price: 79.99,
    category: "Home",
    brand: "Cuisinart",
    stock: 40,
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300",
    ],
  },
  {
    name: "Yoga Mat",
    description: "Non-slip yoga mat for all types of yoga practice",
    price: 29.99,
    category: "Sports",
    brand: "Gaiam",
    stock: 80,
    images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300"],
  },
  {
    name: "Moisturizing Cream",
    description: "Hydrating face cream for all skin types",
    price: 24.99,
    category: "Beauty",
    brand: "CeraVe",
    stock: 60,
    images: ["https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300"],
  },
  {
    name: "Wireless Headphones",
    description: "Bluetooth headphones with noise cancellation",
    price: 199.99,
    category: "Electronics",
    brand: "Sony",
    stock: 35,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
    ],
  },
];

module.exports = { users, products };
