import type { LogoSettings, LogoOptions } from './types.js';
import { ANIMATED_SVG } from './animated.js';

// Default logo: ▼ (downward-pointing triangle)
// This is the universal placeholder. White-label products use their own brand override.
// When no brand is configured, ▼ shows — intentional, clean, not broken.

export const LOGO_SETTINGS: LogoSettings = {
  color: {
    viewBox: '0 0 100 100',
    width: 100,
    height: 100
  },
  mono: {
    strokeWidth: 2
  }
};

// ▼ — the triangle path used everywhere
const TRIANGLE = 'M50 85 L15 25 L85 25 Z';

/** Color SVG logo (white ▼ on transparent) */
export function getColorSVG(): string {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="${TRIANGLE}" fill="#ffffff"/>
  </svg>`;
}

/** Monochrome SVG logo (outline ▼) */
export function getMonoSVG(): string {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="${TRIANGLE}" fill="none" stroke="black" stroke-width="2"/>
  </svg>`;
}

/** Tightly cropped color SVG */
export function getColorSVGCropped(): string {
  return getColorSVG();
}

/** White SVG logo (for dark backgrounds) */
export function getWhiteSVG(): string {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="${TRIANGLE}" fill="white"/>
  </svg>`;
}

/** Menu bar SVG (uses currentColor for OS theme) */
export function getMenuBarSVG(): string {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="${TRIANGLE}" fill="currentColor"/>
  </svg>`;
}

/**
 * Favicon SVG — the ▼ in white, keyed in black. No container.
 *
 * A favicon does not get to choose what is behind it: browsers paint the active
 * tab white in light mode and near-black in dark, so the white ▼ that every other
 * variant uses is invisible on half of them. The keyline is what makes one asset
 * work on both, and it is drawn thick because at 16px a hairline lands under a
 * device pixel and the mark closes into a grey lozenge.
 *
 * It used to sit on a black rounded rect, which solved the same problem by giving
 * the mark its own ground. The mark is a triangle; a box around it is a second
 * shape to recognise, and at tab size the box is most of what you see.
 *
 * TRIANGLE, not a second copy of it. This function carried its own path on a
 * 64-box — so the one place the geometry was supposed to live had a rival, and
 * moving the mark would have moved everything except the favicon.
 *
 * Stroke under fill, as two paths rather than `paint-order`: favicons are
 * rasterised by more than browsers (ico pipelines, resvg, librsvg), and a
 * property one of them ignores would silently paint the keyline over the mark.
 */
export function getFaviconSVG(): string {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="${TRIANGLE}" fill="none" stroke="#0a0a0a" stroke-width="13" stroke-linejoin="round"/>
    <path d="${TRIANGLE}" fill="#ffffff"/>
  </svg>`;
}

/** Get logo as data URL */
export function getLogoDataUrl(options: LogoOptions = {}): string {
  const svg = getLogo({ ...options, format: 'svg' });
  const base64 = btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${base64}`;
}

/** Get logo as base64 string */
export function getLogoBase64(options: LogoOptions = {}): string {
  const svg = getLogo({ ...options, format: 'svg' });
  return btoa(unescape(encodeURIComponent(svg)));
}

/** Get logo in requested format */
export function getLogo(options: LogoOptions = {}): string {
  const { variant = 'color', format = 'svg' } = options;
  if (variant === 'animated') {
    if (format === 'dataUrl') return getAnimatedDataUrl();
    if (format === 'base64') return btoa(unescape(encodeURIComponent(getAnimatedSVG())));
    return getAnimatedSVG();
  }

  if (format === 'dataUrl') return getLogoDataUrl({ variant });
  if (format === 'base64') return getLogoBase64({ variant });

  switch (variant) {
    case 'mono': return getMonoSVG();
    case 'white': return getWhiteSVG();
    default: return getColorSVG();
  }
}

// LUX — the wordmark, drawn on a 63×17 box. One copy of the geometry; every
// wordmark below is this same string under a different fill or transform. It
// used to be pasted into each function, so the letterforms lived in as many
// places as there were ways to look at them.
//
// The L is its own string because LX below wears the same one. The U and the X
// share a path: they touch, and whatever drew this unioned them into a single
// outline rather than leaving two shapes to meet at a point.
const LETTER_L = `<polygon points="18 12.485 18 17 0 17 0 0 5.061 0 5.061 12.485"/>`;

const WORDMARK = `${LETTER_L}
    <path d="M62.991,0 L56.069,0 L50.841,5.265 L45.64,0 L33.537,0 L33.537,8.355 C33.537,10.39 32.904,12.547 28.355,12.547 C23.805,12.547 23.173,10.418 23.173,8.355 L23.173,0 L18,0 L18,8.355 C18,14.199 21.107,17 28.364,17 C35.593,17 38.728,14.171 38.728,8.355 L38.728,0.327 C38.728,0.215 38.858,0.159 38.942,0.233 L47.25,8.374 L38.7,16.748 L45.649,16.748 L50.85,11.483 L56.078,16.748 L63,16.748 L54.478,8.374 L62.991,0 Z"/>`;

/** The wordmark's own proportions. 63:17 ≈ 3.7:1 — it is a stripe, not a square. */
export const WORDMARK_BOX = { width: 63, height: 17 };

// A mark written to a file has no text colour to take, so `currentColor` in one
// paints black on a dark tab as readily as on a light one. This is the way out:
// the ground states its scheme, and the mark asks.
const ADAPTIVE = `<style>.w{fill:#121312}@media(prefers-color-scheme:dark){.w{fill:#fff}}</style>`;

/**
 * Letterbox a mark into a square, for icon slots — favicon, apple-touch,
 * android-chrome, PWA manifest.
 *
 * A wide mark in a 1:1 hole is the whole difficulty. Stretching it to fill
 * makes fat letters; cropping to fill shows part of a word. Both were shipped
 * at some point. So it is letterboxed: scaled to a fraction of the width and
 * centred, with the leftover as padding. Aspect ratio is preserved by
 * construction — there is one scale factor, applied to both axes.
 */
function square(
  mark: string,
  markBox: { width: number; height: number },
  options: { fill?: string; background?: string; inset?: number } = {}
): string {
  const { fill, background, inset = 0.84 } = options;
  const box = 100;
  const scale = (box * inset) / markBox.width;
  const x = (box - markBox.width * scale) / 2;
  const y = (box - markBox.height * scale) / 2;
  const ground = background ? `<rect width="${box}" height="${box}" fill="${background}"/>` : '';
  // No fill given means the mark reads on either ground, the way a favicon must.
  const paint = fill
    ? `fill="${fill}"`
    : `class="w"`;
  const style = fill ? '' : ADAPTIVE;
  return `<svg viewBox="0 0 ${box} ${box}" xmlns="http://www.w3.org/2000/svg">${style}${ground}
  <g ${paint} fill-rule="nonzero" transform="translate(${+x.toFixed(4)} ${+y.toFixed(4)}) scale(${+scale.toFixed(6)})">
    ${mark}
  </g>
</svg>`;
}

/** LUX wordmark SVG — the letters as paths, white for dark grounds */
export function getWordmarkSVG(): string {
  return `<svg width="126" height="34" viewBox="0 0 63 17" xmlns="http://www.w3.org/2000/svg">
  <g fill="#ffffff" fill-rule="nonzero">
    ${WORDMARK}
  </g>
</svg>`;
}

/** LUX wordmark that follows the ground it lands on — dark ink on light, white on dark. */
export function getWordmarkAdaptiveSVG(): string {
  return `<svg width="126" height="34" viewBox="0 0 63 17" xmlns="http://www.w3.org/2000/svg">
  ${ADAPTIVE}
  <g class="w" fill-rule="nonzero">
    ${WORDMARK}
  </g>
</svg>`;
}

/**
 * LUX wordmark centred in a square, for icon slots.
 *
 * Legible from about 32px up. Below that the letterforms close; a tab icon at
 * 16px wants two letters, which is what LX is for.
 */
export function getWordmarkSquareSVG(options: { fill?: string; background?: string; inset?: number } = {}): string {
  return square(WORDMARK, WORDMARK_BOX, options);
}

/** LUX wordmark with metal gradient */
export function getWordmarkGradientSVG(): string {
  return `<svg width="126" height="34" viewBox="0 0 63 17" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#666666"/>
      <stop offset="30%" style="stop-color:#ffffff"/>
      <stop offset="70%" style="stop-color:#ffffff"/>
      <stop offset="100%" style="stop-color:#888888"/>
    </linearGradient>
  </defs>
  <g fill="url(#metalGradient)" fill-rule="nonzero">
    ${WORDMARK}
  </g>
</svg>`;
}

// LX — the wordmark with the U taken out. lux.exchange wears this; every other
// Lux surface wears the full LUX wordmark.
//
// The L is the wordmark's L, unmoved. The X is the wordmark's X, moved 20 to
// the left. Nothing is redrawn, so the two marks cannot drift apart: LX is LUX
// short a letter.
//
// Twenty is the kern. In the word, every letter sits flush against the next —
// the L's foot ends on x=18 where the U's stem begins, and the U's stem ends on
// x=38.7 where the X's arm begins — and the air comes from the letterforms
// rather than from the fit. Setting the X flush against the L the same way
// (kern 20.7) welds them: the U meets its neighbour with a stem that starts at
// the cap line, the X with a diagonal that has already reached the baseline by
// the time it arrives, and the baseline is exactly where the L's foot is. So
// the fit is taken from what the word does at its tightest instead — 0.73
// between that same foot and the U's bowl. Twenty leaves 0.70. It also lands
// the X's far corner on the box edge, as the wordmark does.
//
// The X's top-left corner reads (38.942,0.233) in the wordmark, which is not a
// corner at all — it is a point part-way down the arm's edge. The U's stem and
// the X's arm touch there, and unioning the two letters into one outline
// chamfered the join. The corner is (38.7,0): the X is mirror-symmetric about
// y=8.374, half of the 16.748 it is written with, and the wordmark already
// writes 38.7 for the bottom-left corner. With the U gone the chamfer has
// nothing to hide behind and reads as a nicked corner.
const LETTER_X = `<path d="M38.7,0 L45.64,0 L50.841,5.265 L56.069,0 L62.991,0 L54.478,8.374 L63,16.748 L56.078,16.748 L50.85,11.483 L45.649,16.748 L38.7,16.748 L47.25,8.374 Z"/>`;

const LX_KERN = 20;

const LX = `${LETTER_L}
    <g transform="translate(-${LX_KERN} 0)">${LETTER_X}</g>`;

/** LX's own proportions. 43:17 ≈ 2.5:1 — squarer than the word, which is why it fits a tab. */
export const LX_BOX = { width: 43, height: 17 };

/**
 * LX, taking its colour from whatever draws it.
 *
 * `currentColor` rather than a fixed white, because the exchange puts this in a
 * header where the ink is already decided. Inline it into the DOM for that to
 * work — through an `<img>`, or as a file on disk, there is no colour to take
 * and it paints black. Those want getLXAdaptiveSVG.
 */
export function getLXSVG(): string {
  return `<svg width="86" height="34" viewBox="0 0 43 17" xmlns="http://www.w3.org/2000/svg">
  <g fill="currentColor" fill-rule="nonzero">
    ${LX}
  </g>
</svg>`;
}

/** LX that follows the ground it lands on — dark ink on light, white on dark. */
export function getLXAdaptiveSVG(): string {
  return `<svg width="86" height="34" viewBox="0 0 43 17" xmlns="http://www.w3.org/2000/svg">
  ${ADAPTIVE}
  <g class="w" fill-rule="nonzero">
    ${LX}
  </g>
</svg>`;
}

/**
 * LX centred in a square, for icon slots.
 *
 * Two letters at 2.5:1 clear a 16px tab where the four-letter stripe does not.
 */
export function getLXSquareSVG(options: { fill?: string; background?: string; inset?: number } = {}): string {
  return square(LX, LX_BOX, options);
}

// Pre-generated exports
export const logo = getColorSVG();
export const logoMono = getMonoSVG();
export const logoWhite = getWhiteSVG();
export const wordmark = getWordmarkSVG();
export const wordmarkGradient = getWordmarkGradientSVG();
export const lx = getLXSVG();
export const logoDataUrl = getLogoDataUrl();
export const logoMonoDataUrl = getLogoDataUrl({ variant: 'mono' });
export const logoWhiteDataUrl = getLogoDataUrl({ variant: 'white' });

// Legacy aliases
export const luxLogo = logo;
export const luxLogoMono = logoMono;
export const luxLogoWhite = logoWhite;
export const luxWordmark = wordmark;
export const luxWordmarkGradient = wordmarkGradient;
export const luxLogoDataUrl = logoDataUrl;
export const luxLogoMonoDataUrl = logoMonoDataUrl;
export const luxLogoWhiteDataUrl = logoWhiteDataUrl;

/**
 * Interactive animated mark — load (assemble) → hover (one graceful turn,
 * returns to rest) → press (squash). Pure CSS, no JS. Inline this SVG into
 * the DOM (not <img>) for the hover/press interactions to fire.
 */
export function getAnimatedSVG(): string {
  return ANIMATED_SVG;
}

/** Animated mark as a data: URL (load animation runs even in <img>). */
export function getAnimatedDataUrl(): string {
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(ANIMATED_SVG)));
}

export const luxLogoAnimated = ANIMATED_SVG;
export const luxLogoAnimatedDataUrl = getAnimatedDataUrl();
