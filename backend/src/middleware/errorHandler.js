'use strict';

/**
 * Centralized error handler middleware.
 */
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (process.env.NODE_ENV !== 'test') {
    console.error(`[AETHER Error] ${status} — ${message}`);
    if (err.stack && process.env.NODE_ENV === 'development') {
      console.error(err.stack);
    }
  }

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

module.exports = errorHandler;
