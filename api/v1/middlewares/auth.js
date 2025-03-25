const jwt = require('jsonwebtoken'); // טוען את ספריית jwt לאימות טוקנים
require('dotenv').config(); // טוען משתני סביבה מקובץ .env


// פונקציית אמצע (middleware) לאימות טוקן של משתמש
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // שליפת header של Authorization מהבקשה
  
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).render('error', { message: '🔐 No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // טוקן שגוי – שלח דף שגיאה
      return res.status(403).render('error', { message: '❌ Invalid token' });
    }

    req.user = user; // שמירת המידע של המשתמש בבקשה להמשך השימוש
    next(); // המשך למידלוור הבא / ראוט
  });
};

module.exports = authenticateToken; // ייצוא הפונקציה החוצה לשימוש בכל הנתיבים
