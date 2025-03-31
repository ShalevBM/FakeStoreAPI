const mongoose = require('mongoose');
// טעינת Mongoose – מאפשר להגדיר סכימות ולעבוד מול MongoDB

// יצירת סכימה למוצר (Product Schema)
const productSchema = new mongoose.Schema({
  name: String,           // שם המוצר (לדוגמה: "חולצת גברים קלאסית")
  price: Number,          // מחיר המוצר בשקלים
  size: String,           // מידה (לדוגמה: S, M, L, XL)
  category: String,       // קטגוריה (לדוגמה: "TShirts")
  imageUrl: String,       // קישור לתמונה של המוצר (לתצוגה בפרונטאנד)
  inStock: Boolean        // האם המוצר במלאי (true/false)
});

// ייצוא המודל – לשימוש ב־controllers, views, סל קניות ועוד
module.exports = mongoose.model('product', productSchema);
