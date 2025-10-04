#!/bin/bash

# Template Setup Script
# This script sets up the development environment for the template project

set -e  # Exit on any error

echo "🚀 Setting up Template Project..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_nodejs() {
    print_status "Checking Node.js installation..."
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    print_success "Node.js $(node --version) is installed"
}

# Check if npm is installed
check_npm() {
    print_status "Checking npm installation..."
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm 8+"
        exit 1
    fi
    
    print_success "npm $(npm --version) is installed"
}

# Check if PostgreSQL is running
check_postgresql() {
    print_status "Checking PostgreSQL installation..."
    if ! command -v psql &> /dev/null; then
        print_warning "PostgreSQL is not installed or not in PATH"
        print_warning "Please install PostgreSQL 15+ or use Docker for the database"
        return 1
    fi
    
    # Check if PostgreSQL is running
    if ! pg_isready &> /dev/null; then
        print_warning "PostgreSQL is not running. Please start PostgreSQL or use Docker"
        return 1
    fi
    
    print_success "PostgreSQL is running"
    return 0
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Install root dependencies
    npm install
    
    # Install client dependencies
    print_status "Installing client dependencies..."
    cd client
    npm install
    cd ..
    
    # Install server dependencies
    print_status "Installing server dependencies..."
    cd server
    npm install
    cd ..
    
    print_success "Dependencies installed successfully"
}

# Setup environment files
setup_environment() {
    print_status "Setting up environment files..."
    
    # Client environment
    if [ ! -f "client/.env" ]; then
        cp client/.env.example client/.env
        print_success "Created client/.env from template"
    else
        print_warning "client/.env already exists, skipping..."
    fi
    
    # Server environment
    if [ ! -f "server/.env" ]; then
        cp server/.env.example server/.env
        print_success "Created server/.env from template"
    else
        print_warning "server/.env already exists, skipping..."
    fi
    
    print_warning "Please update the environment files with your actual values:"
    print_warning "- client/.env: Update API URLs and feature flags"
    print_warning "- server/.env: Update database credentials, JWT secrets, etc."
}

# Setup database (if PostgreSQL is available)
setup_database() {
    if check_postgresql; then
        print_status "Setting up database..."
        cd server
        npm run migrate
        npm run seed
        cd ..
        print_success "Database setup completed"
    else
        print_warning "Skipping database setup. Use Docker or install PostgreSQL manually"
        print_warning "To use Docker: npm run docker:dev"
    fi
}

# Setup Git hooks (optional)
setup_git_hooks() {
    print_status "Setting up Git configuration..."
    
    # Set commit template
    if [ -f ".gitmessage" ]; then
        git config commit.template .gitmessage
        print_success "Git commit template configured"
    fi
    
    # Initialize git if not already initialized
    if [ ! -d ".git" ]; then
        print_status "Initializing Git repository..."
        git init
        git add .
        git commit -m "feat: initial template setup"
        print_success "Git repository initialized"
    fi
}

# Build projects
build_projects() {
    print_status "Building projects..."
    
    # Build client
    cd client
    npm run build
    cd ..
    
    # Build server
    cd server
    npm run build
    cd ..
    
    print_success "Projects built successfully"
}

# Run tests
run_tests() {
    print_status "Running tests..."
    npm test
    print_success "Tests completed"
}

# Main setup function
main() {
    echo "🎯 Template Project Setup"
    echo "========================="
    
    # Check prerequisites
    check_nodejs
    check_npm
    
    # Install dependencies
    install_dependencies
    
    # Setup environment
    setup_environment
    
    # Setup database (if available)
    setup_database
    
    # Setup Git
    setup_git_hooks
    
    # Build projects
    build_projects
    
    # Run tests
    run_tests
    
    echo ""
    echo "🎉 Setup completed successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Update environment files with your actual values"
    echo "2. Start development servers:"
    echo "   - npm run dev (both client and server)"
    echo "   - or npm run dev:client (client only)"
    echo "   - or npm run dev:server (server only)"
    echo "3. Or use Docker: npm run docker:dev"
    echo ""
    echo "📚 Documentation:"
    echo "- README.md - Main documentation"
    echo "- PROJECT-STRUCTURE.md - Project structure guide"
    echo "- docs/DEPLOYMENT.md - Deployment guide"
    echo "- docs/MONITORING.md - Monitoring guide"
    echo "- CONTRIBUTING.md - Contributing guidelines"
    echo ""
    echo "🌐 Access points:"
    echo "- Frontend: http://localhost:5173"
    echo "- Backend API: http://localhost:5000"
    echo "- API Health: http://localhost:5000/api/health"
}

# Run main function
main "$@"
