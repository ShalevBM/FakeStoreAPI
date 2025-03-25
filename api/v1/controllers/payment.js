const Order = require('../models/order'); // טוען את מודל ההזמנות מהמסד
const Cart = require('../models/cart'); // טוען את מודל העגלה מהמסד
const Product = require('../models/product'); // טוען את מודל המוצרים לצורך חישוב מחירים

// יצירת הזמנה חדשה מהעגלה
const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId; // מזהה המשתמש המחובר מתוך הטוקן

    const cart = await Cart.findOne({ userId }).populate('items.productId'); // שליפת עגלת המשתמש כולל פרטי המוצרים
    if (!cart || cart.items.length === 0) {
      return res.status(400).send('Cart is empty'); // אם העגלה ריקה – החזר שגיאה
    }

    let totalAmount = 0; // משתנה לחישוב הסכום הכולל
    for (let item of cart.items) {
      const product = item.productId;
      const quantity = item.quantity;
      totalAmount += product.price * quantity; // חישוב מחיר לכל מוצר והוספה לסכום הכולל
    }

    const newOrder = new Order({
      userId, // מזהה המשתמש בהזמנה
      items: cart.items, // פרטי המוצרים בהזמנה
      totalAmount, // סכום כולל
      isPaid: false // ההזמנה עדיין לא שולמה
    });

    await newOrder.save(); // שמירת ההזמנה במסד
    await Cart.findOneAndDelete({ userId }); // מחיקת העגלה לאחר ביצוע ההזמנה

    res.redirect('/orders'); // הפניה לעמוד ההזמנות
  } catch (err) {
    console.error('❌ Error creating order:', err.message); // הדפסת שגיאה ל־console
    res.status(500).send('Failed to create order'); // שגיאה למשתמש
  }
};

// שליפת כל ההזמנות של משתמש מחובר
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId; // מזהה המשתמש
    const orders = await Order.find({ userId }).populate('items.productId'); // שליפת ההזמנות כולל פרטי המוצרים

    res.render('orders', {
      title: 'My Orders', // כותרת לעמוד
      orders // שליחת ההזמנות לתצוגה
    });
  } catch (err) {
    console.error('❌ Error fetching orders:', err.message); // הדפסת שגיאה
    res.status(500).send('Failed to fetch orders'); // שגיאה למשתמש
  }
};

// תשלום על הזמנה קיימת
const payForOrder = async (req, res) => {
  try {
    const { orderId } = req.params; // שליפת מזהה ההזמנה מהכתובת

    const order = await Order.findById(orderId); // שליפת ההזמנה ממסד הנתונים
    if (!order) return res.status(404).send('Order not found'); // אם לא קיימת – החזר שגיאה

    if (order.isPaid) return res.status(400).send('Order already paid'); // אם כבר שולמה – שגיאה

    order.isPaid = true; // סימון כהוזמנה ששולמה
    await order.save(); // שמירת השינוי במסד

    res.redirect('/orders'); // הפניה חזרה לעמוד ההזמנות
  } catch (err) {
    console.error('❌ Error processing payment:', err.message); // הדפסת שגיאה
    res.status(500).send('Payment failed'); // שגיאה למשתמש
  }
};

module.exports = {
  createOrder, // ייצוא פונקציית יצירת הזמנה
  getUserOrders, // ייצוא פונקציית שליפת ההזמנות
  payForOrder // ייצוא פונקציית תשלום עבור הזמנה
};
