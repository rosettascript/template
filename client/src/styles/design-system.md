# Design System Documentation

This document outlines the unified design system for the Template App frontend. All components and pages must follow these design standards to ensure consistency across the application.

## Design Principles

### 1. Unified Design
- **Single Source of Truth**: All design values are defined in [design-tokens.ts](mdc:client/src/styles/design-tokens.ts)
- **Consistent Styling**: Use predefined component classes from [index.css](mdc:client/src/styles/index.css)
- **Centralized Configuration**: Design tokens are configured in [tailwind.config.js](mdc:client/tailwind.config.js)

### 2. Component Consistency
- All components must follow the same API patterns
- Use consistent variant systems (primary, secondary, outline, danger)
- Implement standardized size variants (sm, md, lg)
- Follow the same prop interfaces across all components

## Color System

### Primary Colors
- **Primary-50**: `#eff6ff` - Lightest primary
- **Primary-500**: `#3b82f6` - Default primary
- **Primary-600**: `#2563eb` - Hover state
- **Primary-900**: `#1e3a8a` - Darkest primary

### Semantic Colors
- **Success**: Green scale for positive actions
- **Warning**: Yellow scale for caution states
- **Error**: Red scale for error states
- **Info**: Blue scale for informational content

### Usage Guidelines
```css
/* ✅ Correct - Use semantic color classes */
.btn-primary { @apply bg-primary-600 text-white; }
.alert-success { @apply bg-success-50 border-success-200; }

/* ❌ Incorrect - Don't use arbitrary colors */
.custom-button { background-color: #ff0000; }
```

## Typography System

### Font Families
- **Sans**: Inter (primary font)
- **Mono**: JetBrains Mono (code and data)

### Font Scale
- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)
- **4xl**: 2.25rem (36px)

### Usage Guidelines
```css
/* ✅ Correct - Use predefined font classes */
.heading { @apply text-2xl font-semibold; }
.body { @apply text-base text-gray-700; }

/* ❌ Incorrect - Don't use arbitrary font sizes */
.custom-text { font-size: 17px; }
```

## Spacing System

### Base Unit: 4px
- **1**: 4px
- **2**: 8px
- **4**: 16px
- **6**: 24px
- **8**: 32px
- **12**: 48px
- **16**: 64px
- **24**: 96px

### Usage Guidelines
```css
/* ✅ Correct - Use spacing scale */
.card { @apply p-6 m-4; }
.section { @apply py-8 px-4; }

/* ❌ Incorrect - Don't use arbitrary spacing */
.custom-spacing { padding: 13px; }
```

## Component Standards

### Button Components
```css
/* Base button class */
.btn { @apply inline-flex items-center justify-center px-4 py-2; }

/* Variants */
.btn-primary { @apply btn bg-primary-600 text-white; }
.btn-secondary { @apply btn bg-secondary-600 text-white; }
.btn-outline { @apply btn border border-gray-300 text-gray-700; }
.btn-danger { @apply btn bg-error-600 text-white; }

/* Sizes */
.btn-sm { @apply px-3 py-1.5 text-xs; }
.btn-lg { @apply px-6 py-3 text-base; }
```

### Input Components
```css
/* Base input class */
.input { @apply block w-full px-3 py-2 border border-gray-300 rounded-md; }

/* States */
.input-error { @apply input border-error-300 focus:ring-error-500; }
.input-success { @apply input border-success-300 focus:ring-success-500; }
```

### Card Components
```css
/* Base card class */
.card { @apply bg-white shadow-sm rounded-lg border border-gray-200; }

/* Card sections */
.card-header { @apply px-6 py-4 border-b border-gray-200 bg-gray-50; }
.card-body { @apply px-6 py-4; }
.card-footer { @apply px-6 py-4 border-t border-gray-200 bg-gray-50; }
```

## Layout Standards

### Container System
```css
/* Main container */
.container { @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8; }

/* Section spacing */
.section { @apply py-8; }
.section-sm { @apply py-4; }
.section-lg { @apply py-16; }
```

### Grid System
- Use Tailwind's grid system for layouts
- Implement responsive grid patterns
- Use consistent gap spacing

## Responsive Design

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Mobile-First Approach
```css
/* ✅ Correct - Mobile first */
.responsive-text { @apply text-sm md:text-base lg:text-lg; }

/* ❌ Incorrect - Desktop first */
.desktop-first { @apply text-lg md:text-sm; }
```

## Animation Standards

### Predefined Animations
```css
/* Fade animations */
.animate-fade-in { @apply animate-fade-in; }
.animate-slide-in { @apply animate-slide-in; }
.animate-bounce-in { @apply animate-bounce-in; }
```

### Duration Scale
- **75ms**: Micro interactions
- **150ms**: Standard transitions
- **300ms**: Complex animations
- **500ms**: Page transitions

## Accessibility Standards

### Focus States
```css
/* Global focus styles */
*:focus { @apply outline-none ring-2 ring-primary-500 ring-offset-2; }
```

### Color Contrast
- Maintain WCAG AA contrast ratios
- Use semantic colors for meaning
- Test with high contrast mode

### Keyboard Navigation
- Ensure all interactive elements are keyboard accessible
- Implement proper tab order
- Use appropriate ARIA attributes

## Implementation Guidelines

### 1. Use Design Tokens
Always reference design tokens instead of hardcoded values:
```typescript
import { designTokens } from '@/styles/design-tokens'

// ✅ Correct
const primaryColor = designTokens.colors.primary[600]

// ❌ Incorrect
const primaryColor = '#2563eb'
```

### 2. Component Composition
Build complex components from smaller, styled components:
```tsx
// ✅ Correct - Compose from base components
<Button variant="primary" size="lg" className="w-full">
  Submit
</Button>

// ❌ Incorrect - Custom styling
<button className="bg-blue-600 text-white px-6 py-3 rounded">
  Submit
</button>
```

### 3. Consistent API
All components must follow the same prop patterns:
```tsx
interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  loading?: boolean
}
```

## File Organization

### Design System Files
- **`design-tokens.ts`** - Centralized design values
- **`index.css`** - Component class definitions
- **`tailwind.config.js`** - Tailwind configuration
- **`design-system.md`** - This documentation

### Component Files
- **`Button.tsx`** - Button component with variants
- **`Input.tsx`** - Input component with states
- **`Card.tsx`** - Card component with sections

## Enforcement

### Cursor Rules
The following rules are automatically applied:
- **Design System Rule** - Enforces unified design principles
- **Styling Standards** - Ensures consistent styling patterns
- **Component Consistency** - Maintains component API consistency

### Code Review Checklist
- [ ] Uses predefined design tokens
- [ ] Follows component API patterns
- [ ] Implements consistent styling
- [ ] Maintains accessibility standards
- [ ] Uses responsive design principles
- [ ] Follows animation guidelines
