# Rux Documan Font Files

Place your Rux Documan font files in this directory.

## Required Files

### Variable Font (Recommended)
- `RuxDocumanSTCSTCVF.woff2` - Variable font with weight range 100-900

### Static Font Fallbacks (Optional but recommended)
If you want to support older browsers, include these static font files:

| Weight | File Name |
|--------|-----------|
| 100 (Thin) | `RuxDocuman-Thin.woff2` |
| 200 (Extra Light) | `RuxDocuman-ExtraLight.woff2` |
| 300 (Light) | `RuxDocuman-Light.woff2` |
| 400 (Regular) | `RuxDocuman-Regular.woff2` |
| 500 (Medium) | `RuxDocuman-Medium.woff2` |
| 600 (Semi Bold) | `RuxDocuman-SemiBold.woff2` |
| 700 (Bold) | `RuxDocuman-Bold.woff2` |
| 800 (Extra Bold) | `RuxDocuman-ExtraBold.woff2` |
| 900 (Black) | `RuxDocuman-Black.woff2` |

### Monospace Variant (Optional)
- `RuxDocumanMono-Regular.woff2`
- `RuxDocumanMono-Bold.woff2`

## Fallback Strategy

The CSS is configured with:
- `font-display: swap` for optimal loading performance
- System font stack as final fallback
- Unicode range optimization for Latin characters

## Performance Notes

- WOFF2 format provides best compression (~30% smaller than WOFF)
- Variable font reduces HTTP requests (1 file vs 9+ static files)
- Unicode-range limits loading to supported character sets only
