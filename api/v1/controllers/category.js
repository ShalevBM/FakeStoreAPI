const Category = require('../models/category'); // טוען את המודל של קטגוריות ממסד הנתונים

// יצירת קטגוריה חדשה
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body; // שליפת שם ותיאור הקטגוריה מהבקשה

    const exists = await Category.findOne({ name }); // בדיקה אם קטגוריה עם אותו שם כבר קיימת
    if (exists) return res.status(400).send('Category already exists'); // אם קיימת – שלח הודעת שגיאה

    const newCategory = new Category({ name, description }); // יצירת אובייקט קטגוריה חדש
    await newCategory.save(); // שמירה במסד
    res.redirect('/categories'); // הפניה חזרה לעמוד הקטגוריות
  } catch (err) {
    console.error('Error creating category:', err.message); // הדפסת שגיאה ל־console
    res.status(500).send('Failed to create category'); // החזרת שגיאה למשתמש
  }
};

// צפייה בכל הקטגוריות (HTML בלבד)
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find(); // שליפת כל הקטגוריות
    res.render('categories', {
      title: 'All Categories', // כותרת לעמוד
      categories // שליחת הקטגוריות לתצוגה
    });
  } catch (err) {
    console.error('Error fetching categories:', err.message); // הדפסת שגיאה
    res.status(500).send('Failed to fetch categories'); // שגיאה למשתמש
  }
};

// עדכון קטגוריה קיימת לפי מזהה
const updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true }); // עדכון לפי ID
    if (!updated) return res.status(404).send('Category not found'); // אם לא נמצא – שגיאה
    res.redirect('/categories'); // הפניה חזרה לעמוד הקטגוריות
  } catch (err) {
    console.error('Error updating category:', err.message); // הדפסת שגיאה
    res.status(500).send('Failed to update category'); // שגיאה למשתמש
  }
};

// מחיקת קטגוריה לפי מזהה
const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id); // מחיקה לפי ID
    if (!deleted) return res.status(404).send('Category not found'); // אם לא נמצא – שגיאה
    res.redirect('/categories'); // הפניה לעמוד הקטגוריות
  } catch (err) {
    console.error('Error deleting category:', err.message); // הדפסת שגיאה
    res.status(500).send('Failed to delete category'); // שגיאה למשתמש
  }
};

module.exports = {
  createCategory, // ייצוא פונקציית יצירת קטגוריה
  getAllCategories, // ייצוא פונקציית שליפת כל הקטגוריות
  updateCategory, // ייצוא פונקציית עדכון קטגוריה
  deleteCategory // ייצוא פונקציית מחיקת קטגוריה
};
