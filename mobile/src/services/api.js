/**
 * AETHER API service — connects mobile app to backend
 */

// NOTE: Set EXPO_PUBLIC_API_URL to an https:// URL in production environments.
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

/**
 * Send a message to AETHER and receive an AI response.
 * @param {string} message
 * @param {string} [sessionId]
 * @returns {Promise<{message: string, sessionId: string, toolUsed: boolean, toolResult?: string}>}
 */
export async function sendMessage(message, sessionId) {
  const response = await fetch(`${BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionId }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error || `HTTP ${response.status}`);
  }

  return response.json();
}

/**
 * Fetch conversation history for a session.
 * @param {string} sessionId
 * @returns {Promise<Array<{role: string, content: string}>>}
 */
export async function getHistory(sessionId) {
  const response = await fetch(`${BASE_URL}/chat/history/${sessionId}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return data.history;
}

/**
 * Clear conversation history for a session.
 * @param {string} sessionId
 */
export async function clearHistory(sessionId) {
  const response = await fetch(`${BASE_URL}/chat/history/${sessionId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

/**
 * Check backend health status.
 * @returns {Promise<{status: string, service: string, timestamp: string}>}
 */
export async function checkHealth() {
  const response = await fetch(`${BASE_URL.replace('/api', '')}/health`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
