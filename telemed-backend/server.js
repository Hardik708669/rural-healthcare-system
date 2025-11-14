// server.js
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes (we'll create them)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/symptoms', require('./routes/symptoms'));
app.use('/api/wounds', require('./routes/wounds'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const pool = require('./config/db');
app.get('/api/ping-db', async (req,res) => {
  try { const [rows] = await pool.query('SELECT 1+1 AS v'); res.json(rows); }
  catch(e){ res.status(500).json({error: e.message});}
});
