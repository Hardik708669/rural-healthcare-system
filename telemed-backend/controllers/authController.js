// controllers/authController.js

const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER USER
exports.register = async (req, res) => {
  try {
    console.log("🔥 DEBUG BODY RECEIVED:", req.body);

    const { name, email, password, role = "patient" } = req.body;

    console.log("🔥 DEBUG password:", password);
    console.log("🔥 DEBUG email:", email);
    console.log("🔥 DEBUG name:", name);

    if (!password) {
      return res.status(400).json({
        error: "Password missing",
        received: req.body
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
      [name, email, hashed, role]
    );

    res.json({ success: true, user_id: result.insertId });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ error: "Registration failed", details: err.message });
  }
};

// LOGIN USER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (!rows.length) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Login failed", details: err.message });
  }
};
