'use strict';

const app = require('./app');
const { connectDB } = require('./config/database');

const PORT = parseInt(process.env.PORT, 10) || 3000;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 AETHER Backend running on port ${PORT}`);
      console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`   AI Provider: ${process.env.AI_PROVIDER || 'openai'}`);
    });
  } catch (err) {
    console.error('Failed to start AETHER backend:', err);
    process.exit(1);
  }
}

start();
