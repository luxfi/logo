import React from 'react';
import {
  getColorSVG,
  getMonoSVG,
  getWhiteSVG,
  getAnimatedSVG,
  getFaviconSVG,
  getWordmarkSVG,
  getWordmarkAdaptiveSVG,
  getLXSVG,
  getLXAdaptiveSVG,
  WORDMARK_BOX,
  LX_BOX,
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
 * Letters, sized by HEIGHT with the width left to follow the aspect ratio.
 * Wordmark used to render the ▼ triangle, so every caller asking for letters
 * got a mark, and callers who then forced a square box got a squashed one.
 */
function letters(
  label: string,
  box: { width: number; height: number },
  plain: () => string,
  adapting: () => string
): React.FC<WordmarkProps> {
  return ({ height = 28, adaptive, className, style }) => (
    <span
      className={className}
      aria-label={label}
      role="img"
      style={{
        display: 'inline-block',
        height: typeof height === 'number' ? `${height}px` : height,
        aspectRatio: `${box.width} / ${box.height}`,
        ...style,
      }}
      dangerouslySetInnerHTML={{
        __html: (adaptive ? adapting() : plain()).replace(
          /^<svg /,
          '<svg style="width:100%;height:100%;display:block" '
        ),
      }}
    />
  );
}

/** LUX — the full wordmark. Every Lux surface but the exchange wears this. */
export const Wordmark = letters('LUX', WORDMARK_BOX, getWordmarkSVG, getWordmarkAdaptiveSVG);

/** LX — the same letters short a U. lux.exchange wears this, and only it. */
export const LX = letters('LX', LX_BOX, getLXSVG, getLXAdaptiveSVG);
