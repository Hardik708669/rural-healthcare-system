const pool = require('../config/db');
const grokClient = require('../utils/grokClient');

exports.reportSymptoms = async (req, res) => {
  try {
    const patient_id = req.user.id;
    const { symptoms, severity } = req.body;
    // 1) Save the raw symptom report
    const [r] = await pool.query('INSERT INTO symptom_reports (patient_id, symptoms, severity) VALUES (?,?,?)', [patient_id, symptoms, severity || 'mild']);
    const reportId = r.insertId;

    // 2) Call Grok for diagnosis & recommendation (text)
    const prompt = `You are a medical assistant. Patient reports the following symptoms: ${symptoms}. Severity: ${severity}. Provide a concise possible diagnosis (not definitive), urgent red flags, and 3 immediate recommendations (home care and when to see a doctor). Format JSON with keys: diagnosis, red_flags, recommendations.`;
    const aiResponse = await grokClient.chatCompletion({ prompt, model: 'grok-1' });

    // aiResponse expected as text — store it
    await pool.query('UPDATE symptom_reports SET ai_diagnosis=?, ai_recommendation=? WHERE id=?', [aiResponse.diagnosis || JSON.stringify(aiResponse), aiResponse.recommendations ? JSON.stringify(aiResponse.recommendations) : '', reportId]);

    res.json({ id: reportId, ai: aiResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'report failed' });
  }
};
