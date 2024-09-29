const express = require("express");
const { register, login, deleteAccount } = require("../controllers/auth.controller");
const { authenticateToken } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/delete", authenticateToken, deleteAccount); // Sử dụng middleware xác thực

module.exports = router;
