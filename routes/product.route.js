const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

// Middleware để kiểm tra dữ liệu đầu vào khi tạo hoặc cập nhật sản phẩm
const validateProductData = (req, res, next) => {
  const { name, price, description, category } = req.body;
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: "Product name is required and should be a non-empty string." });
  }
  if (!price || typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ error: "Product price is required and should be a positive number." });
  }
  if (!description || typeof description !== 'string' || description.trim() === '') {
    return res.status(400).json({ error: "Product description is required and should be a non-empty string." });
  }
  if (category && typeof category !== 'string') {
    return res.status(400).json({ error: "Product category should be a string." });
  }
  next();
};

// Tạo mới một sản phẩm
router.post("/", validateProductData, createProduct); // Thêm middleware xác thực

// Lấy tất cả sản phẩm
router.get("/", getAllProducts);

// Lấy sản phẩm theo ID
router.get("/:productId", getProductById);

// Cập nhật sản phẩm
router.put("/:productId", validateProductData, updateProduct); // Thêm middleware xác thực

// Xóa sản phẩm
router.delete("/:productId", deleteProduct);

module.exports = router;
