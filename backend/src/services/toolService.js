'use strict';

const { execFile } = require('child_process');
const { promisify } = require('util');

const execFileAsync = promisify(execFile);

// Intent patterns mapped to action handlers
const INTENT_PATTERNS = [
  { pattern: /list\s+files?|show\s+files?|ls/i, action: 'list_files' },
  { pattern: /current\s+dir(?:ectory)?|where\s+am\s+i|pwd/i, action: 'pwd' },
  { pattern: /disk\s+(?:usage|space)|df/i, action: 'disk_usage' },
  { pattern: /(?:system\s+)?(?:info|uptime)/i, action: 'uptime' },
  { pattern: /date\s+(?:and\s+)?time|current\s+time/i, action: 'datetime' },
  { pattern: /echo\s+(.+)/i, action: 'echo' },
];

// Safe commands that are explicitly allow-listed
const SAFE_COMMANDS = {
  list_files: { cmd: 'ls', args: ['-la'] },
  pwd: { cmd: 'pwd', args: [] },
  disk_usage: { cmd: 'df', args: ['-h'] },
  uptime: { cmd: 'uptime', args: [] },
  datetime: { cmd: 'date', args: [] },
};

/**
 * Parse the user message and determine the intent.
 * @param {string} message
 * @returns {{ action: string, args: string[] } | null}
 */
function parseIntent(message) {
  for (const { pattern, action } of INTENT_PATTERNS) {
    const match = message.match(pattern);
    if (match) {
      if (action === 'echo') {
        return { action, args: [match[1].trim()] };
      }
      return { action, args: [] };
    }
  }
  return null;
}

/**
 * Execute a safe, allow-listed system command.
 * @param {string} action
 * @param {string[]} extraArgs
 * @returns {Promise<string>}
 */
async function runSafeCommand(action, extraArgs = []) {
  const command = SAFE_COMMANDS[action];
  if (!command) {
    if (action === 'echo') {
      if (!extraArgs.length || extraArgs[0] == null) {
        return '';
      }
      // Sanitize: only allow printable ASCII
      const safe = String(extraArgs[0]).replace(/[^\x20-\x7E]/g, '');
      const { stdout } = await execFileAsync('echo', [safe], { timeout: 5000 });
      return stdout.trim();
    }
    throw new Error(`Unsafe or unknown action: ${action}`);
  }

  const { stdout } = await execFileAsync(command.cmd, [...command.args, ...extraArgs], {
    timeout: 5000,
  });
  return stdout.trim();
}

/**
 * Main entry point — parse intent and execute if matched.
 * Returns the tool result string, or null if no tool was triggered.
 * @param {string} message
 * @returns {Promise<string | null>}
 */
async function execute(message) {
  const intent = parseIntent(message);
  if (!intent) return null;

  try {
    const result = await runSafeCommand(intent.action, intent.args);
    return result;
  } catch (err) {
    return `Tool error: ${err.message}`;
  }
}

module.exports = { execute, parseIntent, runSafeCommand };
