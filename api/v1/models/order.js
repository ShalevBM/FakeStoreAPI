const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // מזהה המשתמש
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // מוצר מוזמן
      quantity: Number // כמות מהמוצר
    }
  ],
  totalAmount: Number, // סכום כולל של ההזמנה
  isPaid: { type: Boolean, default: false }, // ← חדש: האם ההזמנה שולמה
  createdAt: { type: Date, default: Date.now } // תאריך יצירת ההזמנה
});

module.exports = mongoose.model('Order', orderSchema); // ייצוא המודל לשימוש בקוד
