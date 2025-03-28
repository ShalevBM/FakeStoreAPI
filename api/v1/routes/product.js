const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/product'); // טוען את כל הפונקציות מה-controller
const Product = require('../models/product'); // טוען את מודל product

// API – שליפת כל המוצרים בפורמט JSON
router.get('/', getAllProducts);

// API – שליפת מוצר בודד לפי ID (JSON)
router.get('/:id', getProductById);

// API – יצירת מוצר חדש בפורמט JSON
router.post('/', createProduct);

// API – עדכון מוצר לפי ID (JSON)
router.put('/:id', updateProduct);

// API – מחיקת מוצר לפי ID (JSON)
router.delete('/:id', deleteProduct);

// HTML – הצגת כל המוצרים עם Handlebars (view)
router.get('/view/all', async (req, res) => {
  try {
    const products = await Product.find(); // שליפת כל המוצרים מה־DB
    res.render('product', { title: 'All Products', products }); // הצגת המוצרים ב־product.hbs
  } catch (err) {
    console.error('Error rendering products:', err.message);
    res.status(500).send('Failed to load products page');
  }
});

module.exports = router;
