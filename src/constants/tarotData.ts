
export interface TarotCard {
  number: number;
  name: string;
  description: string;
  image: string;
}

export const TAROT_DATA: Record<number, TarotCard> = {
  1: {
    number: 1,
    name: "הקוסם (The Magician)",
    description: "אנרגיה של התחלות חדשות, כוח רצון, יצירתיות ויכולת להפוך רעיונות למציאות. הקוסם מסמל את הפוטנציאל האינסופי שטמון בך.",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar01.jpg"
  },
  2: {
    number: 2,
    name: "הכוהנת הגדולה (The High Priestess)",
    description: "אינטואיציה, סודות, חוכמה פנימית וחיבור לעולם הרוח. היא מסמלת את היכולת להקשיב לקול הפנימי ולראות מעבר למובן מאליו.",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar02.jpg"
  },
  3: {
    number: 3,
    name: "הקיסרית (The Empress)",
    description: "שפע, פריון, יצירתיות ואמהות. היא מסמלת את החיבור לטבע, ליופי ולטיפוח של פרויקטים ואנשים.",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar03.jpg"
  },
  4: {
    number: 4,
    name: "הקיסר (The Emperor)",
    description: "סמכות, מבנה, יציבות ושליטה. הוא מסמל את היכולת להוביל, לארגן וליצור סדר בעולם.",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar04.jpg"
  },
  5: {
    number: 5,
    name: "הכוהן הגדול (The Hierophant)",
    description: "מסורת, למידה, רוחניות ומערכות אמונה. הוא מסמל את החיבור לידע עתיק ולמוסדות חברתיים או דתיים.",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar05.jpg"
  },
  6: {
    number: 6,
    name: "האוהבים (The Lovers)",
    description: "בחירה, מערכות יחסים, הרמוניה וערכים. הקלף מסמל את הצורך לקבל החלטות מהלב ולמצוא איזון בין ניגודים.",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar06.jpg"
  },
  7: {
    number: 7,
    name: "המרכבה (The Chariot)",
    description: "נחישות, כוח רצון, ניצחון והתקדמות. המרכבה מסמלת מנוע עוצמתי של עשייה, הצבת מטרות וכיבוש יעדים. זוהי אנרגיה של תנועה מתמדת שלא אוהבת לעמוד במקום, ושאיפה להוביל תהליכים וצוותים קדימה לעבר הצלחה מוחשית.",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar07.jpg"
  },
  8: {
    number: 8,
    name: "הצדק (Justice)",
    description: "הגינות, אמת, סיבה ותוצאה. הקלף מסמל חשיבה אנליטית, חוש צדק מפותח וצורך בסדר וארגון. הוא מזכיר לנו לפעול ביושרה מוחלטת ולהבין שכל פעולה גוררת תגובה קארמית מדויקת ביקום.",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar08.jpg"
  },
  9: {
    number: 9,
    name: "הנזיר (The Hermit)",
    description: "התבוננות פנימית, בדידות מבורכת, חיפוש אחר האמת והדרכה רוחנית. הנזיר מסמל את הצורך לסגת מהעולם כדי למצוא תשובות בפנים.",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar09.jpg"
  },
  10: {
    number: 10,
    name: "גלגל המזל (Wheel of Fortune)",
    description: "שינוי, גורל, מחזוריות והזדמנויות. הקלף מזכיר לנו שהחיים הם גלגל והכל משתנה ללא הרף.",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar10.jpg"
  },
  11: {
    number: 11,
    name: "כוח (Strength)",
    description: "אומץ, חמלה, כוח פנימי ושליטה ביצרים. הקלף מסמל את היכולת להתמודד עם קשיים בעדינות ובנחישות.",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar11.jpg"
  },
  12: {
    number: 12,
    name: "התלוי (The Hanged Man)",
    description: "הקרבה, פרספקטיבה חדשה, המתנה ושחרור. הקלף מסמל עומק רוחני עצום, חמלה, וראייה ייחודית מחוץ לקופסה. הוא מצביע על יכולת נתינה יוצאת דופן ועל הצורך לעצור לעיתים כדי לראות את המציאות מזווית עמוקה ורוחנית יותר.",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar12.jpg"
  },
  13: {
    number: 13,
    name: "מוות (Death)",
    description: "סיום, טרנספורמציה, התחדשות ושחרור מהישן. מוות בטארות מסמל את סיומו של פרק אחד ותחילתו של פרק חדש וטוב יותר.",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar13.jpg"
  },
  14: {
    number: 14,
    name: "מתינות (Temperance)",
    description: "איזון, סבלנות, מיזוג וריפוי. הקלף מסמל את הצורך למצוא את שביל הזהב ולשלב בין כוחות מנוגדים.",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar14.jpg"
  },
  15: {
    number: 15,
    name: "השטן (The Devil)",
    description: "התמכרות, כבילות, חומריות ופיתוי. השטן מסמל את המקומות שבהם אנחנו מרגישים לכודים ומזכיר לנו שיש לנו את הכוח להשתחרר.",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar15.jpg"
  },
  16: {
    number: 16,
    name: "המגדל (The Tower)",
    description: "שינוי פתאומי, התמוטטות של מבנים ישנים, הארה ושחרור. המגדל מסמל רגעים של משבר שמובילים לצמיחה אמיתית.",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar16.jpg"
  },
  17: {
    number: 17,
    name: "הכוכב (The Star)",
    description: "תקווה, השראה, ריפוי והתחדשות. הכוכב הוא קלף של אופטימיות וחיבור למקור האלוהי.",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar17.jpg"
  },
  18: {
    number: 18,
    name: "הירח (The Moon)",
    description: "אשליה, פחד, אינטואיציה ותת-מודע. הירח מסמל את המסע אל תוך הלא נודע ואת הצורך להתמודד עם הצללים.",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar18.jpg"
  },
  19: {
    number: 19,
    name: "השמש (The Sun)",
    description: "הצלחה, שמחה, חיוניות ובהירות. השמש מסמלת אישיות כריזמטית, מאירה וחמה, בעלת נוכחות שאי אפשר להתעלם ממנה. זוהי אנרגיה של מנהיגות טבעית ואופטימיות, המיועדת להאיר על אחרים ולשמח אותם מתוך שפע פנימי.",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar19.jpg"
  },
  20: {
    number: 20,
    name: "יום הדין (Judgement)",
    description: "התעוררות, קריאה פנימית, סליחה והתחדשות. הקלף מסמל רגע של הבנה עמוקה ושינוי כיוון בחיים.",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar20.jpg"
  },
  21: {
    number: 21,
    name: "העולם (The World)",
    description: "השלמה, הצלחה, נסיעות ואיחוד. העולם מסמל את סיומו המוצלח של מסע והגעה ליעד.",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar21.jpg"
  },
  22: {
    number: 22,
    name: "השוטה (The Fool)",
    description: "תמימות, הרפתקה, התחלות חדשות ואמון ביקום. השוטה מסמל חדשנות, צורך בחופש תנועה מוחלט, ויכולת מופלאה להתחיל דברים מאפס ללא פחד. הוא מייצג את הצעד הראשון אל הלא נודע בלב פתוח ובאמונה מלאה בדרך.",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar00.jpg"
  }
};
