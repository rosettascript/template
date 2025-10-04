# Template App - Full Stack Application

A modern, production-ready full-stack application built with the PERN stack (PostgreSQL, Express.js, React, Node.js) featuring complete separation of client and server components.

## 🚀 Features

### Backend (Server)
- **Express.js** - Fast, unopinionated web framework
- **TypeScript** - Full type safety and better developer experience
- **PostgreSQL** - Robust relational database
- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - Granular permission system
- **Database Migrations** - Version-controlled schema management
- **API Documentation** - Comprehensive endpoint documentation
- **Security Middleware** - Helmet, CORS, rate limiting
- **Logging System** - Winston-based structured logging
- **Email Service** - Nodemailer integration for notifications

### Frontend (Client)
- **React 18** - Latest React with concurrent features
- **TypeScript** - Full type safety and better developer experience
- **Vite** - Lightning fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework with design system
- **React Router** - Client-side routing with protected routes
- **Zustand** - Lightweight state management
- **React Query** - Server state management and caching
- **React Hook Form** - Performant forms with validation
- **React Hot Toast** - Beautiful toast notifications
- **Responsive Design** - Mobile-first approach

## 📁 Project Structure

```
template/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service functions
│   │   ├── stores/         # Zustand state stores
│   │   ├── types/          # TypeScript type definitions
│   │   ├── utils/          # Utility functions
│   │   └── styles/         # Global styles and design system
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── server/                 # Express.js backend application
│   ├── src/
│   │   ├── config/         # Configuration management
│   │   ├── controllers/    # Request handlers
│   │   ├── middlewares/    # Express middleware
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic
│   │   ├── models/         # Data models
│   │   ├── database/       # SQL files and migrations
│   │   ├── scripts/        # Database and deployment scripts
│   │   └── utils/          # Utility functions
│   └── package.json        # Backend dependencies
├── scripts/                # Deployment and setup scripts
├── .cursor/                # Cursor IDE rules and guidelines
└── README.md              # This file
```

## 🛠️ Technology Stack

### Backend
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

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - CSS framework
- **React Router** - Client-side routing
- **Zustand** - State management
- **React Query** - Server state management
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications
- **Lucide React** - Icon library
- **Axios** - HTTP client

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Nodemon** - Development server
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🚀 Quick Start

### Automated Setup (Recommended)
```bash
# Clone the repository
git clone <repository-url>
cd template

# Run the automated setup script
chmod +x setup.sh
./setup.sh
```

The setup script will:
- Check prerequisites (Node.js, npm)
- Install all dependencies
- Create environment files from templates
- Set up the database (if PostgreSQL is available)
- Configure Git hooks
- Build the projects
- Run tests

### Manual Setup

### Prerequisites
- **Node.js** 18+ 
- **PostgreSQL** 12+
- **npm** or **yarn**

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd template
```

2. **Install dependencies**
```bash
# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

3. **Environment Setup**
```bash
# Copy environment files
cp server/.env.example server/.env
cp client/.env.example client/.env
```

4. **Configure Environment Variables**
   
   **Server (.env)**:
   ```env
   PG_USER=your_db_user
   PG_HOST=localhost
   PG_DATABASE=template_db
   PG_PASSWORD=your_db_password
   PG_PORT=5432
   JWT_SECRET=your_jwt_secret
   PORT=5000
   CORS_ORIGIN=http://localhost:3000
   ```

   **Client (.env)**:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=Template App
   VITE_APP_VERSION=1.0.0
   ```

5. **Database Setup**
```bash
cd server
npm run setup  # Installs deps, migrates, seeds, and optimizes
```

6. **Start Development Servers**
```bash
# Terminal 1 - Start server
cd server && npm run dev

# Terminal 2 - Start client
cd client && npm run dev
```

7. **Access the Application**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Health**: http://localhost:5000/api/health

## 📚 Development Guidelines

### Code Quality Standards
- **File Size Limit**: Maximum 500 lines per file
- **Code Duplication**: Always check existing implementations
- **No Hardcoding**: Use environment variables for configuration
- **Type Safety**: Use TypeScript throughout
- **Error Handling**: Implement proper error handling and logging

### Design System
- **Unified Design**: Single source of truth for all design values
- **Component Consistency**: Standardized API across all components
- **Centralized Styling**: All styles defined in configuration files
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG compliance built-in

### Git Workflow
- Use meaningful commit messages
- Create feature branches for new development
- Test changes before committing
- Follow the established code style and patterns

## 🗄️ Database Schema

The application includes a comprehensive user management system:

### Core Tables
- **users** - User accounts and authentication
- **user_profiles** - Extended user information
- **roles** - System and custom roles
- **user_roles** - Many-to-many user-role relationships
- **user_metadata** - Dynamic user attributes
- **user_preferences** - Application settings
- **user_sessions** - Active user sessions
- **user_audit_log** - Change tracking

### Key Features
- **UUID Primary Keys** - Globally unique identifiers
- **Soft Deletes** - Preserve data integrity
- **Audit Logging** - Track all changes
- **Role-Based Access** - Granular permissions
- **Metadata System** - Flexible user attributes

## 🔧 Available Scripts

### Server Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run migrate      # Run database migrations
npm run seed         # Seed database with sample data
npm run optimize     # Optimize database performance
npm run setup        # Complete setup (install, migrate, seed, optimize)
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

### Client Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check    # Run TypeScript type checking
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user by ID (admin)
- `PATCH /api/users/:id/status` - Update user status (admin)
- `DELETE /api/users/:id` - Delete user (admin)

### Health
- `GET /api/health` - Health check
- `GET /api/health/ready` - Readiness check

## 🔒 Security Features

### Authentication & Authorization
- JWT tokens with configurable expiration
- Role-based access control (RBAC)
- Secure password hashing with bcrypt
- Session management
- Email verification

### Input Validation & Sanitization
- Express-validator for input validation
- SQL injection prevention
- XSS protection
- CSRF protection
- Rate limiting

### Security Headers
- Helmet.js for security headers
- CORS configuration
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options

## 📱 Responsive Design

The application is built with a mobile-first approach:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🧪 Testing

### Comprehensive Testing Suite
- **Unit Tests**: Individual component and function testing
- **Integration Tests**: API endpoint and service testing
- **E2E Tests**: End-to-end user flow testing
- **Coverage Reports**: Detailed test coverage analysis

### Backend Testing
- Jest testing framework with TypeScript support
- Supertest for API endpoint testing
- Database testing with test fixtures
- Mock services and external dependencies

### Frontend Testing
- Vitest for fast unit testing
- React Testing Library for component testing
- User event simulation and interaction testing
- Accessibility testing with jest-dom matchers

### Test Commands
```bash
# Client tests
npm run test          # Run tests in watch mode
npm run test:run      # Run tests once
npm run test:coverage # Generate coverage report
npm run test:ui       # Run tests with UI

# Server tests
npm run test          # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## 🚀 Deployment

### Docker Deployment
```bash
# Production deployment
npm run docker:up

# Development deployment
npm run docker:dev

# With monitoring
npm run docker:monitoring

# Or manually from deployment folder
cd deployment
docker-compose up -d
```

### Production Build
```bash
# Build both client and server
cd client && npm run build
cd ../server && npm run build
```

### Environment Configuration
- Configure production environment variables
- Set up PostgreSQL database
- Configure email service
- Set up logging and monitoring

### Deployment Options
- **Docker**: Complete containerized deployment with multi-stage builds
- **PM2**: Process management for Node.js applications
- **Nginx**: Reverse proxy with optimized configuration
- **Cloud Platforms**: AWS, GCP, Azure, Vercel, Netlify
- **Kubernetes**: Container orchestration ready

## 📊 Monitoring & Observability

### Comprehensive Monitoring Stack
- **Prometheus**: Metrics collection and storage
- **Grafana**: Visualization and dashboards
- **Node Exporter**: System metrics
- **cAdvisor**: Container metrics
- **Redis/PostgreSQL Exporters**: Database metrics
- **AlertManager**: Alert management

### Application Metrics
- HTTP request metrics (count, duration, status codes)
- Database connection metrics
- Cache hit/miss ratios
- Memory and CPU usage
- Custom business metrics

### Monitoring Endpoints
- `/api/metrics` - Prometheus metrics
- `/api/health/detailed` - Detailed health information
- `/api/system/info` - System information

### Access Monitoring
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3001 (admin/admin)
- **AlertManager**: http://localhost:9093

## 🔄 CI/CD Pipeline

### Automated Workflows
- **Code Quality**: ESLint, Prettier, TypeScript checks
- **Testing**: Unit, integration, and coverage tests
- **Security**: Dependency scanning with Trivy
- **Build**: Automated builds for client and server
- **Deployment**: Staging and production deployments

### Pipeline Features
- **Multi-stage builds**: Separate client and server testing
- **Database testing**: PostgreSQL service for integration tests
- **Dependency management**: Automated dependency updates with Dependabot
- **Security scanning**: Vulnerability detection and reporting
- **Coverage reporting**: Code coverage tracking with Codecov

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the coding standards and guidelines
4. Ensure all files are under 500 lines
5. Check for code duplication
6. Write meaningful commit messages
7. Run tests locally (`npm test`)
8. Ensure all CI checks pass
9. Commit your changes (`git commit -m 'Add amazing feature'`)
10. Push to the branch (`git push origin feature/amazing-feature`)
11. Open a Pull Request

## 📋 Quick Reference

### Running Applications Separately
```bash
# Frontend (React + Vite)
cd client
npm install
npm run dev          # Development server
npm run build        # Production build
npm run test         # Run tests

# Backend (Express + TypeScript)  
cd server
npm install
npm run dev          # Development server with nodemon
npm run start        # Production server
npm run test         # Run tests
```

### Docker Commands
```bash
# From root directory
npm run docker:up        # Production deployment
npm run docker:dev       # Development deployment
npm run docker:monitoring # With full monitoring stack
```

### Testing Commands
```bash
npm test                 # Run all tests
npm run test:coverage    # Run with coverage
npm run test:client      # Frontend tests only
npm run test:server      # Backend tests only
```

### Code Quality
```bash
npm run lint            # Lint all code
npm run lint:fix        # Fix linting issues
npm run format          # Format code
npm run type-check      # TypeScript checking
```

For detailed information, see:
- [Project Structure](PROJECT-STRUCTURE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Monitoring Guide](docs/MONITORING.md)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Review the documentation in each directory
3. Follow the development guidelines
4. Ensure all environment variables are configured correctly

## 🎯 Roadmap

- [ ] Docker containerization
- [ ] CI/CD pipeline setup
- [ ] Comprehensive testing suite
- [ ] API documentation with Swagger
- [ ] Real-time features with WebSockets
- [ ] File upload and management
- [ ] Advanced user management features
- [ ] Performance monitoring and analytics
- [ ] Internationalization (i18n)
- [ ] Dark mode support

---

**Built with ❤️ using the PERN stack**