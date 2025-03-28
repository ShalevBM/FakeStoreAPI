const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const path = require('path');





dotenv.config();

const app = express();

// Middleware לקריאת נתוני טופס ו־JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// קביעת Handlebars
app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'api', 'v1', 'views', 'layouts'),   // ← תיקון כאן
  partialsDir: path.join(__dirname, 'api', 'v1', 'views', 'partials')  // ← תיקון כאן
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'api', 'v1', 'views')); // תיקייה של כל ה־views

// קבצים סטטיים
app.use(express.static(path.join(__dirname, 'public')));

// חיבור ל־MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));
  const cookieParser = require('cookie-parser');
  app.use(cookieParser());
  
// ראוטים API
app.use('/api/v1/product', require('./api/v1/routes/product'));
app.use('/user', require('./api/v1/routes/user'));
app.use('/cart', require('./api/v1/routes/cart'));
app.use('/api/v1/order', require('./api/v1/routes/order'));
app.use('/api/v1/categorie', require('./api/v1/routes/category'));
app.use('/payment', require('./api/v1/routes/payment'));

// ראוטים לתצוגות
app.use('/', require('./api/v1/routes/view'));
const viewRoutes = require('./api/v1/routes/view');
app.use('/', viewRoutes);



// ייצוא
module.exports = app;
