import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authenticateToken, requireRole } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validateRequest';
import { body, param, query } from 'express-validator';

const router = Router();

// Get current user profile
router.get('/profile', authenticateToken, userController.getProfile);

// Update current user profile
router.put('/profile',
  authenticateToken,
  [
    body('firstName').optional().trim().notEmpty(),
    body('lastName').optional().trim().notEmpty(),
    body('displayName').optional().trim().notEmpty(),
    body('phone').optional().isMobilePhone(),
    body('bio').optional().trim().isLength({ max: 500 }),
    body('locale').optional().isIn(['en', 'es', 'fr', 'de']),
    body('timezone').optional().trim().notEmpty()
  ],
  validateRequest,
  userController.updateProfile
);

// Get all users (admin only)
router.get('/',
  authenticateToken,
  requireRole(['admin']),
  [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('search').optional().trim(),
    query('status').optional().isIn(['active', 'inactive', 'suspended', 'deleted'])
  ],
  validateRequest,
  userController.getUsers
);

// Get user by ID (admin only)
router.get('/:id',
  authenticateToken,
  requireRole(['admin']),
  [
    param('id').isUUID().withMessage('Invalid user ID')
  ],
  validateRequest,
  userController.getUserById
);

// Update user status (admin only)
router.patch('/:id/status',
  authenticateToken,
  requireRole(['admin']),
  [
    param('id').isUUID().withMessage('Invalid user ID'),
    body('status').isIn(['active', 'inactive', 'suspended', 'deleted'])
  ],
  validateRequest,
  userController.updateUserStatus
);

// Delete user (admin only)
router.delete('/:id',
  authenticateToken,
  requireRole(['admin']),
  [
    param('id').isUUID().withMessage('Invalid user ID')
  ],
  validateRequest,
  userController.deleteUser
);

export { router as userRoutes };
