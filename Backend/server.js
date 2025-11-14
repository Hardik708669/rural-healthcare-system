require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/models');
const authRoutes = require('./src/routes/auth');
const patientRoutes = require('./src/routes/patients');
const encounterRoutes = require('./src/routes/encounters');
const aiRoutes = require('./src/routes/ai');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // handles uploads as base64 or form-data if using multer

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/encounters', encounterRoutes);
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 4000;
(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err) {
    console.error('Unable to connect to DB:', err);
    process.exit(1);
  }
})();
