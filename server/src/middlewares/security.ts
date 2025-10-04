import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

// Security monitoring middleware
export const securityMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Log security-relevant information
  const securityInfo = {
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent'),
    referer: req.get('Referer'),
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString(),
  };

  // Check for suspicious patterns
  const suspiciousPatterns = [
    /\.\./, // Directory traversal
    /<script/i, // XSS attempts
    /union.*select/i, // SQL injection
    /eval\(/i, // Code injection
    /javascript:/i, // JavaScript injection
  ];

  const requestString = JSON.stringify(req.body) + req.url + JSON.stringify(req.query);
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(requestString)) {
      logger.warn('Suspicious request detected', {
        ...securityInfo,
        pattern: pattern.toString(),
        requestString: requestString.substring(0, 500), // Limit log size
      });
      
      // You might want to block or rate limit such requests
      break;
    }
  }

  // Monitor for brute force attempts
  const ip = req.ip || req.connection.remoteAddress;
  if (ip) {
    // In a real implementation, you'd use Redis or another store
    // to track failed attempts per IP
    logger.debug('Request from IP', { ip, url: req.url });
  }

  next();
};

// Rate limiting per IP
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

export const rateLimitPerIP = (maxRequests: number = 100, windowMs: number = 15 * 60 * 1000) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();

    // Clean up expired entries
    for (const [key, value] of ipRequestCounts.entries()) {
      if (now > value.resetTime) {
        ipRequestCounts.delete(key);
      }
    }

    const current = ipRequestCounts.get(ip);
    
    if (!current) {
      ipRequestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    } else if (now > current.resetTime) {
      ipRequestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    } else if (current.count >= maxRequests) {
      logger.warn('Rate limit exceeded', {
        ip,
        count: current.count,
        maxRequests,
        windowMs,
      });
      
      res.status(429).json({
        success: false,
        error: {
          message: 'Too many requests',
          statusCode: 429,
        },
      });
      return;
    } else {
      current.count++;
    }

    next();
  };
};

// Security headers middleware
export const securityHeaders = (req: Request, res: Response, next: NextFunction): void => {
  // Remove X-Powered-By header
  res.removeHeader('X-Powered-By');

  // Add security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  // Content Security Policy
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self'"
  );

  next();
};
