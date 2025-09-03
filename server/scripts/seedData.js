const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const Product = require("../models/Product");
const { users, products } = require("../data/sampleData");

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    console.log("Existing data cleared");

    // Insert users
    const createdUsers = await User.insertMany(users);
    console.log("Users seeded");

    // Add createdBy field to products
    const adminUser = createdUsers.find((user) => user.role === "admin");
    const productsWithCreator = products.map((product) => ({
      ...product,
      createdBy: adminUser._id,
    }));

    // Insert products
    await Product.insertMany(productsWithCreator);
    console.log("Products seeded");

    console.log("Data seeding completed successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
