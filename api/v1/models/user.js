const mongoose = require('mongoose'); 
// טוען את Mongoose – לעבודה עם MongoDB והגדרת סכימות

// יצירת סכימת משתמשים (User Schema)
const userSchema = new mongoose.Schema({
  username: { 
    type: String,          // שם משתמש (לוגאין)
    required: true,        // חובה – לא ניתן להירשם בלי שם משתמש
    unique: true           // ייחודי – לא ניתן שניים עם אותו שם
  },
  email: { 
    type: String,          // כתובת אימייל
    required: true,        // חובה להזין אימייל
    unique: true           // ייחודי – למניעת כפילויות משתמשים
  },
  password: { 
    type: String,          // סיסמה מוצפנת
    required: true         // חובה להזין סיסמה
  },
  createdAt: { 
    type: Date,            // תאריך יצירת המשתמש
    default: Date.now      // ברירת מחדל – תאריך נוכחי
  }
});

// ייצוא המודל – שימוש ב־controllers להרשמה, התחברות, ניהול משתמשים
module.exports = mongoose.model('User', userSchema);
