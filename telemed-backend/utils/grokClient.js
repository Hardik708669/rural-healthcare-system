const axios = require("axios");
require("dotenv").config();

const XAI_API_KEY = process.env.XAI_API_KEY;
const BASE_URL = process.env.XAI_API_BASE || "https://api.grok.xai.com/v1";

// ======================
// TEXT COMPLETION (MAIN)
// ======================
async function chatCompletion({ prompt, model = "grok-beta", max_tokens = 500 }) {
  try {
    console.log("🔥 Sending prompt to Grok:", prompt);

    const response = await axios.post(
      `${BASE_URL}/chat/completions`,
      {
        model,
        messages: [{ role: "user", content: prompt }],
        max_tokens
      },
      {
        headers: {
          Authorization: `Bearer ${XAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("🔥 Grok response:", response.data);

    const content = response.data.choices?.[0]?.message?.content || "No response";
    return { text: content };

  } catch (error) {
    console.error("❌ GROK ERROR DETAILS:", error.response?.data || error.message);
    return { error: "grok_chat_error" };
  }
}

// ======================
// IMAGE ANALYSIS
// ======================
async function analyzeImage({ prompt }) {
  return chatCompletion({ prompt, model: "grok-beta" });
}

// ======================
// EXPORTS (VERY IMPORTANT)
// ======================
module.exports = {
  chatCompletion,
  analyzeImage
};
