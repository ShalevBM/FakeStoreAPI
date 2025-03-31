const express = require('express');
const router = express.Router(); // ראוטר עצמאי לעגלה

const authenticateToken = require('../middlewares/auth'); 
// Middleware – בודק JWT

const { 
  addToCart, 
  getCart, 
  removeItem, 
  clearCart,
  addToCartAPI // ✅ פונקציה חדשה ל־AJAX
} = require('../controllers/cart'); 

// ➕ הוספת מוצר לעגלה רגילה (redirect)
router.post('/add', authenticateToken, addToCart);

// ➕ הוספת מוצר לעגלה דרך API (AJAX)
router.post('/api/add', authenticateToken, addToCartAPI);

// 👀 שליפת עגלה
router.get('/', authenticateToken, getCart);

// ❌ הסרת מוצר לפי productId
router.post('/remove/:productId', authenticateToken, removeItem); 

// 🗑️ ריקון כל העגלה
router.post('/clear', authenticateToken, clearCart);

module.exports = router;
