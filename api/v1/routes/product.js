// 📄 routes/product.js

const express = require('express');
const router = express.Router();

// ייבוא הפונקציות מה־controller
const {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategoryName
} = require('../controllers/product');

// ✅ 🔹 API Routes (ל־Postman או Frontend)
router.get('/api', getAllProducts); // שליפת כל המוצרים
router.get('/api/:id', getProductById); // מוצר לפי מזהה
router.post('/api', createProduct); // יצירת מוצר
router.put('/api/:id', updateProduct); // עדכון מוצר
router.delete('/api/:id', deleteProduct); // מחיקת מוצר

// ✅ 🔹 View Routes (Handlebars)

// 🔥 דף מוצרים ראשי – מוצרים לפי קטגוריה + Scroll
router.get('/', getProductsByCategory);

// 👇 דף מוצרים של קטגוריה מסוימת
router.get('/category/:categoryName', getProductsByCategoryName);

module.exports = router;
