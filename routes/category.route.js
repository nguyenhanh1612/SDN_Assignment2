const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

// Tạo mới một category
router.post("/", createCategory);

// Lấy tất cả categories
router.get("/", getAllCategories);

// Lấy category theo ID
router.get("/:id", getCategoryById);

// Cập nhật category
router.put("/:id", updateCategory);

// Xóa category
router.delete("/:id", deleteCategory);

module.exports = router;
