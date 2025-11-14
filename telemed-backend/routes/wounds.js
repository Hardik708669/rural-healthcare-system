const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const { reportWound } = require("../controllers/woundController");


router.post('/report', auth, upload.single('image'), reportWound);

module.exports = router;
