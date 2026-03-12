import { GoogleGenAI } from "@google/genai";
import { MatrixData } from "../utils/matrixUtils";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getMatrixInterpretation(data: MatrixData) {
  const prompt = `
    אתה מומחה לנומרולוגיה ושיטת "מטריצת הגורל" (Matrix of Destiny).
    נתח את המטריצה הבאה עבור תאריך לידה: ${data.day}/${data.month}/${data.year}.
    
    הערכים המחושבים (לפי 22 הארקנות):
    - נקודה A (משמאל - תכונות בסיס): ${data.a}
    - נקודה B (למעלה - קשר עם הרוח): ${data.b}
    - נקודה C (מימין - פוטנציאל כלכלי/מימוש): ${data.c}
    - נקודה D (למטה - שיעור קרמתי): ${data.d}
    - נקודה E (מרכז - המהות הפנימית): ${data.e}
    
    אנא ספק ניתוח קצר, מעצים ומעניין בעברית עבור כל אחת מהנקודות הללו.
    השתמש בשפה מודרנית, רוחנית ומזמינה. 
    הניתוח מיועד לדף נחיטה אינטראקטיבי.
    
    החזר את התשובה במבנה JSON הבא:
    {
      "summary": "סיכום כללי קצר",
      "points": {
        "a": "תיאור נקודה A",
        "b": "תיאור נקודה B",
        "c": "תיאור נקודה C",
        "d": "תיאור נקודה D",
        "e": "תיאור נקודה E"
      }
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", // Using a supported fast model
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text);
  } catch (error) {
    console.error("Error getting interpretation:", error);
    return null;
  }
}
