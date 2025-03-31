// 📄 models/cart.js

// טעינת ספריית Mongoose לעבודה מול MongoDB
const mongoose = require('mongoose');

// ✅ יצירת סכימת עגלה (Cart Schema)
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // מזהה המשתמש
    ref: 'user', // קשר לטבלת המשתמשים
    required: true // חובה – כל עגלה קשורה למשתמש
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId, // מזהה המוצר
        ref: 'product' // קשר לטבלת המוצרים
      },
      quantity: {
        type: Number, // כמות
        default: 1, // ברירת מחדל
        min: [1, 'Quantity cannot be less than 1'] // ולידציה
      }
    }
  ],
  createdAt: {
    type: Date, // תאריך יצירה
    default: Date.now
  }
});

// ייצוא המודל Cart לשימוש בכלל המערכת
module.exports = mongoose.model('cart', cartSchema);
