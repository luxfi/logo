# ▼ Logo

Universal brand mark. White downward triangle on dark.

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

This package exports the default ▼ mark. White-label products override via their brand package (`@liquidityio/brand`, `@zooai/brand`, etc.) which provides org-specific logos.

## License

All rights reserved.
