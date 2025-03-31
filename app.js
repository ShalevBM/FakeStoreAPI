const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const path = require('path');
const Handlebars = require('handlebars');
const jwt = require('jsonwebtoken'); // ➤ זה היה חסר

dotenv.config();
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const cartItemCount = require('./api/v1/middlewares/cartCount');
app.use(cartItemCount);


// Middleware שמכניס את המשתמש ל־res.locals
app.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.locals.user = decoded;
    } catch (err) {
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }
  next();
});

// Handlebars helpers
Handlebars.registerHelper('multiply', function (a, b) {
  return a * b;
});

// Handlebars
app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'api', 'v1', 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'api', 'v1', 'views', 'partials'),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'api', 'v1', 'views'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/product', require('./api/v1/routes/product'));
app.use('/user', require('./api/v1/routes/user'));
app.use('/cart', require('./api/v1/routes/cart'));
app.use('/order', require('./api/v1/routes/order'));
app.use('/category', require('./api/v1/routes/category'));
app.use('/payment', require('./api/v1/routes/payment'));


// View Routes
const viewRoutes = require('./api/v1/routes/view');
app.use('/', viewRoutes);

module.exports = app;
