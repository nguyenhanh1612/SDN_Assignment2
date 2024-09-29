const express = require("express");
const mongoose = require("./config/db");
const Account = require("./models/account.model");
const categoryRoutes = require("./routes/category.route");
const productRoutes = require("./routes/product.route");
const authRoutes = require("./routes/auth.route");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Sử dụng middleware để phân tích cú pháp JSON

// Định nghĩa các routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

// Khởi động server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
