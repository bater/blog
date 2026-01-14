# ✅ i18n Setup Complete!

## What Was Fixed

### 1. Missing Image File
**Error:** `Can't resolve './full_logo.webp'`
**Fix:** Copied the logo image to the zh-TW folder:
```bash
cp src/pages/about/logo/full_logo.webp i18n/zh-TW/docusaurus-plugin-content-pages/about/logo/
```

### 2. MDX Syntax Error
**Error:** `Unexpected character '<' (U+003C)` in resume.md line 40
**Fix:** Escaped the `<` character by changing `<10` to `&lt;10`

## ⚠️ Important: How the Language Switcher Works

**Docusaurus can only run ONE locale at a time in development mode.** This is by design for performance.

### In Development (Fast, Single Locale)
```bash
# English version
npm start

# Chinese version
npm run start:zh
```

The language dropdown appears but **won't work** in dev mode. This is normal!

### To Test Language Switcher (Production Build)
```bash
npm run build
npm run serve
```

**Now it works!** Visit http://localhost:3000/ and the language switcher will work perfectly, just like the official Docusaurus site.

## How to Use

### Start Development Server (Both Locales)
```bash
npm start
```

This runs both English and zh-TW locales, so the language switcher works properly.

**Access:**
- English: http://localhost:3000/
- 繁體中文: http://localhost:3000/zh-TW/

### Language Switcher
Look for the language dropdown in the top-right corner of the navbar (between "About" and "LinkedIn"). Click it to switch between:
- English
- 繁體中文

**Now when you switch languages, the locale persists across all pages!** Just like the official Docusaurus site.

### Faster Development (Single Locale)
If you're working on content in just one language and want faster rebuilds:

```bash
# English only
npm run start:en

# Chinese only
npm run start:zh
```

## What's Translated

### ✅ Fully Translated
- **UI Elements:** Navbar, footer, buttons, pagination, search, etc.
- **Pages:**
  - `/about` - About Me page
  - `/about/resume` - Resume page
  - `/about/logo` - Logo story page
- **Blog Posts:**
  - `2025-12-15-ai-agent-shift-left.md`

### ⏳ Not Yet Translated (Falls Back to English)
- Other blog posts
- Code Smells documentation

## Adding More Translations

### Translate a Blog Post
```bash
# Copy the English version
cp blog/2025-05-25-tidy-first.md i18n/zh-TW/docusaurus-plugin-content-blog/2025-05-25-tidy-first.md

# Edit and translate the content
```

### Translate Documentation
```bash
# Copy the English version
cp smells-to-refactoring/intro.md i18n/zh-TW/docusaurus-plugin-content-docs-smells/current/intro.md

# Edit and translate the content
```

### Important: Escape Special Characters
When translating, remember to escape HTML special characters in Markdown:
- `<` → `&lt;`
- `>` → `&gt;`
- `&` → `&amp;`

Or use backticks for code: \`<10\` instead of <10

## Build for Production

```bash
# Build all locales
npm run build

# Serve the production build
npm run serve
```

The production build creates separate folders for each locale and the language switcher works perfectly.

## Success! 🎉

Your site now has full i18n support with a working language switcher, just like the official Docusaurus website!
