import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { AppError } from './errorHandler';
import { ValidationError } from '../types';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed') as ValidationError;
    error.statusCode = 400;
    error.details = errors.array();
    throw error;
  }
  
  next();
};
