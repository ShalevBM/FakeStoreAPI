// 📄 controllers/category.js

const Category = require('../models/category'); // טעינת מודל הקטגוריה

// ➕ יצירת קטגוריה חדשה
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body; // שליפת נתונים מהבקשה

    const exists = await Category.findOne({ name }); // בדיקה אם הקטגוריה קיימת
    if (exists) return res.status(400).send('Category already exists');

    const newCategory = new Category({ name, description });
    await newCategory.save(); // שמירה במסד הנתונים

    res.redirect('/categories/view/all'); // הפנייה חזרה לעמוד הקטגוריות
  } catch (err) {
    console.error('Error creating category:', err.message);
    res.status(500).send('Failed to create category');
  }
};

// 👀 שליפת כל הקטגוריות (HTML)
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find(); // שליפת כל הקטגוריות
    res.json(categories); // החזרת הנתונים כ־JSON
  } catch (err) {
    console.error('Error fetching categories:', err.message);
    res.status(500).send('Failed to fetch categories');
  }
};

// ✏️ עדכון קטגוריה קיימת לפי מזהה
const updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).send('Category not found');

    res.redirect('/categories/view/all');
  } catch (err) {
    console.error('Error updating category:', err.message);
    res.status(500).send('Failed to update category');
  }
};

// ❌ מחיקת קטגוריה לפי מזהה
const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send('Category not found');

    res.redirect('/categories/view/all');
  } catch (err) {
    console.error('Error deleting category:', err.message);
    res.status(500).send('Failed to delete category');
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
};
