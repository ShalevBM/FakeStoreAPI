const Product = require('../models/product'); // טוען את מודל המוצרים ממסד הנתונים

// קבלת כל המוצרים
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // שליפת כל המוצרים מהמסד
    res.render('product', { // הצגת המוצרים בדף HTML
      title: 'All Products', // כותרת לעמוד
      products // שליחת המוצרים לתצוגה
    });
  } catch (err) {
    console.error('Error getting products:', err);
    res.status(500).send('Failed to fetch products');
  }
};

// קבלת מוצר לפי ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // שליפת מוצר לפי מזהה
    if (!product) return res.status(404).send('Product not found');
    res.render('product', { // מציג דף מוצר יחיד
      title: product.name,
      product
    });
  } catch (err) {
    console.error('Error getting product by ID:', err.message);
    res.status(500).send('Failed to fetch product');
  }
};

// יצירת מוצר חדש
const createProduct = async (req, res) => {
  try {
    const { name, price, size, category, imageUrl, inStock } = req.body;

    const newProduct = new Product({
      name,
      price,
      size,
      category,
      imageUrl,
      inStock
    });

    await newProduct.save();
    res.redirect('/product/view/all'); // הפניה לרשימת המוצרים
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).send('Failed to create product');
  }
};

// עדכון מוצר קיים לפי ID
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).send('Product not found');
    res.redirect('/product/view/all'); // הפניה לרשימת המוצרים
  } catch (err) {
    console.error('Error updating product:', err.message);
    res.status(500).send('Failed to update product');
  }
};

// מחיקת מוצר לפי ID
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send('Product not found');
    res.redirect('/product/view/all'); // הפניה לרשימת המוצרים
  } catch (err) {
    console.error('Error deleting product:', err.message);
    res.status(500).send('Failed to delete product');
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
