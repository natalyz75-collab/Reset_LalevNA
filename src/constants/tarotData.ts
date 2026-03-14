export interface TarotCard {
  id: number;
  name: string;
  description: string;
  meaning: string;
}

export const TAROT_DATA: Record<number, TarotCard> = {
  1: { id: 1, name: "הקוסם", description: "כוח הרצון והיכולת להגשים", meaning: "יש לך את כל הכלים להצליח." },
  2: { id: 2, name: "הכוהנת הגדולה", description: "אינטואיציה וסודות", meaning: "הקשיבי לקול הפנימי שלך." },
  3: { id: 3, name: "הקיסרית", description: "שפע ויצירתיות", meaning: "זמן של צמיחה ופריון." },
  4: { id: 4, name: "הקיסר", description: "סמכות ומבנה", meaning: "השליטי סדר ומשמעת." },
  5: { id: 5, name: "הכוהן", description: "מסורת וערכים", meaning: "חפשי הדרכה רוחנית." },
  6: { id: 6, name: "האוהבים", description: "בחירה וזוגיות", meaning: "החלטה חשובה מהלב." },
  7: { id: 7, name: "המרכבה", description: "ניצחון ושליטה", meaning: "התקדמי בנחישות לעבר המטרה." },
  8: { id: 8, name: "הכוח", description: "אומץ וחמלה", meaning: "השתמשי בכוח רך כדי לנצח." },
  9: { id: 9, name: "הנזיר", description: "התבוננות פנימית", meaning: "זמן להתבודדות ומחשבה." },
  10: { id: 10, name: "גלגל המזל", description: "שינוי וגורל", meaning: "הזדמנויות חדשות בפתח." },
  11: { id: 11, name: "צדק", description: "איזון ואמת", meaning: "פעלי ביושר ובהגינות." },
  12: { id: 12, name: "התלוי", description: "הקרבה ופרספקטיבה", meaning: "ראי את הדברים מזווית אחרת." },
  13: { id: 13, name: "מוות", description: "סיום והתחלה חדשה", meaning: "שחררי את הישן למען החדש." },
  14: { id: 14, name: "מתינות", description: "איזון ומיזוג", meaning: "מצאי את שביל הזהב." },
  15: { id: 15, name: "השטן", description: "תשוקה וכבילות", meaning: "היזהרי מהתמכרויות ופחדים." },
  16: { id: 16, name: "המגדל", description: "שינוי פתאומי", meaning: "התמוטטות של מבנים ישנים." },
  17: { id: 17, name: "הכוכב", description: "תקווה והשראה", meaning: "האמיני בעתיד טוב יותר." },
  18: { id: 18, name: "הירח", description: "אשליה וחלומות", meaning: "דברים אינם כפי שהם נראים." },
  19: { id: 19, name: "השמש", description: "שמחה והצלחה", meaning: "אור וחיוביות ממלאים אותך." },
  20: { id: 20, name: "יום הדין", description: "התעוררות וקריאה", meaning: "זמן לחשבון נפש והתחדשות." },
  21: { id: 21, name: "העולם", description: "השלמה ומחזוריות", meaning: "הגעת ליעד, חגגי את ההישג." },
  22: { id: 22, name: "השוטה", description: "התחלה חדשה ותמימות", meaning: "צעדי אל הלא נודע באמונה." }
};
