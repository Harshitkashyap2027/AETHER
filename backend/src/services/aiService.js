'use strict';

const OpenAI = require('openai');

const SYSTEM_PROMPT = `You are AETHER — an advanced AI Operating System and intelligent agent.

You are not just a chatbot. You THINK and ACT. Your capabilities include:
- Deep reasoning and intelligent conversation
- Writing, explaining, and debugging code in any language
- Executing system commands and automating tasks
- Analyzing data and providing structured insights
- Managing multi-step workflows

Your personality:
- Precise, confident, and concise
- Developer-focused and technically accurate
- You explain complex concepts clearly
- You proactively suggest the best solution

When you receive tool execution results, analyze them and provide meaningful insights.
Always be helpful, safe, and ethical. Never assist with harmful or illegal actions.`;

let openaiClient = null;

function getClient() {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

/**
 * Send a message to the AI model with conversation history.
 * @param {string} userMessage
 * @param {Array<{role: string, content: string}>} history
 * @returns {Promise<string>}
 */
async function chat(userMessage, history = []) {
  const client = getClient();

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: 'user', content: userMessage },
  ];

  const model = process.env.OPENAI_MODEL || 'gpt-4-turbo-preview';

  const completion = await client.chat.completions.create({
    model,
    messages,
    temperature: 0.7,
    max_tokens: 2048,
  });

  return completion.choices[0].message.content.trim();
}

module.exports = { chat, SYSTEM_PROMPT };
