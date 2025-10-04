# Template Client - React Frontend

A modern, production-ready React application built with TypeScript, Vite, and Tailwind CSS, featuring a comprehensive design system and unified styling.

## 🚀 Features

- **React 18** - Latest React with concurrent features
- **TypeScript** - Full type safety and better developer experience
- **Vite** - Lightning fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework with design system
- **React Router** - Client-side routing with protected routes
- **Zustand** - Lightweight state management
- **React Query** - Server state management and caching
- **React Hook Form** - Performant forms with validation
- **React Hot Toast** - Beautiful toast notifications
- **Lucide React** - Modern icon library
- **Axios** - HTTP client with interceptors
- **ESLint** - Code quality and consistency

## 📁 Project Structure

```
client/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Common components (Button, Input, etc.)
│   │   ├── forms/          # Form components (Login, Register)
│   │   └── layout/         # Layout components (Header, Footer, Layout)
│   ├── pages/              # Page components (Home, Dashboard, Profile)
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts      # Authentication hook
│   │   ├── useForm.ts      # Form management hook
│   │   └── useLocalStorage.ts # Local storage hook
│   ├── services/           # API service functions
│   │   ├── api.ts          # Base API service
│   │   └── authService.ts  # Authentication service
│   ├── stores/             # Zustand state stores
│   │   └── authStore.ts    # Authentication store
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── styles/             # Global styles and design system
│       ├── index.css       # Global styles with component classes
│       ├── design-tokens.ts # Centralized design values
│       └── design-system.md # Design system documentation
├── public/                 # Static assets
├── index.html             # HTML template
└── package.json           # Dependencies and scripts
```

## 🛠️ Technology Stack

- **React 18** - UI library with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - CSS framework with design system
- **React Router** - Client-side routing
- **Zustand** - State management
- **React Query** - Server state management
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications
- **Lucide React** - Icon library
- **Axios** - HTTP client
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
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
# API Configuration
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=Template App
VITE_APP_VERSION=1.0.0

# Environment
VITE_NODE_ENV=development

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

4. **Start Development Server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📚 Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check    # Run TypeScript type checking
```

## 🎨 Design System

### Unified Design Principles
- **Single Source of Truth** - All design values centralized in `tailwind.config.js`
- **Component Consistency** - Standardized API across all components
- **Centralized Styling** - All styles defined in configuration files
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG compliance built-in

### Design Tokens
All design values are defined in `src/styles/design-tokens.ts`:
- **Colors** - Primary, secondary, semantic colors
- **Typography** - Font families, sizes, weights
- **Spacing** - 4px base unit spacing scale
- **Border Radius** - Consistent radius values
- **Shadows** - Predefined shadow system
- **Animations** - Duration and easing scales

### Component Classes
Predefined component classes in `src/styles/index.css`:
```css
/* Button Components */
.btn-primary, .btn-secondary, .btn-outline, .btn-danger

/* Input Components */
.input, .input-error, .input-success, .input-warning

/* Card Components */
.card, .card-header, .card-body, .card-footer

/* Alert Components */
.alert-success, .alert-warning, .alert-error, .alert-info

/* Badge Components */
.badge-primary, .badge-secondary, .badge-success, .badge-warning
```

## 🏗️ Component Architecture

### Component Standards
- **Maximum 500 lines per component**
- **Consistent API patterns** across all components
- **TypeScript interfaces** for all props
- **Composition over inheritance**
- **Single responsibility principle**

### Component Categories

#### Common Components
- **Button** - Multiple variants (primary, secondary, outline, danger)
- **Input** - Form inputs with validation states
- **ProtectedRoute** - Authentication guard
- **LoadingSpinner** - Loading indicators

#### Layout Components
- **Layout** - Main application layout
- **Header** - Navigation header with authentication
- **Footer** - Application footer

#### Form Components
- **LoginForm** - User authentication form
- **RegisterForm** - User registration form

#### Page Components
- **HomePage** - Landing page
- **LoginPage** - Authentication page
- **RegisterPage** - Registration page
- **DashboardPage** - User dashboard
- **ProfilePage** - User profile management
- **NotFoundPage** - 404 error page

## 🔄 State Management

### Zustand Store
- **Authentication Store** - User state, login/logout actions
- **Persistent Storage** - Automatic localStorage sync
- **Type Safety** - Full TypeScript support

### React Query
- **Server State** - API data caching and synchronization
- **Background Updates** - Automatic data refetching
- **Optimistic Updates** - Immediate UI updates

### Custom Hooks
- **useAuth** - Authentication state and actions
- **useForm** - Form state management with validation
- **useLocalStorage** - Persistent local storage

## 🌐 API Integration

### Service Layer
- **Base API Service** - Axios configuration with interceptors
- **Authentication Service** - Login, register, profile management
- **Error Handling** - Centralized error management
- **Token Management** - Automatic JWT token handling

### API Features
- **Request/Response Interceptors** - Automatic token attachment
- **Error Handling** - Global error management
- **Loading States** - Request state tracking
- **Type Safety** - Full TypeScript API types

## 🎯 Routing & Navigation

### React Router
- **Protected Routes** - Authentication-based routing
- **Route Guards** - Access control for protected pages
- **Navigation** - Programmatic navigation
- **URL Parameters** - Dynamic route handling

### Route Structure
```
/                    # Home page
/login              # Authentication
/register           # User registration
/dashboard          # User dashboard (protected)
/profile            # User profile (protected)
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach
```css
/* Mobile first responsive design */
.responsive-text { @apply text-sm md:text-base lg:text-lg; }
```

### Responsive Utilities
- **Mobile Only** - `.mobile-only`
- **Desktop Only** - `.desktop-only`
- **Tablet Only** - `.tablet-only`

## ♿ Accessibility

### WCAG Compliance
- **Color Contrast** - AA level contrast ratios
- **Keyboard Navigation** - Full keyboard accessibility
- **Screen Readers** - Proper ARIA attributes
- **Focus Management** - Visible focus indicators

### Accessibility Features
- **Semantic HTML** - Proper HTML structure
- **ARIA Labels** - Screen reader support
- **Focus States** - Keyboard navigation
- **High Contrast** - High contrast mode support

## 🧪 Development Guidelines

### Code Quality Standards
- **File Size Limit**: Maximum 500 lines per file
- **Code Duplication**: Always check existing implementations
- **No Hardcoding**: Use environment variables for configuration
- **Type Safety**: Use TypeScript throughout
- **Component Consistency**: Follow established patterns

### Component Development
- Use functional components with hooks
- Implement proper TypeScript interfaces
- Keep components focused on single responsibility
- Use custom hooks for reusable logic
- Follow the design system guidelines

### State Management
- Use Zustand for global state
- Use React hooks for local state
- Use React Query for server state
- Implement proper error handling
- Use persistent storage when appropriate

## 🚀 Building & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Build Features
- **Code Splitting** - Automatic route-based splitting
- **Tree Shaking** - Unused code elimination
- **Minification** - Production optimization
- **Source Maps** - Debug support
- **Asset Optimization** - Image and font optimization

## 🔧 Development Tools

### Code Quality
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check    # Run TypeScript type checking
```

### Development Features
- **Hot Module Replacement** - Instant updates
- **TypeScript** - Real-time type checking
- **ESLint** - Code quality enforcement
- **Path Aliases** - Clean import paths
- **Environment Variables** - Configuration management

## 📊 Performance

### Optimization Features
- **Code Splitting** - Route-based splitting
- **Lazy Loading** - Component lazy loading
- **Memoization** - React.memo, useMemo, useCallback
- **Bundle Analysis** - Size optimization
- **Image Optimization** - Lazy loading and compression

### Performance Monitoring
- **Bundle Size** - Keep JavaScript bundle minimal
- **Loading Performance** - Optimize initial page load
- **Interaction Performance** - Smooth animations and transitions
- **Memory Usage** - Prevent memory leaks

## 🤝 Contributing

1. Follow the established code style and patterns
2. Write meaningful commit messages
3. Test your changes thoroughly
4. Ensure all files are under 500 lines
5. Check for code duplication before implementing new features
6. Use TypeScript types throughout
7. Follow accessibility guidelines
8. Follow the design system standards

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
