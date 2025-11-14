// controllers/patientController.js

const pool = require("../config/db");

// GET PATIENT PROFILE
exports.getPatientProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await pool.query(
      "SELECT * FROM patient_profiles WHERE user_id = ?",
      [userId]
    );

    if (!rows.length) {
      return res.json({ message: "No profile found", profile: null });
    }

    res.json({ profile: rows[0] });
  } catch (err) {
    console.error("GET PROFILE ERROR:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// UPDATE PATIENT PROFILE
exports.updatePatientProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { age, gender, contact, address } = req.body;

    // Check if the profile already exists
    const [exists] = await pool.query(
      "SELECT id FROM patient_profiles WHERE user_id = ?",
      [userId]
    );

    if (exists.length) {
      // Update existing profile
      await pool.query(
        "UPDATE patient_profiles SET age=?, gender=?, contact=?, address=? WHERE user_id=?",
        [age, gender, contact, address, userId]
      );
    } else {
      // Create new profile
      await pool.query(
        "INSERT INTO patient_profiles (user_id, age, gender, contact, address) VALUES (?,?,?,?,?)",
        [userId, age, gender, contact, address]
      );
    }

    res.json({ success: true, message: "Profile saved successfully" });
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
};
