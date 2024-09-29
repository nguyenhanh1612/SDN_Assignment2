const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Account = require("../models/account.model");

// Đăng ký
const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const existingAccount = await Account.findOne({ username });
    if (existingAccount) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newAccount = new Account({ username, password });
    await newAccount.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Error creating account", error);
    res.status(500).json({ message: "Error creating account", error });
  }
};

// Đăng nhập
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const account = await Account.findOne({ username });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: account._id }, "mysupersecretkey", {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Xóa tài khoản
const deleteAccount = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const deletedAccount = await Account.findOneAndDelete({ username });
    if (!deletedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account", error);
    res.status(500).json({ message: "Error deleting account", error });
  }
};

module.exports = { register, login, deleteAccount };
