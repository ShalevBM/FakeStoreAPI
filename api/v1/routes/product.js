const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct } = require('../controllers/product');

// 1. API – שליפת כל המוצרים (JSON)
router.get('/', getAllProducts);

// 2. API – יצירת מוצר חדש (JSON)
router.post('/', createProduct);

// 3. HTML – הצגת כל המוצרים עם Handlebars (view)
router.get('/view/all', async (req, res) => {
  try {
    const Product = require('../models/product');
    const products = await Product.find();
    res.render('product', { title: 'All Products', products }); // views/products.hbs
  } catch (err) {
    console.error('Error rendering products:', err.message);
    res.status(500).send('Failed to load products page');
  }
});

module.exports = router;
