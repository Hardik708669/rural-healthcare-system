const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/auth');
const { Patient } = require('../models');

// create
router.post('/', authenticate, async (req, res) => {
  try {
    const p = await Patient.create(req.body);
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Create failed' });
  }
});

// list
router.get('/', authenticate, async (req, res) => {
  const patients = await Patient.findAll({ limit: 200 });
  res.json(patients);
});

// get by id
router.get('/:id', authenticate, async (req, res) => {
  const patient = await Patient.findByPk(req.params.id);
  if (!patient) return res.status(404).json({ message: 'Not found' });
  res.json(patient);
});

module.exports = router;
