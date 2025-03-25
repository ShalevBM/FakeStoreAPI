const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const { createOrder, getUserOrders } = require('../controllers/order');

// ➕ יצירת הזמנה (API JSON)
router.post('/create', authenticateToken, createOrder);

// 📦 שליפת הזמנות (API JSON)
router.get('/', authenticateToken, getUserOrders);

// 🌐 הצגת הזמנות בדף HTML עם Handlebars
router.get('/view/all', authenticateToken, async (req, res) => {
  try {
    const Order = require('../models/order');
    const orders = await Order.find({ userId: req.user.userId }).populate('items.productId');
    res.render('order', { title: 'My Orders', orders }); // מציג views/orders.hbs
  } catch (err) {
    console.error('Error rendering orders:', err.message);
    res.status(500).send('Failed to render orders');
  }
});

module.exports = router;
