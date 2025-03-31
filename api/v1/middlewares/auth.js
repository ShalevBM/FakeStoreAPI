// 📄 middlewares/authenticateUser.js

const jwt = require('jsonwebtoken'); // טעינת ספריית JWT
require('dotenv').config(); // טעינת משתני סביבה מקובץ .env

/**
 * Middleware שמוודא אם יש למשתמש טוקן ושם אותו ב־req.user + res.locals.user
 * כך שהשם של המשתמש יהיה זמין בתבניות Handlebars ובכל הראוטים
 */
const authenticateUser = (req, res, next) => {
  const token = req.cookies.token; // שליפת הטוקן מה־Cookie

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // אימות הטוקן
      req.user = decoded; // שמירת נתוני המשתמש בבקשה
      res.locals.user = decoded; // שמירת נתוני המשתמש לשימוש בתבניות Handlebars
    } catch (err) {
      // טוקן לא תקין → לא מזהה משתמש
      req.user = null;
      res.locals.user = null;
    }
  } else {
    // אין טוקן → המשתמש לא מחובר
    req.user = null;
    res.locals.user = null;
  }

  next(); // ממשיך למידלוור הבא
};

module.exports = authenticateUser; // ייצוא הפונקציה לשימוש ב־app.js
