const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/auth');
const { Encounter } = require('../models');

// create encounter (idempotent via clientUuid)
router.post('/', authenticate, async (req, res) => {
  try {
    const { clientUuid, patientId, symptomsText, vitalsJson, attachmentsJson } = req.body;

    if (clientUuid) {
      const existing = await Encounter.findOne({ where: { clientUuid } });
      if (existing) return res.json(existing);
    }

    const enc = await Encounter.create({
      clientUuid,
      patientId,
      userId: req.user.id,
      symptomsText,
      vitalsJson,
      attachmentsJson,
      synced: true
    });

    // optionally queue AI analysis; here we call AI orchestrator directly or push to worker
    // e.g., queueJob({ type: 'analyze_symptoms', encounterId: enc.id })

    res.json(enc);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Encounter create failed', err: err.message });
  }
});

module.exports = router;
