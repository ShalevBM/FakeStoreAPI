// 📄 controllers/user.js

const User = require('../models/user'); // טעינת מודל המשתמשים
const bcrypt = require('bcrypt'); // להצפנת סיסמאות
const jwt = require('jsonwebtoken'); // יצירת JWT Token
require('dotenv').config(); // טעינת משתני סביבה

// ➕ הרשמה
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('Email already registered');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.redirect('/login');
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).send('Registration failed');
  }
};

// 🔐 התחברות
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).render('login', { error: 'Invalid Email' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).render('login', { error: 'Invalid Password' });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.cookie('token', token, { httpOnly: true }).redirect('/product');
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).send('Login failed');
  }
};

// 👤 שליפת משתמש לפי מזהה
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');

    res.render('user', { user });
  } catch (err) {
    console.error('Fetch user error:', err.message);
    res.status(500).send('Failed to get user');
  }
};

// 👥 שליפת כל המשתמשים
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render('user', {
      title: 'All Users',
      users
    });
  } catch (err) {
    console.error('Fetch users error:', err.message);
    res.status(500).send('Failed to get users');
  }
};

// ✏️ עדכון משתמש
const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).send('User not found');

    res.redirect('/users');
  } catch (err) {
    console.error('Update error:', err.message);
    res.status(500).send('Failed to update user');
  }
};

// ❌ מחיקת משתמש
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send('User not found');

    res.redirect('/users');
  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(500).send('Failed to delete user');
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser
};
