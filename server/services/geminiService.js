// services/geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateMemeCaption(tags) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Generate a funny cyberpunk-themed caption for a meme with these tags: ${tags.join(', ')}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API failed:", error);
    // Fallback captions
    const fallbacks = [
      "NEON DREAMS AND MEME SCHEMES",
      "HACK THE PLANET, HODL THE MEME",
      "01001000 01001111 01000100 01001100", // HODL in binary
      "YOUR CREDITS ARE LOW, BUT YOUR MEMES ARE HIGH"
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
}