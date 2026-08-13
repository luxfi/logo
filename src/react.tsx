import React from 'react';
import {
  getColorSVG,
  getMonoSVG,
  getWhiteSVG,
  getAnimatedSVG,
  getFaviconSVG,
  getWordmarkSVG,
  getWordmarkAdaptiveSVG,
  WORDMARK_BOX,
} from './logos.js';
import type { LogoVariant } from './types.js';

export interface LogoProps {
  variant?: LogoVariant;
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * ▼ Logo component
 *
 * @example
 * ```tsx
 * import { Logo } from '@luxfi/logo';
 *
 * <Logo size={64} />
 * <Logo variant="mono" size="2rem" />
 * <Logo variant="white" className="w-16 h-16" />
 * ```
 */
export const Logo: React.FC<LogoProps> = ({
  variant = 'color',
  size = 64,
  className,
  style
}) => {
  let svg = '';
  switch (variant) {
    case 'mono': svg = getMonoSVG(); break;
    case 'white': svg = getWhiteSVG(); break;
    case 'animated': svg = getAnimatedSVG(); break;
    default: svg = getColorSVG();
  }

  const dim = typeof size === 'number' ? { width: size, height: size } : { width: size, height: size };

  return (
    <div
      className={className}
      style={{ ...dim, ...style }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

/**
 * Favicon links for <head>.
 *
 * Draws the keyed favicon, not the plain white mark: a tab is painted white in
 * light mode, so a white mark on it is an empty tab.
 */
export const Favicon: React.FC = () => {
  const dataUrl = `data:image/svg+xml,${encodeURIComponent(getFaviconSVG())}`;
  return (
    <>
      <link rel="icon" type="image/svg+xml" href={dataUrl} />
      <link rel="apple-touch-icon" href={dataUrl} />
    </>
  );
};

// Legacy aliases
export { Logo as LuxLogo, Logo as LuxfiLogo };
export { Favicon as LuxFavicon, Favicon as LuxfiFavicon };

export interface WordmarkProps {
  /** Height in px, or any CSS length. Width follows from the 63:17 box. */
  height?: number | string;
  /** Let the mark take the ground's contrast instead of forcing white. */
  adaptive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * LUX — the full wordmark.
 *
 * Sized by HEIGHT, with width left to follow the aspect ratio. This component
 * used to render the ▼ triangle, so every caller asking for a wordmark got a
 * mark, and callers who then forced a square box got a squashed one.
 */
export const Wordmark: React.FC<WordmarkProps> = ({ height = 28, adaptive, className, style }) => {
  const svg = adaptive ? getWordmarkAdaptiveSVG() : getWordmarkSVG();
  const h = typeof height === 'number' ? `${height}px` : height;
  return (
    <span
      className={className}
      aria-label="LUX"
      role="img"
      style={{
        display: 'inline-block',
        height: h,
        aspectRatio: `${WORDMARK_BOX.width} / ${WORDMARK_BOX.height}`,
        ...style,
      }}
      dangerouslySetInnerHTML={{
        __html: svg.replace(/^<svg /, '<svg style="width:100%;height:100%;display:block" '),
      }}
    />
  );
};
