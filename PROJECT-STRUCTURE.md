# Project Structure

This document outlines the organized structure of the Template project.

## 📁 Root Directory Structure

```
template/
├── 📁 client/              # React frontend application
├── 📁 server/              # Express.js backend application  
├── 📁 deployment/          # Docker and deployment configs
├── 📁 monitoring/          # Monitoring and observability
├── 📁 docker/              # Docker configurations
├── 📁 docs/                # Documentation
├── 📁 .cursor/             # IDE configuration
├── 📁 .github/             # GitHub workflows
├── 📁 system-requirements/ # System requirements docs
├── 📄 package.json         # Root package.json with scripts
└── 📄 README.md           # Main documentation
```

## 🔧 Development Workflow

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

### Running with Docker
```bash
# From root directory
npm run docker:up        # Production deployment
npm run docker:dev       # Development deployment
npm run docker:monitoring # With full monitoring stack
```

## 📂 Directory Details

### `/client/` - Frontend Application
- **React 18** with TypeScript and Vite
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Query** for server state
- **Testing** with Vitest and React Testing Library

### `/server/` - Backend Application  
- **Express.js** with TypeScript
- **PostgreSQL** database
- **JWT** authentication
- **Winston** logging
- **Testing** with Jest and Supertest

### `/deployment/` - Deployment Configurations
- `docker-compose.yml` - Production setup
- `docker-compose.dev.yml` - Development setup  
- `docker-compose.monitoring.yml` - With monitoring stack
- `Dockerfile.client` - Frontend container
- `Dockerfile.server` - Backend container

### `/monitoring/` - Monitoring Stack
- `prometheus/` - Metrics collection
- `grafana/` - Visualization dashboards
- `alertmanager/` - Alert management

### `/docker/` - Docker Configurations
- `nginx.conf` - Nginx configuration
- `default.conf` - Site configuration

### `/docs/` - Documentation
- `DEPLOYMENT.md` - Deployment guide
- `MONITORING.md` - Monitoring guide

### `/.github/` - GitHub Integration
- `workflows/` - CI/CD pipelines
- `dependabot.yml` - Dependency updates

## 🚀 Quick Start Commands

### Development
```bash
# Install dependencies
npm run setup

# Run both client and server in development
npm run dev

# Or run separately
npm run dev:client    # Frontend only
npm run dev:server    # Backend only
```

### Testing
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run client tests only
npm run test:client

# Run server tests only  
npm run test:server
```

### Docker
```bash
# Build and start all services
npm run docker:up

# Development mode
npm run docker:dev

# With monitoring
npm run docker:monitoring
```

### Code Quality
```bash
# Lint all code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check
```

## 📋 Environment Setup

### Required Environment Variables

#### Client (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Template App
```

#### Server (`server/.env`)
```env
NODE_ENV=development
PG_HOST=localhost
PG_DATABASE=template_db
PG_USER=postgres
PG_PASSWORD=postgres
JWT_SECRET=your-secret-key
```

## 🔄 CI/CD Pipeline

The project includes comprehensive CI/CD with:
- **Automated testing** on every PR
- **Code quality checks** (ESLint, Prettier, TypeScript)
- **Security scanning** with Trivy
- **Coverage reporting** with Codecov
- **Dependency updates** with Dependabot

## 📊 Monitoring & Observability

Full monitoring stack includes:
- **Prometheus** for metrics collection
- **Grafana** for visualization
- **AlertManager** for alerting
- **Custom application metrics**
- **Performance monitoring**
- **Security monitoring**
