# PedalSteelMill — Logo & Icon Asset Package v8

## Files

| File | Dimensions | Use |
|------|-----------|-----|
| `pedalsteelmill-logo-full.svg` | 600×440 | Website header, splash screen, marketing |
| `pedalsteelmill-icon-512.svg` | 512×512 | App Store submission, high-res export source |
| `pedalsteelmill-icon-180.svg` | 180×180 | iOS home screen @3x, Android launcher |
| `pedalsteelmill-monogram-64.svg` | 64×64 | Favicon, notification badge, small UI |

## Design Tokens

| Token | Value | Use |
|-------|-------|-----|
| Background | `#1c1e24` | Black anodized aluminum |
| Card border | `#2a2c34` | Machined edge highlight |
| PEDAL | gradient `#909090 → #f0f0f0 → #d8d8d8 → #909090` | Bright steel sweep |
| STEEL MILL | gradient `#8a6a10 → #d4a824 → #e8c040 → #c09820 → #8a6a10` | Wound string gold sweep |
| Accent blue | `#4a9eff` | Chord dots, tagline, tagline rule |
| Gold string | `#c09820` | Wound strings + monogram accent |
| Silver string | `#a8a8a8` | Plain steel strings |
| Chrome bar | gradient horizontal dark→light→mid→dark | Slide bar |
| Crossbar | gradient `#2c2e32 → #686a70 → #2c2e32` | Mid-prominence recessed rail |
| Pedal body | gradient `#484848 → #282828` | Anodized aluminum face |
| Pedal face | gradient `#383838 → #1c1c1c` | Inner face |
| Pedal tread | `#222222` | Pedal pad surface |
| Pedal label | `#909090` | A / B / C labels |

## Wordmark Hierarchy

```
PEDAL        56px / weight 600 / bright steel gradient / tracking 12
─────────────────────────────────────────────────────
STEEL MILL   26px / weight 300 / wound-string gold gradient / tracking 10
─────────────────────────────────────────────────────
CHORD REFERENCE   11px / weight 400 / #4a9eff / tracking 5
```

## Scale Behaviour

| Size | Content |
|------|---------|
| 512×512 and full logo | PEDAL + STEEL MILL + strings + slide bar + chord dots + tagline |
| 180×180 | Same layout, proportionally scaled |
| 64×64 | PSM monogram + gold + silver string accents |

## Font Stack
`'Helvetica Neue', Arial, sans-serif`

For production, substitute your preferred brand font by replacing `font-family`
across all files. Good alternatives that suit the aesthetic:
- **Inter** — clean modern sans, free
- **DIN Condensed** — industrial feel, great letter-spacing
- **Eurostile** — classic tech/metal aesthetic

## Exporting PNG from SVG

```bash
# Inkscape (recommended — best gradient rendering)
inkscape pedalsteelmill-icon-512.svg --export-png=pedalsteelmill-icon-512.png --export-width=512

# For App Store 1024×1024
inkscape pedalsteelmill-icon-512.svg --export-png=pedalsteelmill-icon-1024.png --export-width=1024

# rsvg-convert
rsvg-convert -w 512 -h 512 pedalsteelmill-icon-512.svg > pedalsteelmill-icon-512.png

# ImageMagick
convert -background none pedalsteelmill-icon-512.svg pedalsteelmill-icon-512.png
```

## Platform Export Targets

| Platform | Source file | Export size |
|----------|------------|-------------|
| iOS App Store | icon-512 | 1024×1024 |
| iOS home screen (@3x) | icon-180 | 180×180 |
| iOS home screen (@2x) | icon-180 | 120×120 |
| Android launcher (xxxhdpi) | icon-512 | 192×192 |
| Android launcher (xxhdpi) | icon-512 | 144×144 |
| Web favicon | monogram-64 | 32×32 / 64×64 |
| Web header / OG image | logo-full | SVG or 1200×630 PNG |

## To produce all the public assets needed by the app

Here's the complete and smallest script to generate all the app's assets from the SVG files in this folder (using Mac OS)

```
# install inkscape CLI
homebrew install inkscape

# OR link the executable if already you have the App installed
ln -s /Applications/Inkscape.app/Contents/MacOS/inkscape /usr/local/bin/inkscape

# install imagemagick
brew install imagemagick

# copy/generate favicon files
cp ./assets/pedalsteelmill-monogram-64.svg ./public/favicon.svg

inkscape ./assets/pedalsteelmill-icon-180.svg --export-filename="./public/apple-touch-icon.png" --export-width=180

inkscape ./assets/pedalsteelmill-monogram-64.svg --export-width=32 --export-filename="./tmp.png"
convert ./tmp.png ./public/favicon.ico
rm ./tmp.png

# copy logo files
cp ./assets/pedalsteelmill-logo-full.svg ./public/logo-full.svg
cp ./assets/pedalsteelmill-icon-180.svg ./public/logo-compact.svg
```