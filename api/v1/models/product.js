const mongoose = require('mongoose'); 
// טעינת Mongoose – מאפשר לך להגדיר סכימות (Schemas) ולעבוד מול MongoDB

// יצירת סכימה למוצר (Product Schema)
const productSchema = new mongoose.Schema({
  name: String,           // שם המוצר (לדוג' "חולצת גברים קלאסית")
  price: Number,          // מחיר המוצר בשקלים
  size: String,           // מידה (לדוג' S, M, L, XL)
  category: String,       // קטגוריה (לדוג' "TShirts") – כאן זה טקסט, אפשר גם ObjectId אם רוצים לקשר לטבלת קטגוריות
  imageUrl: String,       // קישור לתמונה של המוצר (תצוגה ב־Frontend)
  inStock: Boolean        // האם המוצר במלאי (true/false)
});

// ייצוא המודל – לשימוש ב־controllers, views, סל קניות ועוד
module.exports = mongoose.model('product', productSchema);
