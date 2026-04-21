const express = require('express');
const { chatWithBot } = require('../controllers/chatController');
const { chatLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Public route for the widget to communicate
router.post('/', chatLimiter, chatWithBot);

module.exports = router;
