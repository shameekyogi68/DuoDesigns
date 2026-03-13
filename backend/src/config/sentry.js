/**
 * @file         sentry.js
 * @description  Sentry.io configuration for Backend error tracking and performance monitoring.
 * @module       config/sentry
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const Sentry = require("@sentry/node");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

/**
 * Initialize Sentry for Node.js
 * @param {object} app - Express application instance
 */
exports.initSentry = (app) => {
  if (!process.env.SENTRY_DSN) {
    console.warn("Sentry DSN missing. Error tracking disabled.");
    return;
  }

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Sentry.Integrations.Express({ app }),
      nodeProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
    environment: process.env.NODE_ENV || "development",
  });

  // The request handler must be the first middleware on the app
  app.use(Sentry.Handlers.requestHandler());
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());
};

/**
 * Error handler to be used AFTER all routes
 * @param {object} app - Express application instance
 */
exports.initSentryErrorHandler = (app) => {
  if (!process.env.SENTRY_DSN) return;
  app.use(Sentry.Handlers.errorHandler());
};
