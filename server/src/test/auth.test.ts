import request from 'supertest'
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import { Pool } from 'pg'
import app from '../index'
import { config } from '../config'

// Test database setup
const testPool = new Pool({
  user: config.database.user,
  host: config.database.host,
  database: config.database.database + '_test',
  password: config.database.password,
  port: config.database.port,
})

describe('Auth API', () => {
  beforeEach(async () => {
    // Clean up test database
    await testPool.query('DELETE FROM users WHERE email LIKE $1', ['test@%'])
  })

  afterEach(async () => {
    // Clean up after each test
    await testPool.query('DELETE FROM users WHERE email LIKE $1', ['test@%'])
    await testPool.end()
  })

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'Test',
        lastName: 'User',
      }

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201)

      expect(response.body.success).toBe(true)
      expect(response.body.data.user.email).toBe(userData.email)
      expect(response.body.data.token).toBeDefined()
    })

    it('should fail with invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'Password123!',
        firstName: 'Test',
        lastName: 'User',
      }

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toBeDefined()
    })

    it('should fail with weak password', async () => {
      const userData = {
        email: 'test@example.com',
        password: '123',
        firstName: 'Test',
        lastName: 'User',
      }

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400)

      expect(response.body.success).toBe(false)
    })
  })

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a test user
      const userData = {
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'Test',
        lastName: 'User',
      }

      await request(app)
        .post('/api/auth/register')
        .send(userData)
    })

    it('should login with valid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'Password123!',
      }

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data.token).toBeDefined()
      expect(response.body.data.user.email).toBe(loginData.email)
    })

    it('should fail with invalid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword',
      }

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401)

      expect(response.body.success).toBe(false)
      expect(response.body.error.message).toContain('Invalid credentials')
    })
  })
})
