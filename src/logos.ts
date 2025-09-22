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

// Export pre-generated versions for convenience
export const luxLogo = getColorSVG();
export const luxLogoMono = getMonoSVG();
export const luxLogoWhite = getWhiteSVG();
export const luxLogoDataUrl = getLogoDataUrl();
export const luxLogoMonoDataUrl = getLogoDataUrl({ variant: 'mono' });
export const luxLogoWhiteDataUrl = getLogoDataUrl({ variant: 'white' });