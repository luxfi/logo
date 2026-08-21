# @luxfi/logo

The Lux marks. This package is where the geometry lives; every Lux surface
reads it from here rather than keeping a drawing of its own.

## Which mark goes where

**Every Lux surface wears the full `LUX` wordmark.** `lux.exchange` is the one
exception — it wears the `LX` mark. A new surface gets the wordmark unless
someone says otherwise. This holds for headers and for square icon slots alike.

`LX` is the wordmark short a letter. Not a redraw and not a crop — the L is the
same string the wordmark draws, and the X is the same path moved 20 to the left.
The two marks cannot drift apart, because there is only one of each letter.

## What ships

| Function | Draws |
|---|---|
| `getColorSVG` / `getWhiteSVG` | ▼ in white |
| `getMonoSVG` | ▼ outlined |
| `getMenuBarSVG` | ▼ in `currentColor` |
| `getFaviconSVG` | ▼ keyed for the tab — reads on light and dark, no container |
| `getAnimatedSVG` | ▼ with a pure-CSS load/hover/press |
| `getWordmarkSVG` | LUX, white |
| `getWordmarkAdaptiveSVG` | LUX, taking contrast from its ground |
| `getWordmarkSquareSVG` | LUX letterboxed into a square, for icon slots |
| `getWordmarkGradientSVG` | LUX, metal gradient |
| `getLXSVG` | LX in `currentColor`, for inlining |
| `getLXAdaptiveSVG` | LX, taking contrast from its ground |
| `getLXSquareSVG` | LX letterboxed into a square, for icon slots |

React: `<Wordmark height adaptive>` and `<LX height adaptive>`, both sized by
height with the width following the box.

`WORDMARK` is one string on a 63×17 box, and every wordmark view above is that
string under a different fill or transform. It used to be pasted into each
function, so the letterforms lived in as many places as there were ways to look
at them.

## How LX was cut

The wordmark's U and X share one path: they touch, and whatever drew the
original unioned them into a single outline rather than leaving two shapes to
meet at a point. So the U cannot simply be deleted — the cut is at the seam.

Two judgements, both recoverable from the wordmark's own numbers:

**The kern is 20.** In the word every letter sits flush against the next — the
L's foot ends on x=18 where the U's stem begins, the U's stem ends on x=38.7
where the X's arm begins — and the air comes from the letterforms, not the fit.
Setting the X flush against the L the same way (kern 20.7) welds them: the U
meets its neighbour with a stem that starts at the cap line, the X with a
diagonal that has already reached the baseline by the time it arrives, and the
baseline is exactly where the L's foot is. So the fit comes from what the word
does at its tightest instead — 0.73 between that same foot and the U's bowl.
Twenty leaves 0.70, and lands the X's far corner on the box edge as the wordmark
does. Nothing between 19 and 20.7 is arbitrary; 20 is the one that matches.

**The X's top-left corner is (38.7,0), not the (38.942,0.233) the wordmark
writes.** That is not a corner at all — it is a point part-way down the arm's
edge, where the union chamfered the kiss with the U. The X is mirror-symmetric
about y=8.374, half the 16.748 it is written with, and 38.7 is already written
for the bottom-left corner. With the U gone the chamfer has nothing to hide
behind and reads as a nicked corner.

Everything else is untouched: past x=38.8, where the wordmark draws nothing but
the X, the two outlines agree to 0.011% of the letter's area at 60px/unit — edge
jitter, not geometry. Splitting the wordmark itself into three letters was
tried and rejected: separate abutting paths anti-alias their shared edges
independently, which puts a faint seam where the letters touch. `WORDMARK` stays
one string and its output is byte-identical to what it has always been.

## The square problem

A 3.7:1 wordmark in a 1:1 hole is the whole difficulty. Stretch it to fill and
you get fat letters; crop it to fill and you get "LU". Both shipped at some
point. `getWordmarkSquareSVG` letterboxes instead: one scale factor applied to
both axes, the leftover as padding, so the ratio is preserved by construction.

Legible from about 32px up. Below that the letterforms close. LX is what clears
a 16px tab — two letters at 2.5:1 where the word is four at 3.7:1 — which is why
the exchange wears it in its icon slots as well as its header.

## Getting it into a surface

Two ways, and only two:

- **Import it.** `getWordmarkAdaptiveSVG()` / `getWordmarkSquareSVG()` at build
  time, written into the app's served directory. luxfi/wallet does this from a
  Vite plugin; luxfi/safe-wallet from `scripts/generate-brand.mjs`. The generated
  files are gitignored in both, so neither repo carries artwork.
- **Fetch it.** For consumers that cannot import — a gateway's `chains.json`, a
  runtime `brand.json` — the published `svg/` directory is on jsDelivr:
  `https://cdn.jsdelivr.net/npm/@luxfi/logo@<version>/svg/lux-wordmark.svg`.
  Pin the version. **`cdn.lux.network` is not a home for these** — nothing
  serves it, and paths pointing there 404.

`npx lux-icons <dir>` writes the raster set (icon.svg + android-chrome 192/512 +
apple-touch-icon) from the same geometry, so PNG slots stay downstream of the
mark instead of beside it. `--mark=lx` for the exchange, and nothing else.

## Releasing

`npm run build` compiles; `npm run generate` refreshes `svg/` and `dist/`
rasters from the functions — run it when geometry changes, and commit `svg/`.
`prepublishOnly` cleans `dist/` first, which is what keeps the published tarball
small (the generated PNGs never reach npm). Publish is `npm publish` as `zeekay`.
Bump the patch; never jump majors.

Consumers pinning this package: `@luxfi/brand`, `luxfi/docs-template`,
`luxfi/help`, `luxfi/forum`, `luxfi/wallet` (apps/web), `luxfi/safe-wallet`
(apps/web). Note that safe-wallet's `.yarnrc.yml` holds a 7-day npm age gate —
`@luxfi/*` is on its `npmPreapprovedPackages` list so a fresh publish installs.

## Rules for AI Assistants

1. **ALWAYS** update this file with significant discoveries.
2. **NEVER** create random summary files — update THIS file.
3. **NEVER** invent, redraw or re-trace a mark, and never embolden one by
   stroking it. A new mark is either the existing geometry rearranged — the way
   LX is — or it is somebody's drawing, and this package does not do drawing.
   Say which one must be produced and ship the rest.
