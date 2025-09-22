import React from 'react';
import { getColorSVG, getMonoSVG, getWhiteSVG } from './logos.js';
import type { LogoVariant } from './types.js';

export interface LuxLogoProps {
  variant?: LogoVariant;
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * React component for Lux logo
 *
 * @example
 * ```tsx
 * import { LuxLogo } from '@lux/logo';
 *
 * <LuxLogo size={64} />
 * <LuxLogo variant="mono" size="2rem" />
 * <LuxLogo variant="white" className="w-16 h-16" />
 * ```
 */
export const LuxLogo: React.FC<LuxLogoProps> = ({
  variant = 'color',
  size = 64,
  className,
  style
}) => {
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

  const sizeStyle = typeof size === 'number'
    ? { width: size, height: size }
    : { width: size, height: size };

  return (
    <div
      className={className}
      style={{ ...sizeStyle, ...style }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

/**
 * Lux favicon component for <head>
 *
 * @example
 * ```tsx
 * import { LuxFavicon } from '@lux/logo';
 *
 * // In your app's <head>
 * <LuxFavicon />
 * ```
 */
export const LuxFavicon: React.FC = () => {
  const svg = getColorSVG();
  const dataUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;

  return (
    <>
      <link rel="icon" type="image/svg+xml" href={dataUrl} />
      <link rel="apple-touch-icon" href={dataUrl} />
    </>
  );
};

// Export with alternative names
export { LuxLogo as LuxfiLogo };
export { LuxFavicon as LuxfiFavicon };