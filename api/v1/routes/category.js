// 📄 routes/category.js

const express = require('express');
const router = express.Router(); // יצירת ראוטר

const authenticateToken = require('../middlewares/auth'); 
// Middleware לבדיקה אם המשתמש מחובר

const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
} = require('../controllers/category'); // טעינת פעולות הקטגוריה

// 🔹 נתיבי API (JSON)
router.post('/', authenticateToken, createCategory); // יצירת קטגוריה
router.get('/', getAllCategories); // שליפת כל הקטגוריות
router.put('/:id', authenticateToken, updateCategory); // עדכון קטגוריה
router.delete('/:id', authenticateToken, deleteCategory); // מחיקת קטגוריה

// 🔹 תצוגה ב־HTML דרך Handlebars
router.get('/view/all', async (req, res) => {
  try {
    const Category = require('../models/category');
    const categories = await Category.find();

    res.render('categories', { title: 'All Categories', categories });
  } catch (err) {
    console.error('Error rendering categories:', err.message);
    res.status(500).send('Failed to render categories');
  }
});

module.exports = router;
