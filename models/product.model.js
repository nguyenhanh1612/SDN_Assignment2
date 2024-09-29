const mongoose = require('mongoose');

// Định nghĩa schema cho sản phẩm
const productSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Tên sản phẩm
    price: { type: Number, required: true }, // Giá sản phẩm
    description: { type: String, required: true }, // Mô tả sản phẩm
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' } // Liên kết với Category
}, { timestamps: true });

// Kiểm tra và định nghĩa mô hình cho Product
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
