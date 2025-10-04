# React Contexts

This directory contains React Context providers for global state management.

## Usage

Create context providers for shared state:

```typescript
// contexts/ThemeContext.tsx
import { createContext, useContext } from 'react'

interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
```

## Best Practices

- Keep contexts focused and minimal
- Use TypeScript for type safety
- Provide custom hooks for context consumption
- Consider using Zustand for complex state management
- Avoid prop drilling with context
- Use context for truly global state only
