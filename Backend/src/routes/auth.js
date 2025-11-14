const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { generateToken } = require('../utils/auth');

// register
router.post('/register', async (req, res) => {
  const { name, phone, password, role = 'volunteer' } = req.body;
  try {
    const user = await User.create({ name, phone, passwordHash: password, role });
    const token = generateToken(user);
    res.json({ user: { id: user.id, name: user.name, phone: user.phone }, token });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Registration failed' });
  }
});

// login
router.post('/login', async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await User.findOne({ where: { phone } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const valid = await user.validatePassword(password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = generateToken(user);
    res.json({ user: { id: user.id, name: user.name, phone: user.phone }, token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;