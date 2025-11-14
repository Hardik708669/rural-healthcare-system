const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/auth');
const { callTextModel, callVisionModel } = require('../utils/aiClient');

// symptom-check: receives questions or plain text; returns suggestions
router.post('/symptom-check', authenticate, async (req, res) => {
  try {
    const { text } = req.body;
    // build prompt
    const prompt = `Patient symptoms: ${text}\nPlease provide: likely diagnoses (few), triage level (low/medium/high), suggested next steps.`;
    const result = await callTextModel(prompt);
    // keep AI output in a safe wrapper and include disclaimer
    res.json({ ai: result, disclaimer: "AI is assistive only — escalate if red flags." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'AI error' });
  }
});

// image analysis: upload base64 or multipart; returns analysis
router.post('/image-analysis', authenticate, async (req, res) => {
  try {
    const { imageBase64 } = req.body; // client should send base64 string
    if (!imageBase64) return res.status(400).json({ message: 'No image' });
    const result = await callVisionModel(imageBase64);
    res.json({ ai: result, disclaimer: "AI is assistive only." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Vision AI error' });
  }
});

module.exports = router;
