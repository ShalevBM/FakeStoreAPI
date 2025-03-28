const Cart = require('../models/cart'); // טוען את המודל של עגלת הקניות מהמסד

// ➕ הוספת מוצר לעגלה
const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId; // מזהה את המשתמש המחובר מתוך הטוקן
    const { productId, quantity } = req.body; // שולף את מזהה המוצר והכמות מתוך הבקשה

    let cart = await cart.findOne({ userId }); // בודק אם קיימת עגלה למשתמש

    if (Cart) {
      // אם העגלה קיימת – בדוק אם המוצר כבר בעגלה
      const item = cart.items.find(i => i.productId.toString() === productId);
      if (item) {
        item.quantity += quantity; // אם קיים – עדכן כמות
      } else {
        cart.items.push({ productId, quantity }); // אם לא קיים – הוסף מוצר חדש לעגלה
      }
    } else {
      // אם אין עגלה – צור חדשה
      cart = new Cart({
        userId,
        items: [{ productId, quantity }]
      });
    }

    await cart.save(); // שמור את השינויים במסד הנתונים
    res.redirect('/cart'); // העבר את המשתמש לעמוד העגלה
  } catch (err) {
    console.error('Error adding to cart:', err.message); // הדפסת שגיאה ל־console
    res.status(500).send('Failed to add to cart'); // החזרת שגיאה למשתמש
  }
};

// 👀 צפייה בעגלה (HTML בלבד)
const getCart = async (req, res) => {
  try {
    const userId = req.user.userId; // מזהה את המשתמש המחובר
    const cart = await Cart.findOne({ userId }).populate('items.productId'); // שליפת העגלה כולל פרטי המוצרים

    if (!cart || cart.items.length === 0) {
      // אם אין עגלה או שהיא ריקה – הצג הודעה מתאימה
      return res.render('cart', {
        title: 'My Cart', // כותרת לעמוד
        items: [], // רשימת מוצרים ריקה
        totalPrice: 0, // סכום כולל אפס
        message: '🛒 Your cart is empty!' // הודעת עגלה ריקה
      });
    }

    const totalPrice = cart.items.reduce((sum, i) => sum + i.productId.price * i.quantity, 0); // חישוב סכום כולל

    res.render('cart', {
      title: 'My Cart', // כותרת לעמוד
      items: cart.items, // מוצרים בעגלה
      totalPrice // סכום כולל
    });
  } catch (err) {
    console.error('Error fetching cart:', err.message); // הדפסת שגיאה ל־console
    res.status(500).send('Failed to fetch cart'); // החזרת שגיאה למשתמש
  }
};

// ❌ מחיקת מוצר מסוים
const removeItem = async (req, res) => {
  try {
    const userId = req.user.userId; // מזהה את המשתמש
    const { productId } = req.params; // מזהה את המוצר למחיקה מהכתובת

    const cart = await Cart.findOne({ userId }); // שליפת עגלת המשתמש
    if (!cart) return res.status(404).send('Cart not found'); // אם אין עגלה – החזר שגיאה

    cart.items = cart.items.filter(i => i.productId.toString() !== productId); // הסרת המוצר מהרשימה
    await cart.save(); // שמירת שינויים במסד

    res.redirect('/cart'); // הפניה חזרה לעמוד העגלה
  } catch (err) {
    console.error('Error removing item:', err.message); // הדפסת שגיאה
    res.status(500).send('Failed to remove item'); // שגיאה למשתמש
  }
};

// 🗑️ ריקון עגלה
const clearCart = async (req, res) => {
  try {
    const userId = req.user.userId; // מזהה את המשתמש
    await Cart.findOneAndDelete({ userId }); // מחיקת עגלה שלמה מהמסד
    res.redirect('/cart'); // הפניה חזרה לעמוד העגלה
  } catch (err) {
    console.error('Error clearing cart:', err.message); // הדפסת שגיאה
    res.status(500).send('Failed to clear cart'); // החזרת שגיאה למשתמש
  }
};

module.exports = { addToCart, getCart, removeItem, clearCart }; // ייצוא כל הפונקציות לשימוש ב־routes
