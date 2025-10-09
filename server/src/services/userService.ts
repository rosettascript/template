import { Pool } from 'pg';

import { config } from '../config';
import { logger } from '../utils/logger';
import { User, UserProfile, FindUsersOptions, PaginatedResult } from '../types';

// Database connection pool
const pool = new Pool({
  user: config.database.user,
  host: config.database.host,
  database: config.database.database,
  password: config.database.password,
  port: config.database.port,
  ssl: config.database.ssl,
  // Add connection pool configuration to prevent memory leaks
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

// Graceful shutdown handler
process.on('SIGINT', async () => {
  logger.info('Received SIGINT, closing database pool...');
  await pool.end();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('Received SIGTERM, closing database pool...');
  await pool.end();
  process.exit(0);
});

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  status: string;
  roles: string[];
  emailVerifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserData {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  phone?: string;
  bio?: string;
  locale?: string;
  timezone?: string;
}

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

class UserService {
  async create(userData: CreateUserData): Promise<User> {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      // Create user
      const userResult = await client.query(`
        INSERT INTO users (email, password_hash, status)
        VALUES ($1, $2, 'active')
        RETURNING id, email, password_hash, status, created_at, updated_at
      `, [userData.email, userData.passwordHash]);

      const user = userResult.rows[0];

      // Create user profile
      await client.query(`
        INSERT INTO user_profiles (user_id, first_name, last_name)
        VALUES ($1, $2, $3)
      `, [user.id, userData.firstName, userData.lastName]);

      // Assign default role
      const roleResult = await client.query(`
        SELECT id FROM roles WHERE name = 'user'
      `);
      
      if (roleResult.rows.length > 0) {
        await client.query(`
          INSERT INTO user_roles (user_id, role_id)
          VALUES ($1, $2)
        `, [user.id, roleResult.rows[0].id]);
      }

      await client.query('COMMIT');

      return {
        id: user.id,
        email: user.email,
        passwordHash: user.password_hash,
        firstName: userData.firstName,
        lastName: userData.lastName,
        status: user.status,
        roles: ['user'],
        createdAt: user.created_at,
        updatedAt: user.updated_at
      };
    } catch (error) {
      await client.query('ROLLBACK');
      logger.error('Error creating user:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(`
      SELECT 
        u.id, u.email, u.password_hash, u.status, u.email_verified_at,
        u.created_at, u.updated_at,
        up.first_name, up.last_name, up.display_name,
        ARRAY_AGG(r.name) as roles
      FROM users u
      LEFT JOIN user_profiles up ON u.id = up.user_id
      LEFT JOIN user_roles ur ON u.id = ur.user_id
      LEFT JOIN roles r ON ur.role_id = r.id
      WHERE u.email = $1 AND u.deleted_at IS NULL
      GROUP BY u.id, u.email, u.password_hash, u.status, u.email_verified_at,
               u.created_at, u.updated_at, up.first_name, up.last_name, up.display_name
    `, [email]);

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return {
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      firstName: row.first_name,
      lastName: row.last_name,
      displayName: row.display_name,
      status: row.status,
      roles: row.roles.filter((role: string) => role !== null),
      emailVerifiedAt: row.email_verified_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  async findById(id: string): Promise<User | null> {
    const result = await pool.query(`
      SELECT 
        u.id, u.email, u.status, u.email_verified_at,
        u.created_at, u.updated_at,
        up.first_name, up.last_name, up.display_name, up.phone, up.bio, up.locale, up.timezone,
        ARRAY_AGG(r.name) as roles
      FROM users u
      LEFT JOIN user_profiles up ON u.id = up.user_id
      LEFT JOIN user_roles ur ON u.id = ur.user_id
      LEFT JOIN roles r ON ur.role_id = r.id
      WHERE u.id = $1 AND u.deleted_at IS NULL
      GROUP BY u.id, u.email, u.status, u.email_verified_at,
               u.created_at, u.updated_at, up.first_name, up.last_name, up.display_name,
               up.phone, up.bio, up.locale, up.timezone
    `, [id]);

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return {
      id: row.id,
      email: row.email,
      passwordHash: '', // Don't return password hash
      firstName: row.first_name,
      lastName: row.last_name,
      displayName: row.display_name,
      status: row.status,
      roles: row.roles.filter((role: string) => role !== null),
      emailVerifiedAt: row.email_verified_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  async findAll(options: FindUsersOptions): Promise<PaginatedResult<User>> {
    const { page, limit, search, status } = options;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE u.deleted_at IS NULL';
    const queryParams: unknown[] = [];
    let paramIndex = 1;

    if (search) {
      whereClause += ` AND (u.email ILIKE $${paramIndex} OR up.first_name ILIKE $${paramIndex} OR up.last_name ILIKE $${paramIndex})`;
      queryParams.push(`%${search}%`);
      paramIndex++;
    }

    if (status) {
      // Validate status against allowed values to prevent SQL injection
      const allowedStatuses = ['active', 'inactive', 'suspended', 'deleted'];
      if (!allowedStatuses.includes(status)) {
        throw new Error(`Invalid status value. Allowed values: ${allowedStatuses.join(', ')}`);
      }
      whereClause += ` AND u.status = $${paramIndex}`;
      queryParams.push(status);
      paramIndex++;
    }

    // Get total count
    const countResult = await pool.query(`
      SELECT COUNT(*) as total
      FROM users u
      LEFT JOIN user_profiles up ON u.id = up.user_id
      ${whereClause}
    `, queryParams);

    const total = parseInt(countResult.rows[0].total);

    // Get users
    const result = await pool.query(`
      SELECT 
        u.id, u.email, u.status, u.created_at, u.updated_at,
        up.first_name, up.last_name, up.display_name,
        ARRAY_AGG(r.name) as roles
      FROM users u
      LEFT JOIN user_profiles up ON u.id = up.user_id
      LEFT JOIN user_roles ur ON u.id = ur.user_id
      LEFT JOIN roles r ON ur.role_id = r.id
      ${whereClause}
      GROUP BY u.id, u.email, u.status, u.created_at, u.updated_at,
               up.first_name, up.last_name, up.display_name
      ORDER BY u.created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `, [...queryParams, limit, offset]);

    const users = result.rows.map(row => ({
      id: row.id,
      email: row.email,
      passwordHash: '',
      firstName: row.first_name,
      lastName: row.last_name,
      displayName: row.display_name,
      status: row.status,
      roles: row.roles.filter((role: string) => role !== null),
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));

    return {
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async updateProfile(id: string, updateData: UpdateUserData): Promise<User> {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      // Build parameterized query safely
      const allowedFields = ['first_name', 'last_name', 'display_name', 'phone', 'bio', 'locale', 'timezone'];
      const updateFields = Object.keys(updateData).filter(key => allowedFields.includes(key));
      
      if (updateFields.length === 0) {
        throw new Error('No valid fields to update');
      }

      const setClause = updateFields
        .map((field, index) => `${field} = $${index + 2}`)
        .join(', ');

      const values = [id, ...updateFields.map(field => updateData[field as keyof UpdateUserData])];

      await client.query(`
        UPDATE user_profiles 
        SET ${setClause}, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $1
      `, values);

      await client.query('COMMIT');

      // Return updated user
      const user = await this.findById(id);
      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      await client.query('ROLLBACK');
      logger.error('Error updating user profile:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  async updateStatus(id: string, status: string): Promise<User> {
    const result = await pool.query(`
      UPDATE users 
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2 AND deleted_at IS NULL
      RETURNING id, email, status, updated_at
    `, [status, id]);

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    const user = await this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async updatePassword(id: string, passwordHash: string): Promise<void> {
    await pool.query(`
      UPDATE users 
      SET password_hash = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2 AND deleted_at IS NULL
    `, [passwordHash, id]);
  }

  async verifyEmail(id: string): Promise<void> {
    await pool.query(`
      UPDATE users 
      SET email_verified_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1 AND deleted_at IS NULL
    `, [id]);
  }

  async delete(id: string): Promise<void> {
    await pool.query(`
      UPDATE users 
      SET deleted_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
    `, [id]);
  }

  // Method to properly close the database pool
  async closePool(): Promise<void> {
    await pool.end();
    logger.info('Database pool closed');
  }
}

export const userService = new UserService();
