'use strict';

const { v4: uuidv4 } = require('uuid');
const aiService = require('../services/aiService');
const memoryService = require('../services/memoryService');
const toolService = require('../services/toolService');

/**
 * POST /api/chat
 * Body: { message: string, sessionId?: string }
 */
async function chat(req, res, next) {
  try {
    const { message, sessionId = uuidv4() } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'message is required and must be a non-empty string' });
    }

    const trimmed = message.trim();

    // Retrieve conversation history for context
    const history = await memoryService.getHistory(sessionId);

    // Detect and execute tool actions if applicable
    const toolResult = await toolService.execute(trimmed);

    // Build context string from tool result
    const toolContext = toolResult
      ? `\n[Tool Execution Result]: ${toolResult}`
      : '';

    // Send to AI with history + optional tool context
    const aiResponse = await aiService.chat(trimmed + toolContext, history);

    // Persist messages
    await memoryService.addMessage(sessionId, 'user', trimmed);
    await memoryService.addMessage(sessionId, 'assistant', aiResponse);

    res.json({
      sessionId,
      message: aiResponse,
      toolUsed: toolResult !== null,
      toolResult: toolResult || undefined,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/chat/history/:sessionId
 */
async function getHistory(req, res, next) {
  try {
    const { sessionId } = req.params;
    const history = await memoryService.getHistory(sessionId);
    res.json({ sessionId, history });
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/chat/history/:sessionId
 */
async function clearHistory(req, res, next) {
  try {
    const { sessionId } = req.params;
    await memoryService.clearHistory(sessionId);
    res.json({ sessionId, cleared: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { chat, getHistory, clearHistory };
