// 📄 routes/user.js

const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser
} = require('../controllers/user');

// ➕ הרשמה
router.post('/register', registerUser);

router.get('/logout', (req, res) => {
  res.clearCookie('token'); // מוחק את ה־Token
  res.redirect('/login'); // מחזיר לדף ההתחברות
});


// 🔐 התחברות
router.post('/login', loginUser);

// 👥 שליפת כל המשתמשים
router.get('/', getAllUsers);

// 👤 שליפת משתמש לפי מזהה
router.get('/:id', getUserById);

// ✏️ עדכון משתמש
router.put('/:id', updateUser);

// ❌ מחיקת משתמש
router.delete('/:id', deleteUser);

module.exports = router;
