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
 * Favicon SVG — the ▼ drawn as a hairline outline, no ground, no fill.
 *
 * translate(0 -5) centres the 60-tall mark in the 100 box; the logo sits
 * low by design, a tab icon should not. non-scaling-stroke keeps the line
 * one device pixel at every size, so 16px and 512px carry the same weight
 * instead of the line thickening as the icon grows. Colour follows the
 * tab's scheme, the same .w convention the wordmark uses.
 */
export function getFaviconSVG(): string {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><style>.w{stroke:#121312}@media(prefers-color-scheme:dark){.w{stroke:#fff}}</style>
  <path class="w" d="${TRIANGLE}" transform="translate(0 -5)" fill="none" stroke-width="1" vector-effect="non-scaling-stroke"/>
</svg>`;
}

/**
 * Favicon in one fixed tone, for the .ico and .png fallbacks a raster
 * cannot carry a media query into. #7a7f85 is the tone that clears 3:1
 * against both a light and a dark tab strip; white would vanish on one,
 * near-black on the other.
 */
export function getFaviconRasterSVG(): string {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="${TRIANGLE}" transform="translate(0 -5)" fill="none" stroke="#7a7f85" stroke-width="1" vector-effect="non-scaling-stroke"/>
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

/** ▼ wordmark SVG — the LUX text rendered as paths */
export function getWordmarkSVG(): string {
  return `<svg width="126" height="34" viewBox="0 0 63 17" xmlns="http://www.w3.org/2000/svg">
  <g fill="#ffffff" fill-rule="nonzero">
    <polygon points="18 12.485 18 17 0 17 0 0 5.061 0 5.061 12.485"/>
    <path d="M62.991,0 L56.069,0 L50.841,5.265 L45.64,0 L33.537,0 L33.537,8.355 C33.537,10.39 32.904,12.547 28.355,12.547 C23.805,12.547 23.173,10.418 23.173,8.355 L23.173,0 L18,0 L18,8.355 C18,14.199 21.107,17 28.364,17 C35.593,17 38.728,14.171 38.728,8.355 L38.728,0.327 C38.728,0.215 38.858,0.159 38.942,0.233 L47.25,8.374 L38.7,16.748 L45.649,16.748 L50.85,11.483 L56.078,16.748 L63,16.748 L54.478,8.374 L62.991,0 Z"/>
  </g>
</svg>`;
}

/** ▼ wordmark with metal gradient */
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
    <polygon points="18 12.485 18 17 0 17 0 0 5.061 0 5.061 12.485"/>
    <path d="M62.991,0 L56.069,0 L50.841,5.265 L45.64,0 L33.537,0 L33.537,8.355 C33.537,10.39 32.904,12.547 28.355,12.547 C23.805,12.547 23.173,10.418 23.173,8.355 L23.173,0 L18,0 L18,8.355 C18,14.199 21.107,17 28.364,17 C35.593,17 38.728,14.171 38.728,8.355 L38.728,0.327 C38.728,0.215 38.858,0.159 38.942,0.233 L47.25,8.374 L38.7,16.748 L45.649,16.748 L50.85,11.483 L56.078,16.748 L63,16.748 L54.478,8.374 L62.991,0 Z"/>
  </g>
</svg>`;
}

// Pre-generated exports
export const logo = getColorSVG();
export const logoMono = getMonoSVG();
export const logoWhite = getWhiteSVG();
export const wordmark = getWordmarkSVG();
export const wordmarkGradient = getWordmarkGradientSVG();
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
