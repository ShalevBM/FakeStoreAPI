const app = require('./app'); 
// טוען את כל האפליקציה מהקובץ app.js (כולל ראוטים, מנוע תצוגה, חיבור למסד נתונים ועוד)

const PORT = process.env.PORT || 5000; 
// מגדיר את הפורט שעליו ירוץ השרת. 
// אם יש PORT בקובץ .env → ישתמש בו. אם לא – ברירת מחדל: 5000

app.listen(PORT, () => {
  // מפעיל את השרת ומאזין לבקשות בכתובת http://localhost:PORT
  console.log(`Server is running on port ${PORT} 🚀`);
  // הדפסת הודעה ל־console כאשר השרת עלה בהצלחה
});
