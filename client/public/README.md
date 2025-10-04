# Public Assets

This directory contains static assets that are served directly by the web server.

## Directory Structure

- `fonts/` - Web fonts and font files
- `images/` - Static images (logos, icons, etc.)
- `icons/` - Favicon and app icons
- `docs/` - Public documentation files

## Usage

Files in this directory are served at the root URL. For example:
- `public/images/logo.png` → accessible at `/images/logo.png`
- `public/icons/favicon.ico` → accessible at `/icons/favicon.ico`

## Best Practices

- Keep file sizes optimized for web delivery
- Use appropriate image formats (WebP, AVIF for modern browsers)
- Include fallbacks for older browsers
- Use descriptive filenames
- Consider using a CDN for production
