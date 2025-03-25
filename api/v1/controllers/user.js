const User = require('../models/user'); // טוען את מודל המשתמשים ממסד הנתונים
const bcrypt = require('bcrypt'); // לצורך הצפנת סיסמאות
const jwt = require('jsonwebtoken'); // ליצירת טוקן JWT
require('dotenv').config(); // טוען משתני סביבה מ־.env

// הרשמה עם הצפנת סיסמה
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body; // שליפת פרטי משתמש מהטופס

    const existingUser = await User.findOne({ email }); // בדיקה אם האימייל כבר קיים במסד
    if (existingUser) return res.status(400).send('Email already registered'); // שגיאה אם קיים

    const hashedPassword = await bcrypt.hash(password, 10); // הצפנת סיסמה

    const newUser = new User({ username, email, password: hashedPassword }); // יצירת משתמש חדש
    await newUser.save(); // שמירה במסד הנתונים

    res.redirect('/login'); // הפניה לעמוד התחברות אחרי הרשמה
  } catch (err) {
    console.error('Registration error:', err.message); // הדפסת שגיאה
    res.status(500).send('Registration failed'); // שגיאה למשתמש
  }
};

// התחברות עם בדיקת סיסמה ויצירת טוקן JWT
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // שליפת אימייל וסיסמה מהטופס

    const user = await User.findOne({ email }); // שליפת המשתמש לפי אימייל
    if (!user) return res.status(401).render('login', { error: 'Invalid Email' }); // אם לא נמצא – שגיאה

    const isMatch = await bcrypt.compare(password, user.password); // בדיקת סיסמה
    if (!isMatch) return res.status(401).render('login', { error: 'Invalid Password' }); // סיסמה לא נכונה

    const token = jwt.sign( // יצירת טוקן חתום
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.cookie('token', token, { httpOnly: true }).redirect('/product');

  } catch (err) {
    console.error('Login error:', err.message); // הדפסת שגיאה
    res.status(500).send('Login failed'); // שגיאה למשתמש
  }
};

// שליפת משתמש לפי ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // שליפת משתמש לפי מזהה
    if (!user) return res.status(404).send('User not found'); // אם לא נמצא – שגיאה
    res.render('user', { user }); // הצגת פרטי המשתמש בדף HTML
  } catch (err) {
    console.error('Fetch user error:', err.message); // הדפסת שגיאה
    res.status(500).send('Failed to get user'); // שגיאה למשתמש
  }
};

// שליפת כל המשתמשים
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // שליפת כל המשתמשים
    res.render('users', {
      title: 'All Users',
      users
    }); // הצגת רשימת המשתמשים
  } catch (err) {
    console.error('Fetch users error:', err.message); // הדפסת שגיאה
    res.status(500).send('Failed to get users'); // שגיאה למשתמש
  }
};

// עדכון משתמש לפי מזהה
const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // עדכון נתונים
    if (!updated) return res.status(404).send('User not found'); // אם לא נמצא – שגיאה
    res.redirect('/users'); // הפניה חזרה לעמוד המשתמשים
  } catch (err) {
    console.error('Update error:', err.message); // הדפסת שגיאה
    res.status(500).send('Failed to update user'); // שגיאה למשתמש
  }
};

// מחיקת משתמש
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id); // מחיקת משתמש
    if (!deleted) return res.status(404).send('User not found'); // אם לא נמצא – שגיאה
    res.redirect('/users'); // הפניה לעמוד המשתמשים
  } catch (err) {
    console.error('Delete error:', err.message); // הדפסת שגיאה
    res.status(500).send('Failed to delete user'); // שגיאה למשתמש
  }
};

module.exports = {
  registerUser, // ייצוא פונקציית הרשמה
  loginUser, // ייצוא פונקציית התחברות
  getUserById, // ייצוא שליפת משתמש לפי מזהה
  getAllUsers, // ייצוא שליפת כל המשתמשים
  updateUser, // ייצוא עדכון משתמש
  deleteUser // ייצוא מחיקת משתמש
};
