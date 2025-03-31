// 📄 models/category.js

const mongoose = require('mongoose'); 
// טעינת ספריית Mongoose לעבודה מול MongoDB

// יצירת סכימת קטגוריה (למשל: T-Shirts, Jeans)
const categorySchema = new mongoose.Schema({
  name: {
    type: String, // שם הקטגוריה
    required: true, // חובה
    unique: true // ייחודי – אין כפילויות
  },
  description: {
    type: String // תיאור אופציונלי
  },
  createdAt: {
    type: Date, // תאריך יצירת הקטגוריה
    default: Date.now
  }
});

// ייצוא המודל Category
module.exports = mongoose.model('Category', categorySchema);
