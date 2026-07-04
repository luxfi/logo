<p align="center">
  <img src=".github/hero.svg" alt="@luxfi/logo" width="100%" />
</p>

# Lux — Brand & Logo Assets

Official Lux brand marks in every format and size — SVG, PNG, multi-resolution ICO, favicons, app/dock/tray icons, and social cards. Installable via `@luxfi/logo`, browsable in `dist/`.

## Install

```bash
pnpm add @luxfi/logo
```

## Usage

```tsx
import { Logo, Favicon, Wordmark } from '@luxfi/logo'

<Logo size={64} />
<Logo variant="mono" />
<Logo variant="white" />
<Wordmark size={128} />
<Favicon />
```

## SVG Functions

```ts
import { getColorSVG, getMonoSVG, getFaviconSVG, getWordmarkSVG } from '@luxfi/logo'

const svg = getColorSVG()    // white ▼ on transparent
const mono = getMonoSVG()    // outline ▼
const fav = getFaviconSVG()  // white ▼ on black rounded rect
const word = getWordmarkSVG() // LUX text as paths
```

## Variants

| Variant | Use |
|---------|-----|
| `color` | White ▼ — default, for dark backgrounds |
| `mono` | Outline ▼ — for print, light backgrounds |
| `white` | Same as color — explicit white fill |
| `menuBar` | Uses `currentColor` — adapts to OS theme |
| `favicon` | White ▼ on black rounded rect — browser tab |

## Brand Override

This package exports the default ▼ mark. White-label products override via their brand package (`@<tenant>/brand`, `@zooai/brand`, etc.) which provides org-specific logos.

## License

All rights reserved.

## Animated & interactive

The mark ships a self-contained, **pure-CSS animated SVG** — a load animation, a
hover flourish, and a press squash, with **zero JavaScript**. Inline it into the DOM
(not via `<img>`) for the hover/press interactions to fire. Honors `prefers-reduced-motion`.

```tsx
// React — one-line interactive embed
import { Logo } from '@luxfi/logo';
<Logo variant="animated" size={64} />
```

```ts
// Vanilla / any framework
import { getAnimatedSVG, getAnimatedDataUrl } from '@luxfi/logo';
el.innerHTML = getAnimatedSVG();   // interactive (inline in the DOM)
img.src = getAnimatedDataUrl();    // load animation only (fine in <img>)
```

```html
<!-- Raw SVG over CDN — load animation in <img>; inline the file for hover/press -->
<img src="https://unpkg.com/@luxfi/logo/svg/lux-tri-animated.svg" width="64" alt="" />
```
