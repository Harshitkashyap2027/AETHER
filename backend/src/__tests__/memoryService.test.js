'use strict';

const memoryService = require('../services/memoryService');

describe('memoryService (in-memory fallback)', () => {
  const sessionId = 'test-memory-session';

  afterEach(async () => {
    await memoryService.clearHistory(sessionId);
  });

  it('returns empty array for new session', async () => {
    const history = await memoryService.getHistory(sessionId);
    expect(history).toEqual([]);
  });

  it('adds and retrieves messages', async () => {
    await memoryService.addMessage(sessionId, 'user', 'Hello AETHER');
    await memoryService.addMessage(sessionId, 'assistant', 'Hello! How can I help?');

    const history = await memoryService.getHistory(sessionId);
    expect(history).toHaveLength(2);
    expect(history[0]).toEqual({ role: 'user', content: 'Hello AETHER' });
    expect(history[1]).toEqual({ role: 'assistant', content: 'Hello! How can I help?' });
  });

  it('clears history correctly', async () => {
    await memoryService.addMessage(sessionId, 'user', 'Hello');
    await memoryService.clearHistory(sessionId);
    const history = await memoryService.getHistory(sessionId);
    expect(history).toEqual([]);
  });

  it('keeps sessions isolated', async () => {
    const session2 = 'test-memory-session-2';
    await memoryService.addMessage(sessionId, 'user', 'Session 1');
    await memoryService.addMessage(session2, 'user', 'Session 2');

    const h1 = await memoryService.getHistory(sessionId);
    const h2 = await memoryService.getHistory(session2);

    expect(h1[0].content).toBe('Session 1');
    expect(h2[0].content).toBe('Session 2');

    await memoryService.clearHistory(session2);
  });
});
