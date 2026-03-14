import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function analyzeText(text: string, name: string) {
  if (!text) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        You are a professional numerologist and destiny matrix expert.
        Analyze the following text provided by the user named ${name}.
        The text might be a personal story, a dream, or a description of their life.
        Provide a short, insightful analysis (3-4 sentences) in Hebrew that connects their story to their "Unique Code" (קוד ייחודי).
        
        User Text:
        ${text}
      `,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "מצטערים, חלה שגיאה בניתוח הטקסט. אנא נסי שוב מאוחר יותר.";
  }
}
