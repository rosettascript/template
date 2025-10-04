# Contributing to Template

Thank you for your interest in contributing to this template project! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and constructive in all interactions.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/template.git
   cd template
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/template.git
   ```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ and npm 8+
- PostgreSQL 15+
- Git

### Setup Steps
```bash
# Install dependencies
npm run setup

# Set up environment variables
cp server/.env.example server/.env
cp client/.env.example client/.env

# Start the database (PostgreSQL)
# Make sure PostgreSQL is running on port 5432

# Run database migrations and seeds
npm run migrate && npm run seed

# Start development servers
npm run dev
```

### Docker Setup (Alternative)
```bash
# Start with Docker
npm run docker:dev
```

## 🔄 Making Changes

### Branch Strategy
- Create a feature branch from `main`:
  ```bash
  git checkout main
  git pull upstream main
  git checkout -b feature/your-feature-name
  ```

### Commit Convention
We follow conventional commits. Use the provided commit message template:
```bash
git config commit.template .gitmessage
```

Commit format: `<type>(<scope>): <subject>`

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(client): add user authentication
fix(server): resolve database connection issue
docs: update deployment guide
```

## 🔍 Pull Request Process

### Before Submitting
1. **Run tests**: `npm test`
2. **Check linting**: `npm run lint`
3. **Type checking**: `npm run type-check`
4. **Build verification**: `npm run build`
5. **Update documentation** if needed

### PR Guidelines
1. **Use the PR template** - fill out all sections
2. **Keep PRs focused** - one feature/fix per PR
3. **Write descriptive titles** and descriptions
4. **Link related issues** using keywords like "Fixes #123"
5. **Add screenshots/videos** for UI changes
6. **Ensure all checks pass** before requesting review

### Review Process
- All PRs require at least one approval
- Address review feedback promptly
- Keep PRs up to date with main branch
- Squash commits before merging

## 📏 Coding Standards

### General Guidelines
- **File size limit**: Maximum 500 lines per file
- **No code duplication**: Check existing implementations first
- **Use TypeScript**: Strict mode enabled
- **Environment variables**: Never hardcode values
- **Error handling**: Proper try-catch blocks and error responses

### Code Style
- **ESLint**: Follow the configured rules
- **Prettier**: Automatic code formatting
- **Import organization**: Use the defined import order
- **Naming conventions**: 
  - Variables: camelCase
  - Functions: camelCase
  - Components: PascalCase
  - Constants: UPPER_SNAKE_CASE

### TypeScript
- **No `any` types**: Use proper TypeScript types
- **Interface definitions**: Define clear interfaces
- **Type safety**: Leverage TypeScript's type system
- **Generic types**: Use generics where appropriate

### React Guidelines
- **Functional components**: Use function components with hooks
- **Props interface**: Define TypeScript interfaces for props
- **Custom hooks**: Extract reusable logic into custom hooks
- **Component composition**: Prefer composition over inheritance

### Express.js Guidelines
- **Middleware**: Use proper middleware for cross-cutting concerns
- **Error handling**: Centralized error handling
- **Validation**: Validate all inputs using express-validator
- **Security**: Follow security best practices

## 🧪 Testing

### Test Requirements
- **Unit tests**: Test individual functions and components
- **Integration tests**: Test API endpoints and database interactions
- **Coverage**: Maintain good test coverage
- **Test names**: Use descriptive test names

### Running Tests
```bash
# All tests
npm test

# With coverage
npm run test:coverage

# Client tests only
npm run test:client

# Server tests only
npm run test:server
```

### Writing Tests
- **Follow AAA pattern**: Arrange, Act, Assert
- **Mock external dependencies**: Database, APIs, etc.
- **Test edge cases**: Error conditions, boundary values
- **Keep tests focused**: One assertion per test when possible

## 📚 Documentation

### Code Documentation
- **JSDoc comments**: For functions and classes
- **README updates**: Update relevant sections
- **Inline comments**: For complex logic
- **Type definitions**: Clear TypeScript interfaces

### API Documentation
- **Endpoint documentation**: Describe all API endpoints
- **Request/response examples**: Provide clear examples
- **Error responses**: Document possible error cases
- **Authentication**: Document auth requirements

## 🐛 Bug Reports

When reporting bugs, please include:
- **Clear description**: What happened vs. what you expected
- **Steps to reproduce**: Detailed reproduction steps
- **Environment**: OS, Node.js version, browser, etc.
- **Logs**: Relevant error messages and logs
- **Screenshots**: If applicable

## ✨ Feature Requests

When requesting features, please include:
- **Problem description**: What problem does this solve?
- **Proposed solution**: How should it work?
- **Alternatives considered**: What other options exist?
- **Additional context**: Any other relevant information

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Documentation**: Check existing docs first

## 🎉 Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes for significant contributions
- GitHub contributors graph

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to this project! 🚀
