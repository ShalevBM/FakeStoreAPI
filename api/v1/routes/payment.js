const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const { payForOrder } = require('../controllers/payment');

router.post('/:orderId', authenticateToken, payForOrder); // ← תשלום לפי orderId
router.get('/pay/:orderId', authenticateToken, async (req, res) => {
    try {
      const Order = require('../models/order');
      const order = await Order.findById(req.params.orderId).populate('items.productId');
      if (!order) return res.status(404).send('Order not found');
  
      res.render('pay', { order, title: 'Pay for Order' }); // מציג views/pay.hbs
    } catch (err) {
      console.error('Error rendering payment page:', err.message);
      res.status(500).send('Failed to load payment page');
    }
  });
  

module.exports = router;
