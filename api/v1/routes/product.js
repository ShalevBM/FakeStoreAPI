const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/product');
const Product = require('../models/product');

// 🔹 API Routes
router.get('/api', getAllProducts);
router.get('/api/:id', getProductById);
router.post('/api', createProduct);
router.put('/api/:id', updateProduct);
router.delete('/api/:id', deleteProduct);

// 🔹 HTML View Route (Handlebars)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('product', { title: 'All Products', products });
  } catch (err) {
    console.error('Error rendering products page:', err.message);
    res.status(500).send('Failed to load products page');
  }
}); 

module.exports = router;
