# Internationalization (i18n) Guide

This site supports both English (en) and Traditional Chinese (zh-TW).

## Folder Structure

```
i18n/
└── zh-TW/                                    # Traditional Chinese translations
    ├── code.json                             # Theme UI translations
    ├── docusaurus-plugin-content-blog/       # Blog translations
    │   └── options.json
    ├── docusaurus-plugin-content-docs-smells/# Docs translations
    │   └── current.json
    └── docusaurus-theme-classic/             # Theme component translations
        ├── navbar.json
        └── footer.json
```

## How to Add Translations

### 1. Translate Blog Posts

Create a copy of your blog post in the zh-TW folder:

```bash
# Copy English blog post
cp blog/2025-05-25-tidy-first.md i18n/zh-TW/docusaurus-plugin-content-blog/2025-05-25-tidy-first.md

# Then translate the content in the zh-TW version
```

### 2. Translate Documentation Pages

Create translated versions in the docs folder:

```bash
# Copy English doc
cp smells-to-refactoring/intro.md i18n/zh-TW/docusaurus-plugin-content-docs-smells/current/intro.md

# Then translate the content
```

### 3. Translate Static Pages

For pages in `src/pages/`, create a zh-TW version:

```bash
# Copy English page
cp src/pages/about.md i18n/zh-TW/docusaurus-plugin-content-pages/about.md

# Then translate the content
```

## Development Commands

```bash
# Start dev server in English (default)
npm start

# Start dev server in Traditional Chinese
npm start -- --locale zh-TW

# Build for all locales
npm run build

# Build for specific locale
npm run build -- --locale zh-TW
```

## Testing the Language Switcher

1. Run `npm start`
2. Look for the language dropdown in the top-right corner of the navbar
3. Click it to switch between English and 繁體中文

## Notes

- The default locale is English (en)
- Untranslated content will fall back to English
- The language dropdown appears automatically in the navbar
- Each locale can have its own blog posts, docs, and pages
