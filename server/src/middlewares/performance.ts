import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

// Performance monitoring middleware
export const performanceMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = process.hrtime();
  const startMemory = process.memoryUsage();

  // Override res.end to capture performance metrics
  const originalEnd = res.end;
  res.end = function(chunk?: unknown, encoding?: BufferEncoding | (() => void), cb?: (() => void) | BufferEncoding) {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const duration = seconds * 1000 + nanoseconds / 1e6; // Convert to milliseconds
    const endMemory = process.memoryUsage();

    // Calculate memory delta
    const memoryDelta = {
      rss: endMemory.rss - startMemory.rss,
      heapTotal: endMemory.heapTotal - startMemory.heapTotal,
      heapUsed: endMemory.heapUsed - startMemory.heapUsed,
      external: endMemory.external - startMemory.external,
    };

    // Log performance metrics
    logger.info('Request performance metrics', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration.toFixed(2)}ms`,
      memoryUsage: {
        rss: `${(endMemory.rss / 1024 / 1024).toFixed(2)}MB`,
        heapTotal: `${(endMemory.heapTotal / 1024 / 1024).toFixed(2)}MB`,
        heapUsed: `${(endMemory.heapUsed / 1024 / 1024).toFixed(2)}MB`,
        external: `${(endMemory.external / 1024 / 1024).toFixed(2)}MB`,
      },
      memoryDelta: {
        rss: `${(memoryDelta.rss / 1024 / 1024).toFixed(2)}MB`,
        heapTotal: `${(memoryDelta.heapTotal / 1024 / 1024).toFixed(2)}MB`,
        heapUsed: `${(memoryDelta.heapUsed / 1024 / 1024).toFixed(2)}MB`,
        external: `${(memoryDelta.external / 1024 / 1024).toFixed(2)}MB`,
      },
    });

    // Warn about slow requests
    if (duration > 1000) {
      logger.warn('Slow request detected', {
        method: req.method,
        url: req.url,
        duration: `${duration.toFixed(2)}ms`,
        statusCode: res.statusCode,
      });
    }

    // Warn about high memory usage
    if (memoryDelta.heapUsed > 50 * 1024 * 1024) { // 50MB
      logger.warn('High memory usage detected', {
        method: req.method,
        url: req.url,
        memoryDelta: `${(memoryDelta.heapUsed / 1024 / 1024).toFixed(2)}MB`,
      });
    }

    return originalEnd.call(this, chunk, encoding, cb);
  };

  next();
};

// System performance monitoring
export const systemPerformanceMonitor = (): void => {
  setInterval(() => {
    const memUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    logger.debug('System performance metrics', {
      memory: {
        rss: `${(memUsage.rss / 1024 / 1024).toFixed(2)}MB`,
        heapTotal: `${(memUsage.heapTotal / 1024 / 1024).toFixed(2)}MB`,
        heapUsed: `${(memUsage.heapUsed / 1024 / 1024).toFixed(2)}MB`,
        external: `${(memUsage.external / 1024 / 1024).toFixed(2)}MB`,
      },
      cpu: {
        user: cpuUsage.user,
        system: cpuUsage.system,
      },
      uptime: `${process.uptime().toFixed(2)}s`,
      pid: process.pid,
    });

    // Alert on high memory usage
    if (memUsage.heapUsed > 500 * 1024 * 1024) { // 500MB
      logger.warn('High heap memory usage detected', {
        heapUsed: `${(memUsage.heapUsed / 1024 / 1024).toFixed(2)}MB`,
      });
    }
  }, 60000); // Check every minute
};
