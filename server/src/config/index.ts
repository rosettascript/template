import dotenv from 'dotenv';

dotenv.config();

export const config = {
  app: {
    port: parseInt(process.env.PORT || '5000', 10),
    host: process.env.HOST || '0.0.0.0',
    nodeEnv: process.env.NODE_ENV || 'development'
  },
  database: {
    user: process.env.PG_USER || '',
    host: process.env.PG_HOST || 'localhost',
    database: process.env.PG_DATABASE || '',
    password: process.env.PG_PASSWORD || '',
    port: parseInt(process.env.PG_PORT || '5432', 10),
    ssl: process.env.PG_SSL === 'true'
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: process.env.CORS_CREDENTIALS === 'true'
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10)
  },
  bcrypt: {
    rounds: parseInt(process.env.BCRYPT_ROUNDS || '12', 10)
  },
  upload: {
    path: process.env.UPLOAD_PATH || './uploads/',
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10),
    allowedTypes: process.env.ALLOWED_FILE_TYPES?.split(',') || []
  },
  email: {
    user: process.env.GMAIL_USER || '',
    pass: process.env.GMAIL_PASS || '',
    from: process.env.SMTP_FROM || ''
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || '',
    db: parseInt(process.env.REDIS_DB || '0', 10)
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || './logs/app.log'
  },
  external: {
    apiUrl: process.env.EXTERNAL_API_URL || '',
    apiKey: process.env.EXTERNAL_API_KEY || '',
    debug: process.env.DEBUG_API === 'true'
  }
};
