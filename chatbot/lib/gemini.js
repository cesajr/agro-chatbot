const { GoogleGenerativeAI } = require("@google/generative-ai");
const { API_KEY } = require("./config");

const googleAI = new GoogleGenerativeAI(API_KEY);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};

const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",
  geminiConfig,
});

const generateText = async (prompt) => {
  try {
    const result = await geminiModel.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.log("response error", error);
    throw error; // Lança o erro para ser tratado na chamada
  }
};

module.exports = { generateText };