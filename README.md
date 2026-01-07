# Bater Place - Docusaurus Blog

This is the migrated version of Bater's blog from Jekyll to Docusaurus.

## Getting Started

### Installation

First, resolve the npm cache permission issues if needed:

```bash
# Fix npm permissions (run with user permissions, not sudo)
sudo chown -R $(whoami) ~/.npm

# Install dependencies
npm install
```

### Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

For GitHub Pages deployment:

```bash
npm run deploy
```

## Migration Notes

- All 17 blog posts have been converted from Jekyll to Docusaurus format
- Jekyll frontmatter has been converted to Docusaurus blog post format
- Tags, authors, and dates are preserved
- About and Resume pages migrated to Docusaurus pages
- Google Analytics tracking ID preserved

## Configuration

The main configuration is in `docusaurus.config.ts`:
- Site metadata (title, description, etc.)
- GitHub Pages deployment settings
- Blog configuration
- Navigation and footer
- Google Analytics integration

## Content Structure

- `blog/` - All migrated blog posts
- `src/pages/` - Static pages (About, Resume, Tags)
- `static/` - Static assets (images, favicon, etc.)
- `src/css/custom.css` - Custom styling