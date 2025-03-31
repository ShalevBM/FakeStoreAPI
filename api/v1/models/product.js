// 📄 models/product.js

// טעינת ספריית mongoose – מאפשרת עבודה עם MongoDB
const mongoose = require('mongoose');

// ✅ יצירת סכימה למוצר (Product Schema)
const productSchema = new mongoose.Schema({
  name: {
    type: String, // שם המוצר (לדוגמה: "חולצת גברים קלאסית")
    required: [true, 'יש להזין שם מוצר'], // חובה – לא ניתן לשמור מוצר בלי שם
    trim: true // מסיר רווחים מיותרים בתחילת וסוף המחרוזת
  },
  price: {
    type: Number, // מחיר המוצר
    required: [true, 'יש להזין מחיר מוצר'], // חובה
    min: [0, 'המחיר חייב להיות מספר חיובי'] // לא ניתן להזין מחיר שלילי
  },
  size: {
    type: String, // מידה (S, M, L, XL)
    required: [true, 'יש לבחור מידה']
  },
  category: {
    type: String, // קטגוריה (למשל: TShirts)
    required: [true, 'יש לבחור קטגוריה']
  },
  imageUrl: {
    type: String, // קישור לתמונה של המוצר
    required: [true, 'יש לספק כתובת תמונה']
  },
  inStock: {
    type: Boolean, // האם המוצר במלאי
    default: true // ברירת מחדל – במלאי
  },
  createdAt: {
    type: Date, // תאריך יצירת המוצר
    default: Date.now // ברירת מחדל – התאריך הנוכחי
  }
});

// ✅ ייצוא המודל – לשימוש ב־controllers, routes, סל קניות ועוד
module.exports = mongoose.model('product', productSchema);
