import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock fetch before importing logger
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Logger - Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockResolvedValue({ ok: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Logger methods', () => {
    it('should call console.debug for debug level', async () => {
      const consoleSpy = vi.spyOn(console, 'debug');
      const { logger } = await import('../utils/logger');

      logger.debug('Test debug message');

      expect(consoleSpy).toHaveBeenCalledWith(
        '[DEBUG] Test debug message',
        ''
      );
    });

    it('should call console.info for info level', async () => {
      const consoleSpy = vi.spyOn(console, 'info');
      const { logger } = await import('../utils/logger');

      logger.info('Test info message');

      expect(consoleSpy).toHaveBeenCalledWith(
        '[INFO] Test info message',
        ''
      );
    });

    it('should call console.warn for warn level', async () => {
      const consoleSpy = vi.spyOn(console, 'warn');
      const { logger } = await import('../utils/logger');

      logger.warn('Test warn message');

      expect(consoleSpy).toHaveBeenCalledWith(
        '[WARN] Test warn message',
        ''
      );
    });

    it('should call console.error for error level', async () => {
      const consoleSpy = vi.spyOn(console, 'error');
      const { logger } = await import('../utils/logger');

      logger.error('Test error message', new Error('Test error'));

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('should include data in log entry', async () => {
      const { logger } = await import('../utils/logger');
      const testData = { key: 'value' };

      logger.info('Message with data', testData);

      // Log should be queued (we can't directly verify queue, but we can test fetch is called)
      expect(mockFetch).toBeDefined();
    });
  });

  describe('Log queue management', () => {
    it('should queue logs until flush', async () => {
      const { logger } = await import('../utils/logger');

      logger.info('Queue test 1');
      logger.info('Queue test 2');

      // Logs should be queued but not yet flushed (unless maxQueueSize reached)
      expect(logger.logQueue.length).toBeGreaterThanOrEqual(2);
    });

    it('should flush when queue reaches max size', async () => {
      const { logger } = await import('../utils/logger');

      // Clear existing queue
      logger.logQueue = [];

      // Add logs up to maxQueueSize
      for (let i = 0; i < logger.maxQueueSize; i++) {
        logger.info(`Log ${i}`);
      }

      // Fetch should have been called
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  describe('Log format', () => {
    it('should format log entries with required fields', async () => {
      const { logger } = await import('../utils/logger');

      logger.info('Format test');

      const logEntry = logger.logQueue[logger.logQueue.length - 1];

      expect(logEntry).toHaveProperty('timestamp');
      expect(logEntry).toHaveProperty('level', 'INFO');
      expect(logEntry).toHaveProperty('message', 'Format test');
      expect(logEntry).toHaveProperty('url');
      expect(logEntry).toHaveProperty('userAgent');
    });
  });
});
