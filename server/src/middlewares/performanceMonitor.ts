import { Request, Response, NextFunction } from 'express';
import { logPerformance } from '../utils/logger';

export const performanceMonitor = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();

  // Override res.end to capture response time
  const originalEnd = res.end;
  res.end = function(chunk?: any, encoding?: any) {
    const responseTime = Date.now() - startTime;
    
    // Log performance metrics
    logPerformance('HTTP Request', responseTime, {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      userAgent: req.get('User-Agent'),
      ip: req.ip
    });

    // Call original end method
    originalEnd.call(this, chunk, encoding);
  };

  next();
};