const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { reportSymptoms } = require("../controllers/symptomController");


router.post('/report', auth, reportSymptoms);

module.exports = router;
