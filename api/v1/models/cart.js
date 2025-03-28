const mongoose = require('mongoose'); // טוען את ספריית Mongoose לעבודה מול MongoDB

// יצירת סכימת העגלה (Cart Schema)
const cartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, // מזהה ייחודי של המשתמש (ObjectId)
    ref: 'user', // קשר ל־collection בשם 'User' (מפתח זר)
    required: true // חובה – כל עגלה חייבת להיות שייכת למשתמש
  },
  items: [ // מערך של מוצרים בעגלה
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, // מזהה ייחודי של מוצר
        ref: 'product' // קשר ל־collection בשם 'Product' (מפתח זר)
      },
      quantity: { 
        type: Number, // כמות מהמוצר בעגלה
        default: 1 // ברירת מחדל: 1 יחידה
      }
    }
  ],
  createdAt: { 
    type: Date, // תאריך יצירת העגלה
    default: Date.now // ברירת מחדל: התאריך הנוכחי
  }
});

// ייצוא המודל Cart – לשימוש בכל האפליקציה (controllers וכו')
module.exports = mongoose.model('cart', cartSchema);
