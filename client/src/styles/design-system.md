# Design System Documentation

## 🎨 Color Palette

### Primary Brand Colors

```css
--text-primary: #0F0F0F          /* Dark charcoal for primary text */
--text-secondary: #6B7280         /* Medium gray for secondary text */
--background-primary: #FAF9EE     /* Warm cream background */
--background-secondary: #EEEEEE   /* Light gray secondary background */
--button-primary: #181C14         /* Dark charcoal for primary buttons */
--button-secondary: #F8FAFC       /* Off-white for secondary buttons */
```

### Status & Semantic Colors

#### General Status Colors
- **Success:** `bg-green-100 text-green-800` / `bg-green-500`
- **Warning:** `bg-yellow-100 text-yellow-800` / `bg-yellow-500`
- **Error:** `bg-red-100 text-red-800` / `bg-red-500`
- **Info:** `bg-blue-100 text-blue-800` / `bg-blue-500`
- **Default:** `bg-gray-100 text-gray-800`

#### Dashboard Stat Card Colors
- **Blue** (`bg-blue-500`) - Total Employees
- **Green** (`bg-green-500`) - Active Employees
- **Purple** (`bg-purple-500`) - Departments
- **Yellow** (`bg-yellow-500`) - Pending Requests
- **Indigo** (`bg-indigo-500`) - Today's Attendance
- **Emerald** (`bg-emerald-500`) - Monthly Payroll

#### Attendance Status Colors
- **Present:** `text-green-600 bg-green-50`
- **Late:** `text-yellow-600 bg-yellow-50`
- **Absent:** `text-red-600 bg-red-50`
- **Partial:** `text-orange-600 bg-orange-50`

---

## 📝 Typography

### Font Family
```css
font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
```

### Text Sizes
| Class | Size |
|-------|------|
| `text-xs` | 12px |
| `text-sm` | 14px |
| `text-base` | 16px |
| `text-lg` | 18px |
| `text-xl` | 20px |
| `text-2xl` | 24px |
| `text-3xl` | 30px |

### Font Weights
| Class | Weight |
|-------|--------|
| `font-medium` | 500 |
| `font-semibold` | 600 |
| `font-bold` | 700 |

---

## 📐 Layout & Spacing

### Grid System

```css
/* Responsive Grid Patterns */
grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6  /* Dashboard stats */
grid-cols-1 md:grid-cols-4                                 /* Overview cards */
grid-cols-4 gap-4                                          /* Standard grid */
```

### Spacing System

#### Padding
```css
p-2, p-3, p-4, p-6, p-8
px-3, px-4, px-6
py-1, py-2, py-3
```

#### Margins
```css
mt-1, mt-2, mt-4, mt-6
mb-2, mb-4
mx-auto, mx-8
```

#### Gaps
```css
gap-2, gap-3, gap-4, gap-6
space-x-2, space-x-3, space-x-4
space-y-2, space-y-4, space-y-6
```

---

## 🧩 Component Design Patterns

### Card Components

#### Base Card
```css
bg-white rounded-lg shadow-sm border border-gray-200 p-6
```

#### Card Variants
- **Shadows:** `shadow-sm`, `shadow-md`, `shadow-lg`
- **Hover:** `hover:shadow-md transition-shadow`
- **Border:** Optional with `border` class
- **Padding:** `none`, `sm`, `md`, `lg`

---

### Button Components

#### Button Variants
| Variant | Classes |
|---------|---------|
| **Primary** | `bg-button-primary text-white hover:bg-button-primary/90` |
| **Secondary** | `bg-button-secondary text-text-primary border border-gray-200` |
| **Outline** | `border border-gray-300 bg-white text-gray-700` |
| **Ghost** | `text-gray-700 hover:bg-gray-100` |
| **Danger** | `bg-red-600 text-white hover:bg-red-700` |
| **Success** | `bg-green-600 text-white hover:bg-green-700` |

#### Button Sizes
| Size | Classes |
|------|---------|
| **Small** | `px-3 py-1.5 text-sm` |
| **Medium** | `px-4 py-2 text-base` |
| **Large** | `px-6 py-3 text-lg` |

---

### Input Components

#### Input Base
```css
block w-full h-10 px-3 py-2 rounded-md border-gray-300 shadow-sm
focus:border-button-primary focus:ring-button-primary
```

#### Input States
- **Error:** `border-red-300 focus:border-red-500 focus:ring-red-500`
- **Disabled:** `bg-gray-50 text-gray-500 cursor-not-allowed`
- **With Icon:** `pl-10` or `pr-10`

---

### Badge Components

#### Badge Base
```css
inline-flex items-center rounded-full font-medium
```

#### Badge Variants
- **Default:** `bg-gray-100 text-gray-800`
- **Success:** `bg-green-100 text-green-800`
- **Warning:** `bg-yellow-100 text-yellow-800`
- **Error:** `bg-red-100 text-red-800`
- **Info:** `bg-blue-100 text-blue-800`

#### Badge Sizes
| Size | Classes |
|------|---------|
| **Small** | `px-2 py-0.5 text-xs` |
| **Medium** | `px-2.5 py-0.5 text-sm` |
| **Large** | `px-3 py-1 text-base` |

---

## 🏗️ Layout Patterns

### Header Design
```css
h-16 bg-background-primary border-b border-gray-200
flex items-center justify-between h-full px-6
```

### Sidebar Design
```css
bg-background-primary border-r border-gray-200
w-64  /* expanded */
w-20  /* collapsed */
transition-all duration-300
```

### Page Layout
```css
min-h-screen bg-background-primary
flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8
```

---

## 🔄 State Design Patterns

### Loading States

#### Loading Spinner
```css
animate-spin h-6 w-6 text-button-primary
```

#### Skeleton Loading
```css
animate-pulse bg-gray-200 rounded
```

### Error States

#### Error Messages
```css
bg-red-50 border border-red-200 rounded-md p-4
text-sm text-red-600
```

#### Error Icons
```css
w-16 h-16 text-red-500 mx-auto
```

### Empty States

#### Empty State Container
```css
text-center py-8
h-8 w-8 text-gray-400 mx-auto mb-2
text-sm text-gray-600
```

---

## ⚡ Interactive Elements

### Hover Effects
```css
hover:bg-gray-100 transition-colors
hover:shadow-md transition-shadow
hover:bg-button-primary/90
```

### Focus States
```css
focus:outline-none focus:ring-2 focus:ring-offset-2
focus:ring-button-primary
focus:border-transparent
```

### Transitions
```css
transition-colors duration-200
transition-shadow
transition-all duration-300
```

---

## 🎯 Icon System

### Icon Sizes
| Size | Classes |
|------|---------|
| Small | `h-4 w-4` |
| Medium | `h-5 w-5` |
| Large | `h-6 w-6` |
| Extra Large | `h-8 w-8` |

### Icon Colors
```css
text-gray-400, text-gray-600, text-white
text-blue-500, text-green-500, text-red-500
```

---

## 🏷️ Brand Identity

### Logo Design
```css
w-8 h-8 bg-button-primary rounded-lg
flex items-center justify-center
text-white font-bold text-sm
```

### App Title
```css
text-xl font-semibold text-text-primary
```

---

## 📱 Responsive Design

### Breakpoints
| Breakpoint | Width |
|------------|-------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

### Responsive Patterns

#### Grid Responsiveness
```css
grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6
```

#### Spacing Responsiveness
```css
px-4 sm:px-6 lg:px-8
py-12 px-4 sm:px-6 lg:px-8
```

---

## 📋 Usage Guidelines

### Best Practices
1. Always use the custom color palette variables for brand consistency
2. Follow mobile-first approach for responsive design
3. Maintain consistent spacing using the defined spacing system
4. Use appropriate semantic colors for status indicators
5. Ensure proper hover and focus states for interactive elements
6. Apply loading and error states consistently across the application

### Component Composition
- Start with base classes and add variants as needed
- Combine utility classes for custom components
- Maintain consistent padding and spacing ratios
- Use transitions for smooth state changes

---

## 🔧 Implementation

### Design Tokens
All design values are centralized in `design-tokens.ts`:
```typescript
import { designTokens } from '@/styles/design-tokens'

// Access color values
const primaryColor = designTokens.colors.textPrimary
const buttonColor = designTokens.colors.buttonPrimary
```

### Tailwind Configuration
Custom colors and utilities are defined in `tailwind.config.js`:
```javascript
colors: {
  'text-primary': '#0F0F0F',
  'background-primary': '#FAF9EE',
  'button-primary': '#181C14',
  // ... more colors
}
```

### CSS Classes
Pre-built component classes are available in `index.css`:
```css
/* Button variants */
.btn-primary { @apply bg-button-primary text-white; }
.btn-secondary { @apply bg-button-secondary text-text-primary; }

/* Card components */
.card { @apply bg-white rounded-lg shadow-sm border border-gray-200 p-6; }

/* Layout patterns */
.header { @apply h-16 bg-background-primary border-b border-gray-200; }
```

---

## 🎨 Design System Files

### Core Files
- **`design-tokens.ts`** - Centralized design values and tokens
- **`index.css`** - Component class definitions and utilities
- **`tailwind.config.js`** - Tailwind configuration with custom colors
- **`design-system.md`** - This comprehensive documentation

### Component Files
- **`Button.tsx`** - Button component with all variants
- **`Input.tsx`** - Input component with states
- **`Card.tsx`** - Card component with sections
- **`Badge.tsx`** - Badge component with variants

---

## 🚀 Getting Started

### 1. Import Design Tokens
```typescript
import { designTokens } from '@/styles/design-tokens'
```

### 2. Use Pre-built Classes
```tsx
<button className="btn btn-primary btn-lg">
  Primary Button
</button>
```

### 3. Compose Custom Components
```tsx
<div className="card card-hover">
  <div className="card-header">
    <h3 className="text-lg font-semibold">Card Title</h3>
  </div>
  <div className="card-body">
    <p className="text-text-secondary">Card content</p>
  </div>
</div>
```

### 4. Follow Responsive Patterns
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid content */}
</div>
```

---

## 🔍 Code Review Checklist

- [ ] Uses predefined design tokens from `design-tokens.ts`
- [ ] Follows component API patterns consistently
- [ ] Implements proper responsive design with mobile-first approach
- [ ] Uses semantic colors for status indicators
- [ ] Maintains consistent spacing using the 4px base unit
- [ ] Includes proper hover and focus states
- [ ] Applies loading and error states appropriately
- [ ] Uses transitions for smooth interactions
- [ ] Follows accessibility guidelines
- [ ] Maintains brand consistency with custom color palette