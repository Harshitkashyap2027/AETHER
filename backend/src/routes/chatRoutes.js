'use strict';

const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// POST /api/chat — send message to AETHER
router.post('/chat', chatController.chat);

// GET /api/chat/history/:sessionId — retrieve conversation history
router.get('/chat/history/:sessionId', chatController.getHistory);

// DELETE /api/chat/history/:sessionId — clear conversation history
router.delete('/chat/history/:sessionId', chatController.clearHistory);

module.exports = router;
