import { Router } from 'express';
import { metricsEndpoint } from '../middlewares/monitoring';

const router = Router();

// Prometheus metrics endpoint
router.get('/metrics', metricsEndpoint);

// Health check endpoint with detailed information
router.get('/health/detailed', (req, res) => {
  const healthInfo = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    pid: process.pid,
  };

  res.json({
    success: true,
    data: healthInfo,
  });
});

// System information endpoint
router.get('/system/info', (req, res) => {
  const systemInfo = {
    platform: process.platform,
    arch: process.arch,
    nodeVersion: process.version,
    versions: process.versions,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    pid: process.pid,
    title: process.title,
    argv: process.argv,
    execPath: process.execPath,
    cwd: process.cwd(),
  };

  res.json({
    success: true,
    data: systemInfo,
  });
});

export default router;
