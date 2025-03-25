const express = require('express'); 
const router = express.Router(); 
// יוצר ראוטר עצמאי לעגלה

const authenticateToken = require('../middlewares/auth'); 
// Middleware – בודק JWT (רק משתמש מחובר יוכל לגשת לעגלה)

const { addToCart, getCart, removeItem, clearCart } = require('../controllers/cart'); 
// מייבא את כל הפעולות לעגלה מה־controller

// ➕ הוספת מוצר לעגלה
router.post('/add', authenticateToken, addToCart); 
// דוגמה: POST ל־/api/v1/cart/add עם productId + quantity

// 👀 שליפת עגלה מלאה
router.get('/', authenticateToken, getCart); 
// דוגמה: GET ל־/api/v1/cart → מחזיר JSON כרגע

// ❌ הסרת מוצר מסוים לפי productId
router.delete('/remove/:productId', authenticateToken, removeItem); 

// 🗑️ ריקון כל העגלה
router.delete('/clear', authenticateToken, clearCart); 

module.exports = router; 
// ייצוא הראוטר לשימוש ב־app.js
