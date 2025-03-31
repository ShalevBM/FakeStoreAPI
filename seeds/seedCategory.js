require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../api/v1/models/category');


// רשימת הקטגוריות להזרקה
const categories = [
  { name: 'Shirts', description: 'Shirts Collection' },
  { name: 'Swimwear', description: 'Swimwear Collection' },
  { name: 'Jeans', description: 'Jeans Collection' },
  { name: 'Hats', description: 'Hats Collection' },
  { name: 'Shoes', description: 'Shoes Collection' }
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    await Category.deleteMany(); // מנקה קודם קטגוריות ישנות
    await Category.insertMany(categories); // מוסיף את הקטגוריות

    console.log('🎯 Categories seeded successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding categories:', err.message);
    process.exit(1);
  }
};

seedCategories();
