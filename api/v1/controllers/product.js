const Product = require('../models/product'); // טוען את מודל המוצרים ממסד הנתונים

// קבלת כל המוצרים
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // שליפת כל המוצרים מהמסד
    res.render('products', { // הצגת המוצרים בדף HTML
      title: 'All Products', // כותרת לעמוד
      products // שליחת המוצרים לתצוגה
    });
  } catch (err) {
    console.error('Error getting products:', err); // הדפסת שגיאה ל־console
    res.status(500).send('Failed to fetch products'); // החזרת שגיאה למשתמש
  }
};

// קבלת מוצר לפי ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // שליפת מוצר לפי מזהה מהכתובת
    if (!product) return res.status(404).send('Product not found'); // אם לא נמצא – החזר שגיאה
    res.render('productDetails', { // הצגת דף מוצר
      title: product.name, // כותרת דינמית
      product // שליחת פרטי המוצר לתצוגה
    });
  } catch (err) {
    console.error('Error getting product by ID:', err.message); // הדפסת שגיאה
    res.status(500).send('Failed to fetch product'); // שגיאה למשתמש
  }
};

// יצירת מוצר חדש
const createProduct = async (req, res) => {
  try {
    const { name, price, size, category, imageUrl, inStock } = req.body; // שליפת שדות מהממשק

    const newProduct = new Product({
      name,
      price,
      size,
      category,
      imageUrl,
      inStock
    });

    await newProduct.save(); // שמירה במסד הנתונים
    res.redirect('/products'); // הפניה לעמוד המוצרים
  } catch (err) {
    console.error('Error creating product:', err); // הדפסת שגיאה
    res.status(500).send('Failed to create product'); // שגיאה למשתמש
  }
};

// עדכון מוצר קיים לפי ID
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // החזרת המוצר לאחר עדכון
    );
    if (!updated) return res.status(404).send('Product not found'); // אם לא נמצא – שגיאה
    res.redirect('/products'); // הפניה חזרה לעמוד המוצרים
  } catch (err) {
    console.error('Error updating product:', err.message); // הדפסת שגיאה
    res.status(500).send('Failed to update product'); // שגיאה למשתמש
  }
};

// מחיקת מוצר לפי ID
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id); // מחיקת מוצר מהמסד
    if (!deleted) return res.status(404).send('Product not found'); // אם לא נמצא – שגיאה
    res.redirect('/products'); // הפניה לעמוד המוצרים
  } catch (err) {
    console.error('Error deleting product:', err.message); // הדפסת שגיאה
    res.status(500).send('Failed to delete product'); // שגיאה למשתמש
  }
};

module.exports = {
  getAllProducts, // ייצוא פונקציית שליפת כל המוצרים
  getProductById, // ייצוא פונקציית שליפת מוצר לפי ID
  createProduct, // ייצוא פונקציית יצירת מוצר
  updateProduct, // ייצוא פונקציית עדכון מוצר
  deleteProduct // ייצוא פונקציית מחיקת מוצר
};