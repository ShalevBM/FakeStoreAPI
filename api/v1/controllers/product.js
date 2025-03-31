// 📄 controllers/product.js

const Product = require('../models/product'); // מודל מוצר
const Category = require('../models/category'); // מודל קטגוריה

// ✅ קבלת כל המוצרים מחולקים לפי קטגוריות (לתצוגה הראשית)
const getProductsByCategory = async (req, res) => {
  try {
    const categories = await Category.find(); // שליפת כל הקטגוריות
    const data = [];

    for (const category of categories) {
      const products = await Product.find({ category: category.name });
      data.push({ category: category.name, products });
    }

    res.render('product', {
      title: 'Our Collection',
      categories: data // שולח לתבנית רשימה של קטגוריות + מוצרים
    });
  } catch (err) {
    console.error('Error fetching products by category:', err.message);
    res.status(500).send('Failed to fetch products');
  }
};

// ✅ קבלת כל המוצרים (API או תצוגה פשוטה)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('product', {
      title: 'All Products',
      products
    });
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).send('Failed to fetch products');
  }
};

// ✅ קבלת מוצר בודד לפי מזהה
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');

    res.render('product', {
      title: product.name,
      product
    });
  } catch (err) {
    console.error('Error fetching product:', err.message);
    res.status(500).send('Failed to fetch product');
  }
};

// ✅ יצירת מוצר חדש
const createProduct = async (req, res) => {
  try {
    const { name, price, size, category, imageUrl, inStock } = req.body;
    if (!name || !price || !size || !category) {
      return res.status(400).send('Please fill in all fields');
    }

    const newProduct = new Product({
      name,
      price,
      size,
      category,
      imageUrl,
      inStock
    });

    await newProduct.save();
    res.redirect('/product');
  } catch (err) {
    console.error('Error creating product:', err.message);
    res.status(500).send('Failed to create product');
  }
};

// ✅ עדכון מוצר לפי מזהה
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).send('Product not found');

    res.redirect('/product');
  } catch (err) {
    console.error('Error updating product:', err.message);
    res.status(500).send('Failed to update product');
  }
};

// ✅ מחיקת מוצר
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send('Product not found');

    res.redirect('/product');
  } catch (err) {
    console.error('Error deleting product:', err.message);
    res.status(500).send('Failed to delete product');
  }
};

// ✅ מוצרים לפי קטגוריה
const getProductsByCategoryName = async (req, res) => {
  try {
    const categoryName = req.params.categoryName;
    const products = await Product.find({ category: categoryName });

    if (products.length === 0) {
      return res.status(404).send('No products found for this category');
    }

    res.render('categoryProducts', {
      title: `${categoryName} Collection`,
      categoryName,
      products
    });
  } catch (err) {
    console.error('Error fetching category products:', err.message);
    res.status(500).send('Failed to fetch category products');
  }
};

module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategoryName
};
