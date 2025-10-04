import { Router, Request, Response } from 'express';
import { config } from '../config';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: config.app.nodeEnv,
      version: '1.0.0'
    }
  });
});

router.get('/ready', (req: Request, res: Response) => {
  // Add database connectivity check here
  res.json({
    success: true,
    data: {
      status: 'ready',
      timestamp: new Date().toISOString()
    }
  });
});

export { router as healthRoutes };
