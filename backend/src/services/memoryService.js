'use strict';

const mongoose = require('mongoose');

// ─── Schema ──────────────────────────────────────────────────────────────────

const messageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
    content: { type: String, required: true },
  },
  { _id: false, timestamps: false }
);

const conversationSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    messages: [messageSchema],
  },
  { timestamps: true }
);

const Conversation = mongoose.model('Conversation', conversationSchema);

// ─── In-memory fallback (used in test/no-DB environments) ────────────────────

const inMemoryStore = new Map();

function isConnected() {
  return mongoose.connection.readyState === 1;
}

// ─── Service methods ──────────────────────────────────────────────────────────

/**
 * Retrieve conversation history for a session.
 * @param {string} sessionId
 * @returns {Promise<Array<{role: string, content: string}>>}
 */
async function getHistory(sessionId) {
  if (!isConnected()) {
    return inMemoryStore.get(sessionId) || [];
  }
  const convo = await Conversation.findOne({ sessionId }).lean();
  return convo ? convo.messages : [];
}

/**
 * Append a message to the conversation history.
 * @param {string} sessionId
 * @param {'user' | 'assistant'} role
 * @param {string} content
 */
async function addMessage(sessionId, role, content) {
  const message = { role, content };

  if (!isConnected()) {
    const history = inMemoryStore.get(sessionId) || [];
    history.push(message);
    inMemoryStore.set(sessionId, history);
    return;
  }

  await Conversation.findOneAndUpdate(
    { sessionId },
    { $push: { messages: message } },
    { upsert: true, new: true }
  );
}

/**
 * Clear conversation history for a session.
 * @param {string} sessionId
 */
async function clearHistory(sessionId) {
  if (!isConnected()) {
    inMemoryStore.delete(sessionId);
    return;
  }
  await Conversation.findOneAndDelete({ sessionId });
}

module.exports = { getHistory, addMessage, clearHistory };
