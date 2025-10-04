# Source Assets

This directory contains assets that are processed by the build system (Vite).

## Directory Structure

- `fonts/` - Font files that will be processed by the build system
- `images/` - Images that will be optimized and processed
- `icons/` - Icon files (SVG, etc.) for components

## Usage

Import assets in your components:

```typescript
import logoImage from '@/assets/images/logo.png'
import customFont from '@/assets/fonts/custom.woff2'
import iconSvg from '@/assets/icons/icon.svg'
```

## Best Practices

- Use descriptive filenames
- Optimize images before adding them
- Consider using SVG for icons when possible
- Use appropriate formats (WebP for images, WOFF2 for fonts)
- Keep assets organized by type and purpose
