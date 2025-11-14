const pool = require('../config/db');
const grokClient = require('../utils/grokClient');

exports.reportWound = async (req, res) => {
  try {
    const patient_id = req.user.id;
    if (!req.file) return res.status(400).json({ error: 'image required' });
    const imagePath = req.file.path; // serve via /uploads route

    // Save basic record
    const [r] = await pool.query('INSERT INTO wound_reports (patient_id, image_path) VALUES (?,?)', [patient_id, imagePath]);
    const id = r.insertId;

    // Call Grok for image analysis (object detection / wound classification)
    // We'll ask Grok to analyze the image and return JSON with keys: wound_type, severity, recommended_treatment, urgent
    const imageUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, '/')}`;
    const prompt = `Analyze the wound image at ${imageUrl}. Return JSON: {wound_type, severity, likely_causes, recommended_treatment, urgent}. Keep brief, conservative, and state disclaimers (non-diagnostic).`;

    const aiAnalysis = await grokClient.analyzeImage({ imagePath: imagePath, prompt, model: 'grok-1' });

    await pool.query('UPDATE wound_reports SET ai_analysis=?, ai_recommendation=? WHERE id=?', [JSON.stringify(aiAnalysis), JSON.stringify(aiAnalysis.recommended_treatment || {}), id]);

    res.json({ id, aiAnalysis });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'wound report failed' });
  }
};
