import { Request } from 'express';

// JWT Payload types
export interface JWTPayload {
  id: string;
  email: string;
  type?: string;
  iat?: number;
  exp?: number;
}

export interface EmailVerificationPayload extends JWTPayload {
  type: 'email_verification';
}

export interface PasswordResetPayload extends JWTPayload {
  type: 'password_reset';
}

export interface AuthPayload extends JWTPayload {
  type?: 'access' | 'refresh';
}

// Request types with user
export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

// User types
export interface User {
  id: string;
  email: string;
  password_hash: string;
  email_verified_at?: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  status: 'active' | 'inactive' | 'suspended' | 'deleted';
  roles: string[];
}

export interface UserProfile {
  user_id: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  phone?: string;
  bio?: string;
  locale?: string;
  timezone?: string;
  created_at: Date;
  updated_at: Date;
}

// Database query types
export interface FindUsersOptions {
  page: number;
  limit: number;
  search?: string;
  status?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Validation error types
export interface ValidationError extends Error {
  statusCode: number;
  details: Array<{
    field: string;
    message: string;
  }>;
}
