// routes/patients.js

const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { getPatientProfile, updatePatientProfile } = require("../controllers/patientController");

/**
 * GET patient profile (requires login)
 * URL: /api/patients/profile
 */
router.get("/profile", auth, getPatientProfile);

/**
 * UPDATE patient profile (requires login)
 * URL: /api/patients/profile
 */
router.put("/profile", auth, updatePatientProfile);

module.exports = router;
