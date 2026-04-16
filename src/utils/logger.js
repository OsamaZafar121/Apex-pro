// Client-side logger utility
// Logs are sent to the server and can be viewed in server/logs.txt

const LOG_LEVELS = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

const API_BASE = import.meta.env.VITE_API_URL || '/api';

class Logger {
  constructor() {
    this.logQueue = [];
    this.isFlushing = false;
    this.maxQueueSize = 50;
  }

  _formatMessage(level, message, data) {
    const timestamp = new Date().toISOString();
    return {
      timestamp,
      level,
      message,
      data: data ? JSON.stringify(data) : undefined,
      url: window.location.href,
      userAgent: navigator.userAgent,
    };
  }

  _addToQueue(logEntry) {
    this.logQueue.push(logEntry);
    if (this.logQueue.length >= this.maxQueueSize) {
      this._flush();
    }
  }

  async _flush() {
    if (this.isFlushing || this.logQueue.length === 0) return;
    
    this.isFlushing = true;
    const logsToFlush = [...this.logQueue];
    this.logQueue = [];

    try {
      await fetch(`${API_BASE}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logs: logsToFlush }),
      });
    } catch (error) {
      // Fallback to console if server logging fails
      console.warn('Failed to send logs to server:', error);
    } finally {
      this.isFlushing = false;
    }
  }

  debug(message, data) {
    const entry = this._formatMessage(LOG_LEVELS.DEBUG, message, data);
    console.debug(`[DEBUG] ${message}`, data || '');
    this._addToQueue(entry);
  }

  info(message, data) {
    const entry = this._formatMessage(LOG_LEVELS.INFO, message, data);
    console.info(`[INFO] ${message}`, data || '');
    this._addToQueue(entry);
  }

  warn(message, data) {
    const entry = this._formatMessage(LOG_LEVELS.WARN, message, data);
    console.warn(`[WARN] ${message}`, data || '');
    this._addToQueue(entry);
  }

  error(message, error) {
    const entry = this._formatMessage(LOG_LEVELS.ERROR, message, {
      message: error?.message,
      stack: error?.stack,
      ...error,
    });
    console.error(`[ERROR] ${message}`, error || '');
    this._addToQueue(entry);
  }

  // Flush logs before page unload
  flush() {
    if (this.logQueue.length > 0) {
      const logsToFlush = [...this.logQueue];
      this.logQueue = [];
      
      // Use sendBeacon for reliable delivery during page unload
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify({ logs: logsToFlush })], {
          type: 'application/json',
        });
        navigator.sendBeacon(`${API_BASE}/logs`, blob);
      }
    }
  }
}

// Create singleton instance
export const logger = new Logger();

// Flush logs on page unload
window.addEventListener('beforeunload', () => {
  logger.flush();
});

// Capture unhandled errors
window.addEventListener('error', (event) => {
  logger.error('Unhandled error', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error?.stack,
  });
});

// Capture unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  logger.error('Unhandled promise rejection', {
    reason: event.reason?.message || event.reason,
    stack: event.reason?.stack,
  });
});

export default logger;
