# Testing i18n Setup

## ⚠️ IMPORTANT: How Docusaurus i18n Works in Development

**Docusaurus can only run ONE locale at a time in development mode** for performance reasons. This is by design.

### Development Mode (Single Locale)

```bash
# Run English version (default)
npm start

# Run Chinese version
npm run start:zh
```

**In development mode:**
- Only one locale is built at a time
- The language switcher dropdown will appear but won't work properly
- This is normal and expected behavior
- Use this for fast development when working on content

### Testing the Language Switcher (Production Build)

To test both locales with a working language switcher, you need to build and serve:

```bash
# Build all locales (takes longer)
npm run build

# Serve the production build
npm run serve
```

**Now the language switcher works perfectly!**
- Visit http://localhost:3000/
- Click the language dropdown in the navbar
- Switch between English and 繁體中文
- Navigate anywhere and the locale persists

This is exactly how it works in production on your deployed site.

## Quick Test

1. **Clear cache and start dev server:**
   ```bash
   npm run clear
   npm start
   ```

2. **Check the language dropdown:**
   - Look at the top-right corner of the navbar
   - You should see a language dropdown between "About" and "LinkedIn"
   - Click it to switch between "English" and "繁體中文"

3. **Test both locales:**
   - English: http://localhost:3000/
   - Traditional Chinese: http://localhost:3000/zh-TW/

## What's Translated So Far

### ✅ Fully Translated
- Navbar labels
- Footer labels
- Theme UI (buttons, pagination, etc.)
- About pages (`/about`, `/about/resume`, `/about/logo`)
- One blog post (`2025-12-15-ai-agent-shift-left.md`)

### ⏳ Not Yet Translated
- Other blog posts (will show in English when viewing zh-TW)
- Code Smells documentation (will show in English when viewing zh-TW)

## How It Works

When you visit `/zh-TW/blog`:
- If a blog post has a zh-TW translation, it shows the translated version
- If not, it falls back to the English version
- The navbar, footer, and UI elements are always translated

## Common Issues

### Issue: "Page not found" when switching languages
**Solution:** Make sure you have at least one translated page in each content plugin folder. We've already added the about pages, so this should work now.

### Issue: Language dropdown doesn't appear
**Solution:** 
1. Clear cache: `npm run clear`
2. Restart dev server: `npm start`
3. Check that `localeDropdown` is in the navbar items in `docusaurus.config.ts`

### Issue: Content shows in English even in zh-TW
**Solution:** This is expected! Only translated content shows in Chinese. Untranslated content falls back to English.

## Building for Production

```bash
# Build all locales
npm run build

# Serve the built site
npm run serve
```

The build will create separate folders for each locale in the `build/` directory.
