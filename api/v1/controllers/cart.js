const Cart = require('../models/cart');
const Product = require('../models/product');

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const item = cart.items.find(i => i.productId.toString() === productId);
      if (item) {
        item.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    } else {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }]
      });
    }

    await cart.save();
    res.redirect('/cart');
  } catch (err) {
    console.error('Error adding to cart:', err.message);
    res.status(500).send('Failed to add to cart');
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.render('cart', {
        title: 'My Cart',
        items: [],
        totalPrice: 0,
        message: '🛒 Your cart is empty!'
      });
    }

    const totalPrice = cart.items.reduce(
      (sum, i) => sum + i.productId.price * i.quantity,
      0
    );

    res.render('cart', {
      title: 'My Cart',
      items: cart.items,
      totalPrice
    });
  } catch (err) {
    console.error('Error fetching cart:', err.message);
    res.status(500).send('Failed to fetch cart');
  }
};

exports.removeItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).send('Cart not found');

    cart.items = cart.items.filter(i => i.productId.toString() !== productId);
    await cart.save();

    res.redirect('/cart');
  } catch (err) {
    console.error('Error removing item:', err.message);
    res.status(500).send('Failed to remove item');
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    await Cart.findOneAndDelete({ userId });
    res.redirect('/cart');
  } catch (err) {
    console.error('Error clearing cart:', err.message);
    res.status(500).send('Failed to clear cart');
  }
};