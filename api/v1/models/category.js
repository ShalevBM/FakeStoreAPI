const mongoose = require('mongoose'); 
// טעינת ספריית Mongoose לעבודה מול MongoDB – מאפשרת הגדרת סכימות ומודלים

// יצירת סכימת קטגוריה (למשל: T-Shirts, Jeans)
const categorySchema = new mongoose.Schema({
  name: { 
    type: String, // שם הקטגוריה (לדוג' 'T-Shirts')
    required: true, // חובה – לא ניתן ליצור קטגוריה בלי שם
    unique: true // כל שם חייב להיות ייחודי במסד (למניעת כפילויות)
  },
  description: String, // תיאור אופציונלי של הקטגוריה
  createdAt: { 
    type: Date, // תאריך יצירת הקטגוריה
    default: Date.now // ברירת מחדל – התאריך הנוכחי
  }
});

// ייצוא המודל Category – כדי להשתמש בו בכל חלקי המערכת (controllers וכו')
module.exports = mongoose.model('Category', categorySchema);
