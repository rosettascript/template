# Template Server - Express.js Backend

A modern, production-ready Express.js server built with TypeScript, featuring comprehensive authentication, database management, and API endpoints.

## 🚀 Features

- **Express.js** - Fast, unopinionated web framework
- **TypeScript** - Full type safety and better developer experience
- **PostgreSQL** - Robust relational database with comprehensive schema
- **JWT Authentication** - Secure token-based authentication system
- **Role-Based Access Control** - Granular permission system
- **Database Migrations** - Version-controlled schema management
- **Security Middleware** - Helmet, CORS, rate limiting, input validation
- **Logging System** - Winston-based structured logging
- **Email Service** - Nodemailer integration for notifications
- **API Documentation** - Comprehensive endpoint documentation

## 📁 Project Structure

```
server/
├── src/
│   ├── config/         # Configuration management
│   ├── controllers/    # Request handlers and business logic
│   ├── middlewares/    # Express middleware (auth, validation, error handling)
│   ├── routes/         # API route definitions
│   ├── services/       # Business logic and external integrations
│   ├── models/         # Data models and database schemas
│   ├── database/       # SQL files for schema, migrations, and seeds
│   │   ├── main-schema.sql    # Core database schema
│   │   ├── extensions.sql     # PostgreSQL extensions
│   │   ├── functions.sql      # Database functions
│   │   ├── triggers.sql       # Database triggers
│   │   ├── indexes.sql        # Performance indexes
│   │   ├── inserts.sql        # Seed data
│   │   └── procedures.sql     # Stored procedures
│   ├── scripts/       # Database and deployment scripts
│   │   ├── database/   # Migration, seeding, optimization
│   │   ├── nginx/     # Nginx configuration
│   │   ├── pm2/       # PM2 process management
│   │   └── redis/      # Redis configuration
│   └── utils/          # Utility functions and helpers
├── uploads/            # File upload directory
├── logs/              # Application logs
└── docs/              # API documentation
```

## 🛠️ Technology Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Winston** - Logging library
- **Nodemailer** - Email service
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **express-rate-limit** - Rate limiting
- **express-validator** - Input validation

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **PostgreSQL** 12+
- **npm** or **yarn**

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Environment Setup**
```bash
cp .env.example .env
```

3. **Configure Environment Variables**
```env
# Database Configuration
PG_USER=your_db_user
PG_HOST=localhost
PG_DATABASE=template_db
PG_PASSWORD=your_db_password
PG_PORT=5432
PG_SSL=false

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d

# Application Configuration
PORT=5000
NODE_ENV=development
HOST=0.0.0.0

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
CORS_CREDENTIALS=true

# Security Configuration
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Email Configuration
GMAIL_USER=rosettascript@gmail.com
GMAIL_PASS=your_app_password
SMTP_FROM=noreply@rosettascript.com

# File Upload Configuration
UPLOAD_PATH=./uploads/
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif

# Logging Configuration
LOG_LEVEL=info
LOG_FILE=./logs/app.log
```

4. **Database Setup**
```bash
# Complete setup (install, migrate, seed, optimize)
npm run setup

# Or run individually:
npm run migrate    # Run database migrations
npm run seed       # Seed database with sample data
npm run optimize   # Optimize database performance
```

5. **Start Development Server**
```bash
npm run dev
```

The server will be available at `http://localhost:5000`

## 📚 Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server
npm run setup        # Complete setup (install, migrate, seed, optimize)
npm run migrate      # Run database migrations
npm run seed         # Seed database with sample data
npm run optimize     # Optimize database performance
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

## 🗄️ Database Schema

### Core Tables

- **users** - User accounts and authentication
- **user_profiles** - Extended user information
- **roles** - System and custom roles
- **user_roles** - Many-to-many user-role relationships
- **user_metadata** - Dynamic user attributes (key-value store)
- **user_preferences** - Application settings
- **user_sessions** - Active user sessions
- **user_audit_log** - Change tracking and audit trail

### Key Features

- **UUID Primary Keys** - Globally unique identifiers
- **Soft Deletes** - Preserve data integrity with `deleted_at` timestamps
- **Audit Logging** - Track all user changes and actions
- **Role-Based Access** - Granular permission system
- **Metadata System** - Flexible user attributes
- **Session Management** - Track user logins across applications

## 🌐 API Endpoints

### Authentication
```
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
POST   /api/auth/logout            # User logout
POST   /api/auth/refresh           # Refresh JWT token
POST   /api/auth/verify-email      # Email verification
POST   /api/auth/forgot-password   # Password reset request
POST   /api/auth/reset-password    # Password reset
```

### Users
```
GET    /api/users/profile          # Get current user profile
PUT    /api/users/profile          # Update user profile
GET    /api/users                  # Get all users (admin only)
GET    /api/users/:id              # Get user by ID (admin only)
PATCH  /api/users/:id/status       # Update user status (admin only)
DELETE /api/users/:id              # Delete user (admin only)
```

### Health
```
GET    /api/health                 # Health check
GET    /api/health/ready           # Readiness check
```

## 🔒 Security Features

### Authentication & Authorization
- JWT tokens with configurable expiration
- Role-based access control (RBAC)
- Secure password hashing with bcrypt (12 rounds)
- Session management
- Email verification system

### Input Validation & Sanitization
- Express-validator for comprehensive input validation
- SQL injection prevention with parameterized queries
- XSS protection
- CSRF protection
- Rate limiting (100 requests per 15 minutes)

### Security Headers
- Helmet.js for security headers
- CORS configuration
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options

## 📊 Logging & Monitoring

### Winston Logging
- Structured JSON logging
- Multiple log levels (error, warn, info, debug)
- File rotation and size limits
- Console and file outputs

### Log Categories
- Authentication events
- API requests and responses
- Database operations
- Security events
- Error tracking

## 📧 Email Service

### Features
- Email verification
- Password reset
- Welcome emails
- Notification system

### Configuration
```env
GMAIL_USER=rosettascript@gmail.com
GMAIL_PASS=your_app_password
SMTP_FROM=noreply@rosettascript.com
```

## 🗂️ File Upload

### Configuration
```env
UPLOAD_PATH=./uploads/
MAX_FILE_SIZE=10485760  # 10MB
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif
```

### Features
- File type validation
- Size limits
- Secure file storage
- Path sanitization

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Configuration
- Set `NODE_ENV=production`
- Configure production database
- Set up email service
- Configure logging
- Set up monitoring

### Deployment Options
- **PM2** - Process management
- **Nginx** - Reverse proxy
- **Docker** - Containerized deployment
- **Cloud Platforms** - AWS, GCP, Azure

## 🧪 Development Guidelines

### Code Quality Standards
- **File Size Limit**: Maximum 500 lines per file
- **Code Duplication**: Always check existing implementations
- **No Hardcoding**: Use environment variables for configuration
- **Type Safety**: Use TypeScript throughout
- **Error Handling**: Implement proper error handling and logging

### Database Best Practices
- Use parameterized queries to prevent SQL injection
- Implement proper transaction handling
- Use database connection pooling
- Follow the schema defined in `main-schema.sql`
- Use migrations for database changes

### API Development
- Follow RESTful conventions
- Use proper HTTP status codes
- Implement consistent response format
- Use middleware for cross-cutting concerns
- Document all endpoints

## 🔧 Development Setup

### Database Development
```bash
# Start PostgreSQL
sudo service postgresql start

# Create database
createdb template_db

# Run migrations
npm run migrate

# Seed with sample data
npm run seed
```

### Development Server
```bash
# Start with hot reload
npm run dev

# Server runs on http://localhost:5000
# API available at http://localhost:5000/api
```

### CORS Configuration
For development across devices:
```env
# Local development
CORS_ORIGIN=http://localhost:3000

# Network development (replace with your IP)
CORS_ORIGIN=http://192.168.1.69:3000
```

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "statusCode": 400
  }
}
```

## 🤝 Contributing

1. Follow the established code style and patterns
2. Write meaningful commit messages
3. Test your changes thoroughly
4. Ensure all files are under 500 lines
5. Check for code duplication before implementing new features
6. Use TypeScript types throughout
7. Follow security best practices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

**Built with ❤️ using Express.js and TypeScript**