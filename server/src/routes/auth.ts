import { Router } from 'express';
import { body } from 'express-validator';
import { authController } from '../controllers/authController';
import { validateRequest } from '../middlewares/validateRequest';

const router = Router();

// Register
router.post('/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required')
  ],
  validateRequest,
  authController.register
);

// Login
router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validateRequest,
  authController.login
);

// Logout
router.post('/logout', authController.logout);

// Refresh token
router.post('/refresh', authController.refreshToken);

// Verify email
router.post('/verify-email',
  [
    body('token').notEmpty().withMessage('Verification token is required')
  ],
  validateRequest,
  authController.verifyEmail
);

// Forgot password
router.post('/forgot-password',
  [
    body('email').isEmail().normalizeEmail()
  ],
  validateRequest,
  authController.forgotPassword
);

// Reset password
router.post('/reset-password',
  [
    body('token').notEmpty().withMessage('Reset token is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
  ],
  validateRequest,
  authController.resetPassword
);

export { router as authRoutes };
