const express = require("express");
const { generateQuote } = require("../controllers/quotes");

const router = express.Router();

// Route for generating quotes
router.post("/generate-quotes", generateQuote);

module.exports = router;
