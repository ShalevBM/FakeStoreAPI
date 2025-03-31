// 📄 models/user.js

const mongoose = require('mongoose'); 
// טעינת Mongoose – לעבודה עם MongoDB והגדרת סכימות

// יצירת סכימת משתמשים (User Schema)
const userSchema = new mongoose.Schema({
  username: { 
    type: String,          // שם משתמש
    required: true,        // חובה
    unique: true           // ייחודי
  },
  email: { 
    type: String,          // כתובת אימייל
    required: true,        // חובה
    unique: true           // ייחודי
  },
  password: { 
    type: String,          // סיסמה מוצפנת
    required: true         // חובה
  },
  createdAt: { 
    type: Date,            // תאריך יצירת המשתמש
    default: Date.now
  }
});

// ייצוא המודל לשימוש ב־controllers ו־routes
module.exports = mongoose.model('User', userSchema);
