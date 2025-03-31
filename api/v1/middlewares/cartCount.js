const Cart = require('../models/cart');

const cartItemCount = async (req, res, next) => {
  if (req.user) {
    try {
      const cart = await Cart.findOne({ userId: req.user.userId });
      res.locals.cartCount = cart
        ? cart.items.reduce((sum, item) => sum + item.quantity, 0)
        : 0;
    } catch (err) {
      res.locals.cartCount = 0;
    }
  } else {
    res.locals.cartCount = 0;
  }
  next();
};

module.exports = cartItemCount;
