import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AppError } from './errorHandler';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    roles: string[];
  };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    const error = new Error('Access token required') as AppError;
    error.statusCode = 401;
    throw error;
  }

  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) {
      const error = new Error('Invalid or expired token') as AppError;
      error.statusCode = 403;
      throw error;
    }

    req.user = decoded as AuthRequest['user'];
    next();
  });
};

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      const error = new Error('Authentication required') as AppError;
      error.statusCode = 401;
      throw error;
    }

    const hasRole = req.user.roles.some(role => roles.includes(role));
    if (!hasRole) {
      const error = new Error('Insufficient permissions') as AppError;
      error.statusCode = 403;
      throw error;
    }

    next();
  };
};
