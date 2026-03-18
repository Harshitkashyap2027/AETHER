'use strict';

const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/aether';
  if (process.env.NODE_ENV === 'test') {
    console.log('Skipping MongoDB connection in test environment');
    return;
  }
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected:', uri);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    throw err;
  }
}

async function disconnectDB() {
  await mongoose.disconnect();
}

module.exports = { connectDB, disconnectDB };
