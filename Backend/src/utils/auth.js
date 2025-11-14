const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models');

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const authenticate = async (req, res, next) => {
  const h = req.headers.authorization;
  if (!h) return res.status(401).json({ message: 'Unauthorized' });
  const token = h.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(payload.id);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { generateToken, authenticate };
