const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const generateCaptionAndVibe = async (tags = []) => {
  try {
    const tagText = tags.length ? tags.join(', ') : 'funny, crypto';

    const captionPrompt = `Generate a funny caption for a meme with tags: ${tagText}`;
    const vibePrompt = `Describe the vibe of a meme with tags: ${tagText}`;

    const [captionResult, vibeResult] = await Promise.all([
      model.generateContent(captionPrompt),
      model.generateContent(vibePrompt),
    ]);

    const captionText = await captionResult.response.text();
    const vibeText = await vibeResult.response.text();

    return {
      caption: captionText.trim(),
      vibe: vibeText.trim(),
    };
  } catch (err) {
    console.error('Gemini API failed:', err);
    return {
      caption: 'YOLO to the moon!',
      vibe: 'Neon Crypto Chaos',
    };
  }
};

module.exports = { generateCaptionAndVibe };
