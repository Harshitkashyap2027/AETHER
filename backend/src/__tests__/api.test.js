'use strict';

const request = require('supertest');
const app = require('../app');

// Mock the AI service so tests don't need a real API key
jest.mock('../services/aiService', () => ({
  chat: jest.fn().mockResolvedValue('Hello! I am AETHER, your AI Operating System.'),
  SYSTEM_PROMPT: 'mock system prompt',
}));

// Mock tool service
jest.mock('../services/toolService', () => ({
  execute: jest.fn().mockResolvedValue(null),
  parseIntent: jest.fn().mockReturnValue(null),
  runSafeCommand: jest.fn(),
}));

describe('Health endpoint', () => {
  it('GET /health returns 200 with status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toBe('AETHER Backend');
    expect(res.body.timestamp).toBeDefined();
  });
});

describe('POST /api/chat', () => {
  it('returns 400 when message is missing', async () => {
    const res = await request(app).post('/api/chat').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/message is required/i);
  });

  it('returns 400 when message is empty string', async () => {
    const res = await request(app).post('/api/chat').send({ message: '   ' });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/message is required/i);
  });

  it('returns 200 with AI response', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'Hello AETHER' });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Hello! I am AETHER, your AI Operating System.');
    expect(res.body.sessionId).toBeDefined();
    expect(typeof res.body.toolUsed).toBe('boolean');
  });

  it('accepts a custom sessionId', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'Test message', sessionId: 'my-session-123' });
    expect(res.status).toBe(200);
    expect(res.body.sessionId).toBe('my-session-123');
  });
});

describe('GET /api/chat/history/:sessionId', () => {
  it('returns empty history for unknown session', async () => {
    const res = await request(app).get('/api/chat/history/nonexistent-session');
    expect(res.status).toBe(200);
    expect(res.body.history).toEqual([]);
  });

  it('returns conversation history after chat', async () => {
    const sessionId = 'history-test-session';
    await request(app).post('/api/chat').send({ message: 'Hello', sessionId });
    const res = await request(app).get(`/api/chat/history/${sessionId}`);
    expect(res.status).toBe(200);
    expect(res.body.history.length).toBeGreaterThan(0);
    expect(res.body.history[0].role).toBe('user');
    expect(res.body.history[0].content).toBe('Hello');
  });
});

describe('DELETE /api/chat/history/:sessionId', () => {
  it('clears conversation history', async () => {
    const sessionId = 'clear-test-session';
    await request(app).post('/api/chat').send({ message: 'Message to clear', sessionId });

    const del = await request(app).delete(`/api/chat/history/${sessionId}`);
    expect(del.status).toBe(200);
    expect(del.body.cleared).toBe(true);

    const history = await request(app).get(`/api/chat/history/${sessionId}`);
    expect(history.body.history).toEqual([]);
  });
});

describe('404 handler', () => {
  it('returns 404 for unknown routes', async () => {
    const res = await request(app).get('/api/unknown');
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });
});
