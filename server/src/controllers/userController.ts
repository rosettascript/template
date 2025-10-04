import { Request, Response, NextFunction } from 'express';

import { userService } from '../services/userService';
import { AppError } from '../middlewares/errorHandler';
import { logger } from '../utils/logger';
import { AuthenticatedRequest } from '../types';

export const userController = {
  async getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user.id;
      const user = await userService.findById(userId);

      if (!user) {
        const error = new Error('User not found') as AppError;
        error.statusCode = 404;
        throw error;
      }

      res.json({
        success: true,
        data: { user }
      });
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user.id;
      const updateData = req.body;

      const user = await userService.updateProfile(userId, updateData);

      logger.info(`User profile updated: ${user.email}`);

      res.json({
        success: true,
        data: { user }
      });
    } catch (error) {
      next(error);
    }
  },

  async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page = 1, limit = 10, search, status } = req.query;

      const result = await userService.findAll({
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        search: search as string,
        status: status as string
      });

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  },

  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const user = await userService.findById(id);

      if (!user) {
        const error = new Error('User not found') as AppError;
        error.statusCode = 404;
        throw error;
      }

      res.json({
        success: true,
        data: { user }
      });
    } catch (error) {
      next(error);
    }
  },

  async updateUserStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const user = await userService.updateStatus(id, status);

      logger.info(`User status updated: ${user.email} -> ${status}`);

      res.json({
        success: true,
        data: { user }
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      await userService.delete(id);

      logger.info(`User deleted: ${id}`);

      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
};
