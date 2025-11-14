const axios = require('axios');
require('dotenv').config();

const HF_API_KEY = process.env.HF_API_KEY || '';

async function callTextModel(prompt) {
  if (!HF_API_KEY) {
    // mocked behavior
    return { diagnosis: "Likely viral fever (mock)", confidence: 0.6, advice: "Rest, hydrate, refer if high fever" };
  }
  const resp = await axios.post(
    'https://api-inference.huggingface.co/models/gpt2', // example model; replace with a medical model
    { inputs: prompt, options: { wait_for_model: true } },
    { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
  );
  return { raw: resp.data };
}

async function callVisionModel(imageBase64) {
  if (!HF_API_KEY) {
    return { analysis: "No signs of severe infection (mock)", confidence: 0.75 };
  }
  const resp = await axios.post(
    'https://api-inference.huggingface.co/models/your-vision-model',
    { inputs: imageBase64 },
    { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
  );
  return { raw: resp.data };
}

module.exports = { callTextModel, callVisionModel };
