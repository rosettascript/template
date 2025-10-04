module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // Core Development Standards
    'max-lines': ['error', 500],
    'no-duplicate-imports': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'no-console': 'warn',
    
    // TypeScript Rules
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    
    // Import Organization (commented out due to plugin conflicts)
    // 'import/order': [
    //   'error',
    //   {
    //     groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
    //     'newlines-between': 'always',
    //     alphabetize: { order: 'asc' },
    //   },
    // ],
  },
  overrides: [
    {
      // Client-specific rules
      files: ['client/**/*.{ts,tsx}'],
      env: {
        browser: true,
      },
      extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
      ],
      plugins: ['react', 'react-hooks', 'jsx-a11y'],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        // React Rules
        'react/function-component-definition': [
          'error',
          { namedComponents: 'arrow-function' },
        ],
        'react/prop-types': 'off',
        'react/jsx-no-useless-fragment': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        
        // Accessibility
        'jsx-a11y/anchor-is-valid': 'warn',
        'jsx-a11y/alt-text': 'error',
      },
    },
    {
      // Server-specific rules
      files: ['server/**/*.{ts,js}'],
      env: {
        node: true,
      },
      rules: {
        // Node.js specific rules
        'no-process-env': 'off',
        'no-process-exit': 'warn',
      },
    },
  ],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    '*.config.js',
    '*.config.ts',
  ],
};
