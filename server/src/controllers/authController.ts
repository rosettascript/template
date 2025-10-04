import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { config } from '../config';
import { userService } from '../services/userService';
import { emailService } from '../services/emailService';
import { AppError } from '../middlewares/errorHandler';
import { EmailVerificationPayload, PasswordResetPayload, AuthenticatedRequest } from '../types';
import { logger } from '../utils/logger';

export const authController = {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, firstName, lastName } = req.body;

      // Check if user already exists
      const existingUser = await userService.findByEmail(email);
      if (existingUser) {
        const error = new Error('User already exists') as AppError;
        error.statusCode = 409;
        throw error;
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, config.bcrypt.rounds);

      // Create user
      const user = await userService.create({
        email,
        passwordHash,
        firstName,
        lastName
      });

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, roles: user.roles },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      // Send verification email
      await emailService.sendVerificationEmail(user.email, token);

      logger.info(`User registered: ${user.email}`);

      res.status(201).json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          },
          token
        }
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await userService.findByEmail(email);
      if (!user) {
        const error = new Error('Invalid credentials') as AppError;
        error.statusCode = 401;
        throw error;
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.passwordHash);
      if (!isValidPassword) {
        const error = new Error('Invalid credentials') as AppError;
        error.statusCode = 401;
        throw error;
      }

      // Check if user is active
      if (user.status !== 'active') {
        const error = new Error('Account is not active') as AppError;
        error.statusCode = 403;
        throw error;
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, roles: user.roles },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      logger.info(`User logged in: ${user.email}`);

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles
          },
          token
        }
      });
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // In a real application, you would invalidate the token
      // by adding it to a blacklist or removing it from the database
      
      res.json({
        success: true,
        message: 'Logged out successfully'
      });
    } catch (error) {
      next(error);
    }
  },

  async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Implement token refresh logic here
      res.json({
        success: true,
        message: 'Token refresh not implemented'
      });
    } catch (error) {
      next(error);
    }
  },

  async verifyEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token } = req.body;

      // Verify token and update user email_verified_at
      const decoded = jwt.verify(token, config.jwt.secret) as EmailVerificationPayload;
      await userService.verifyEmail(decoded.id);

      res.json({
        success: true,
        message: 'Email verified successfully'
      });
    } catch (error) {
      next(error);
    }
  },

  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;

      const user = await userService.findByEmail(email);
      if (!user) {
        // Don't reveal if user exists or not
        res.json({
          success: true,
          message: 'If the email exists, a reset link has been sent'
        });
        return;
      }

      // Generate reset token
      const resetToken = jwt.sign(
        { id: user.id, type: 'password_reset' },
        config.jwt.secret,
        { expiresIn: '1h' }
      );

      // Send reset email
      await emailService.sendPasswordResetEmail(user.email, resetToken);

      res.json({
        success: true,
        message: 'If the email exists, a reset link has been sent'
      });
    } catch (error) {
      next(error);
    }
  },

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token, password } = req.body;

      // Verify reset token
      const decoded = jwt.verify(token, config.jwt.secret) as PasswordResetPayload;
      if (decoded.type !== 'password_reset') {
        const error = new Error('Invalid reset token') as AppError;
        error.statusCode = 400;
        throw error;
      }

      // Hash new password
      const passwordHash = await bcrypt.hash(password, config.bcrypt.rounds);

      // Update password
      await userService.updatePassword(decoded.id, passwordHash);

      res.json({
        success: true,
        message: 'Password reset successfully'
      });
    } catch (error) {
      next(error);
    }
  }
};
