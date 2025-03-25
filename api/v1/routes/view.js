const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Welcome to Chill & Chic' });
});

// 🔐 דף הרשמה
router.get('/register', (req, res) => {
  res.render('register'); // views/register.hbs
});

// 🔑 דף התחברות
router.get('/login', (req, res) => {
  res.render('login'); // views/login.hbs
});

// 👥 דף הצגת כל המשתמשים
router.get('/users', async (req, res) => {
  try {
    const User = require('../models/user');
    const users = await User.find();
    res.render('users', { title: 'All Users', users }); // views/users.hbs
  } catch (err) {
    console.error('Render users error:', err.message);
    res.status(500).send('Failed to load users page');
  }
});


module.exports = router;
