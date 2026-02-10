import type { LogoSettings, LogoOptions } from './types.js';

// Lux logo settings - upside down triangle
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

/**
 * Generate Lux color SVG logo (white upside-down triangle)
 */
export function getColorSVG(): string {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 85 L15 25 L85 25 Z" fill="#ffffff"/>
  </svg>`;
}

/**
 * Generate monochrome SVG logo
 */
export function getMonoSVG(): string {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 85 L15 25 L85 25 Z" fill="none" stroke="black" stroke-width="2"/>
  </svg>`;
}

/**
 * Generate tightly cropped color SVG logo
 */
export function getColorSVGCropped(): string {
  // Already minimal, return as-is
  return getColorSVG();
}

/**
 * Generate white SVG logo (for dark backgrounds)
 */
export function getWhiteSVG(): string {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 85 L15 25 L85 25 Z" fill="white"/>
  </svg>`;
}

/**
 * Generate monochrome SVG for menu bar (filled, tightly cropped)
 */
export function getMenuBarSVG(): string {
  // For menu bar, solid filled version for better visibility at small sizes
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 85 L15 25 L85 25 Z" fill="currentColor"/>
  </svg>`;
}

/**
 * Generate favicon SVG (white triangle on black background)
 * Optimized for small sizes (16px-64px)
 */
export function getFaviconSVG(): string {
  return `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="8" fill="#000000"/>
    <path d="M32 52 L12 18 L52 18 Z" fill="#ffffff"/>
  </svg>`;
}

/**
 * Get logo as data URL
 */
export function getLogoDataUrl(options: LogoOptions = {}): string {
  const { variant = 'color' } = options;
  let svg = '';

  switch (variant) {
    case 'mono':
      svg = getMonoSVG();
      break;
    case 'white':
      svg = getWhiteSVG();
      break;
    default:
      svg = getColorSVG();
  }

  const base64 = btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Get logo as base64 string
 */
export function getLogoBase64(options: LogoOptions = {}): string {
  const { variant = 'color' } = options;
  let svg = '';

  switch (variant) {
    case 'mono':
      svg = getMonoSVG();
      break;
    case 'white':
      svg = getWhiteSVG();
      break;
    default:
      svg = getColorSVG();
  }

  return btoa(unescape(encodeURIComponent(svg)));
}

/**
 * Get logo in requested format
 */
export function getLogo(options: LogoOptions = {}): string {
  const { variant = 'color', format = 'svg' } = options;

  switch (format) {
    case 'dataUrl':
      return getLogoDataUrl({ variant });
    case 'base64':
      return getLogoBase64({ variant });
    default:
      switch (variant) {
        case 'mono':
          return getMonoSVG();
        case 'white':
          return getWhiteSVG();
        default:
          return getColorSVG();
      }
  }
}

/**
 * Generate LUX wordmark SVG (white text)
 * Uses production paths from design/lux wordmark.svg
 */
export function getWordmarkSVG(): string {
  return `<svg width="126" height="34" viewBox="0 0 63 17" xmlns="http://www.w3.org/2000/svg">
  <g fill="#ffffff" fill-rule="nonzero">
    <polygon points="18 12.485 18 17 0 17 0 0 5.061 0 5.061 12.485"/>
    <path d="M62.991,0 L56.069,0 L50.841,5.265 L45.64,0 L33.537,0 L33.537,8.355 C33.537,10.39 32.904,12.547 28.355,12.547 C23.805,12.547 23.173,10.418 23.173,8.355 L23.173,0 L18,0 L18,8.355 C18,14.199 21.107,17 28.364,17 C35.593,17 38.728,14.171 38.728,8.355 L38.728,0.327 C38.728,0.215 38.858,0.159 38.942,0.233 L47.25,8.374 L38.7,16.748 L45.649,16.748 L50.85,11.483 L56.078,16.748 L63,16.748 L54.478,8.374 L62.991,0 Z"/>
  </g>
</svg>`;
}

/**
 * Generate LUX wordmark SVG with metal gradient
 */
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

// Export pre-generated versions for convenience
export const luxLogo = getColorSVG();
export const luxLogoMono = getMonoSVG();
export const luxLogoWhite = getWhiteSVG();
export const luxWordmark = getWordmarkSVG();
export const luxWordmarkGradient = getWordmarkGradientSVG();
export const luxLogoDataUrl = getLogoDataUrl();
export const luxLogoMonoDataUrl = getLogoDataUrl({ variant: 'mono' });
export const luxLogoWhiteDataUrl = getLogoDataUrl({ variant: 'white' });