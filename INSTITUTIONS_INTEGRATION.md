# Institutions Data Integration

This document explains how the website fetches and uses institutions data from the DashAI repository.

## Overview

The institutions data is centralized in the DashAI repository at:
```
https://raw.githubusercontent.com/DashAISoftware/dashAI/develop/docs/static/institutions/institutions.json
```

This website fetches this data at **build time** and incorporates it into the static export.

## How It Works

### 1. Build Time Fetching

When you run `pnpm build` or `pnpm dev`, the following sequence occurs:

1. The `fetch-institutions` npm script runs first:
   ```bash
   node scripts/fetch-institutions.mjs
   ```

2. This script:
   - Fetches the institutions.json from the DashAI GitHub raw URL
   - Saves it to `lib/institutions-data.json`
   - Prints status messages to console

3. After fetching completes, Next.js build proceeds normally

### 2. Data Structure

The fetched JSON has this structure:

```json
{
  "institutions": [
    {
      "id": "uchile",
      "name": "University of Chile",
      "fullName": "Universidad de Chile",
      "role": "Leading Institution",
      "url": "https://uchile.cl/",
      "logo": "img/institutions/dcc-logo.png",
      "small": true
    }
    // ... more institutions
  ],
  "acknowledgments": {
    "text": {
      "en": "...",
      "es": "...",
      "pt": "..."
    },
    "grants": ["ID25I10330", ...],
    "logos": [
      {
        "id": "anid",
        "name": "ANID",
        "fullName": "...",
        "url": "...",
        "logo": "..."
      }
    ]
  }
}
```

### 3. Usage in Components

Two main components use this data:

#### InstitutionsGrid (`components/community/InstitutionsGrid.tsx`)
- Displays institutions in a grid layout
- Used in the About page section
- Shows institution name, role, and logo
- Logo URLs are constructed by prepending the DashAI GitHub raw URL

#### SupportedBySection (`components/supported-by-section.tsx`)
- Shows institutions in a card layout on the home page
- Uses the same institutions data
- Uses `fullName` if available, otherwise uses `name`

### 4. Utilities

The `lib/institutions.ts` module provides helper functions:

```typescript
getInstitutions(): Institution[]
getAcknowledgmentsText(lang: 'en' | 'es' | 'pt'): string
getFunderLogos(): FunderLogo[]
getGrants(): string[]
```

## Scripts

### Fetch Institutions Manually
```bash
pnpm fetch-institutions
```

This is useful if you want to update the cached data without running a full build.

### Build (includes fetching)
```bash
pnpm build
```

### Development (includes fetching)
```bash
pnpm dev
```

## Caching

The `lib/institutions-data.json` file is generated during build and **should be committed to git**. This provides:

1. **Fallback**: If the GitHub fetch fails, the cached version is used
2. **Offline builds**: Builds can proceed even without internet access
3. **Build reproducibility**: The same build inputs are used

## Logo URLs

Institution logos are fetched from the DashAI repository at build time. The `logo` field in the JSON contains a relative path like `img/institutions/dcc-logo.png`, which is converted to a full GitHub URL:

```
https://raw.githubusercontent.com/DashAISoftware/dashAI/develop/docs/static/{logo}
```

For example:
- JSON: `"logo": "img/institutions/dcc-logo.png"`
- Full URL: `https://raw.githubusercontent.com/DashAISoftware/dashAI/develop/docs/static/img/institutions/dcc-logo.png`

## Troubleshooting

### Build fails during fetch
If the fetch fails (e.g., GitHub is down), the build will still proceed using the cached `lib/institutions-data.json` file.

To manually re-fetch:
```bash
pnpm fetch-institutions
```

### Logo images not loading
The image URLs point to the DashAI GitHub raw content. If images fail to load:
1. Verify the logo path in the `institutions.json` is correct
2. Check that the file exists in the DashAI repository
3. Ensure there are no GitHub rate limiting issues

An `onError` handler in the components will hide failed images gracefully.

## Integration with DashAI

To update institutions in the website, edit the source file in the DashAI repository:
```
docs/static/institutions/institutions.json
```

Then either:
1. Re-run the build/dev script to fetch the latest data
2. Manually run `pnpm fetch-institutions`

The updated data will be reflected in the website.

## Related Files

- `scripts/fetch-institutions.mjs` - The fetch script
- `lib/institutions.ts` - Type definitions and helper functions
- `lib/institutions-data.json` - Cached data (generated)
- `components/community/InstitutionsGrid.tsx` - Institution grid component
- `components/supported-by-section.tsx` - Institution cards component
- `package.json` - Build scripts configuration
