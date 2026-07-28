import React from 'react';
import { getColorSVG, getMonoSVG, getWhiteSVG, getAnimatedSVG } from './logos.js';
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
 * Favicon component for <head>
 */
export const Favicon: React.FC = () => {
  const svg = getColorSVG();
  const dataUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;
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

/** Wordmark = white ▼ triangle */
export const Wordmark: React.FC<Omit<LogoProps, 'variant'>> = (props) => (
  <Logo {...props} variant="white" />
);
