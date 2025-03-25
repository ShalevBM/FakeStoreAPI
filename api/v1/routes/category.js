const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
} = require('../controllers/category');

// 🔹 נתיבי API (JSON)
router.post('/', authenticateToken, createCategory);
router.get('/', getAllCategories);
router.put('/:id', authenticateToken, updateCategory);
router.delete('/:id', authenticateToken, deleteCategory);

// 🔹 נתיב HTML ל־Handlebars – מציג את כל הקטגוריות בדף רגיל
router.get('/view/all', async (req, res) => {
  try {
    const Category = require('../models/category'); // טוען את המודל
    const categories = await Category.find(); // מביא את כל הקטגוריות
    res.render('categories', { title: 'All Categories', categories }); 
    // מציג את הדף views/categories.hbs עם הנתונים
  } catch (err) {
    console.error('Error rendering categories:', err.message);
    res.status(500).send('Failed to render categories');
  }
});

module.exports = router;
