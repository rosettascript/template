import { Request, Response, NextFunction } from 'express';
import promClient from 'prom-client';
import { logger } from '../utils/logger';

// Create a Registry to register the metrics
const register = new promClient.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'template-server',
  version: process.env.npm_package_version || '1.0.0',
});

// Enable the collection of default metrics
promClient.collectDefaultMetrics({ register });

// Create custom metrics
const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register],
});

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
  registers: [register],
});

const activeConnections = new promClient.Gauge({
  name: 'active_connections',
  help: 'Number of active connections',
  registers: [register],
});

const databaseConnections = new promClient.Gauge({
  name: 'database_connections',
  help: 'Number of database connections',
  labelNames: ['state'],
  registers: [register],
});

const cacheHits = new promClient.Counter({
  name: 'cache_hits_total',
  help: 'Total number of cache hits',
  labelNames: ['cache_type'],
  registers: [register],
});

const cacheMisses = new promClient.Counter({
  name: 'cache_misses_total',
  help: 'Total number of cache misses',
  labelNames: ['cache_type'],
  registers: [register],
});

// Middleware to collect HTTP metrics
export const metricsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  const originalSend = res.send;

  // Override res.send to capture response
  res.send = function(body: unknown) {
    const duration = (Date.now() - start) / 1000;
    const route = req.route?.path || req.path;
    
    // Record metrics
    httpRequestsTotal
      .labels(req.method, route, res.statusCode.toString())
      .inc();
    
    httpRequestDuration
      .labels(req.method, route, res.statusCode.toString())
      .observe(duration);

    // Log slow requests
    if (duration > 1) {
      logger.warn('Slow request detected', {
        method: req.method,
        route,
        duration,
        statusCode: res.statusCode,
      });
    }

    return originalSend.call(this, body);
  };

  next();
};

// Middleware to expose metrics endpoint
export const metricsEndpoint = async (req: Request, res: Response): Promise<void> => {
  try {
    res.set('Content-Type', register.contentType);
    const metrics = await register.metrics();
    res.end(metrics);
  } catch (error) {
    logger.error('Error generating metrics', error);
    res.status(500).end('Error generating metrics');
  }
};

// Function to update active connections
export const updateActiveConnections = (count: number): void => {
  activeConnections.set(count);
};

// Function to update database connections
export const updateDatabaseConnections = (active: number, idle: number): void => {
  databaseConnections.labels('active').set(active);
  databaseConnections.labels('idle').set(idle);
};

// Function to record cache hits
export const recordCacheHit = (cacheType: string): void => {
  cacheHits.labels(cacheType).inc();
};

// Function to record cache misses
export const recordCacheMiss = (cacheType: string): void => {
  cacheMisses.labels(cacheType).inc();
};

// Export register for external access
export { register };
