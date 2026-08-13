#!/usr/bin/env node

/**
 * Write the square icon set a web surface needs, from this package's geometry.
 *
 *   npx lux-icons apps/web/public/brand/lux
 *
 * Every surface needs the same four files in the same shapes, and each one used
 * to draw them itself — which is how one shipped a featureless rounded square
 * and another a purple diamond. The geometry has one home; this puts the raster
 * slots downstream of it, so a change to the mark reaches them by rebuilding.
 *
 * PNGs get an explicit ground because Android and iOS composite them onto
 * whatever they like; the SVG stays transparent and follows the tab's scheme.
 */

import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { getWordmarkSquareSVG } from './logos.js';

export interface IconSet {
  /** Ground for the raster icons. */
  background?: string;
  /** Mark colour on that ground. */
  fill?: string;
}

const RASTER = [
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
];

export async function writeIcons(outDir: string, opts: IconSet = {}): Promise<string[]> {
  const { background = '#0a0a0a', fill = '#ffffff' } = opts;
  fs.mkdirSync(outDir, { recursive: true });

  const written: string[] = [];

  // The tab icon: no ground, so it reads on light and dark chrome alike.
  const svgPath = path.join(outDir, 'icon.svg');
  fs.writeFileSync(svgPath, getWordmarkSquareSVG());
  written.push(svgPath);

  const raster = Buffer.from(getWordmarkSquareSVG({ fill, background }));
  for (const { name, size } of RASTER) {
    const out = path.join(outDir, name);
    await sharp(raster, { density: 384 }).resize(size, size).png().toFile(out);
    written.push(out);
  }

  return written;
}

// Run as a CLI when invoked directly.
if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) {
  const outDir = process.argv[2];
  if (!outDir) {
    console.error('usage: lux-icons <outDir> [--bg=#0a0a0a] [--fill=#ffffff]');
    process.exit(1);
  }
  const arg = (k: string) => process.argv.find((a) => a.startsWith(`--${k}=`))?.split('=')[1];
  const files = await writeIcons(outDir, { background: arg('bg'), fill: arg('fill') });
  for (const f of files) console.log(`✓ ${f}`);
}
