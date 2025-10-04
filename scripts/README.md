# Scripts

This directory contains utility scripts for the Template project.

## Available Scripts

### `setup.sh`
Automated setup script for the development environment.

**Usage:**
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

**What it does:**
- Checks prerequisites (Node.js, npm, PostgreSQL)
- Installs all dependencies (root, client, server)
- Creates environment files from templates
- Sets up database (migrations, seeds)
- Configures Git hooks and commit template
- Builds the projects
- Runs tests to verify setup

**Requirements:**
- Node.js 18+
- npm 8+
- PostgreSQL 15+ (optional, can use Docker instead)

## Adding New Scripts

When adding new scripts to this directory:

1. **Make them executable**: `chmod +x script-name.sh`
2. **Add documentation**: Update this README
3. **Follow conventions**: Use descriptive names and proper error handling
4. **Test thoroughly**: Ensure scripts work in different environments
5. **Update references**: Update any documentation that references the scripts

## Best Practices

- Use `set -e` to exit on errors
- Provide colored output for better UX
- Include proper error messages
- Check prerequisites before execution
- Make scripts idempotent when possible
