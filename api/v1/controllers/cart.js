const Cart = require('../models/cart');
const Product = require('../models/product');

// ➕ הוספת מוצר לעגלה (לקריאה רגילה - redirect)
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).send('Missing productId or quantity');
    }

    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0) {
      return res.status(400).send('Invalid quantity');
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity: qty }]
      });
    } else {
      const index = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
      if (index !== -1) {
        cart.items[index].quantity += qty;
      } else {
        cart.items.push({ productId, quantity: qty });
      }
    }

    await cart.save();
    res.redirect('/cart');
  } catch (err) {
    console.error('Error adding product to cart:', err.message);
    res.status(500).send('Failed to add product to cart');
  }
};

// ➕ הוספת מוצר לעגלה (API – AJAX)
exports.addToCartAPI = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Missing productId or quantity' });
    }

    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity: qty }]
      });
    } else {
      const index = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
      if (index !== -1) {
        cart.items[index].quantity += qty;
      } else {
        cart.items.push({ productId, quantity: qty });
      }
    }

    await cart.save();

    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    res.json({
      message: 'Product added to cart',
      totalItems
    });
  } catch (err) {
    console.error('Error adding product to cart (API):', err.message);
    res.status(500).json({ message: 'Failed to add product to cart' });
  }
};

// 👀 שליפת עגלה
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

// ❌ הסרת מוצר מהעגלה
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
    console.error('Error removing item from cart:', err.message);
    res.status(500).send('Failed to remove item from cart');
  }
};

// 🗑️ ריקון כל העגלה
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
