# Squeeze — Client-Side Image Compression

A Vite + React + TypeScript app that compresses images entirely in the
browser (canvas/WebAssembly via `browser-image-compression`). Nothing is
uploaded to a server.

## Stack

- Vite + React 18 + TypeScript
- React Router v6 (client-side routing: Compress / Compare / Pricing / About)
- Tailwind CSS v4 (CSS-first config via `@theme` in `src/styles/global.css` — no `tailwind.config.js` needed)
- `browser-image-compression` for the actual compression work

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a static `dist/`
folder you can deploy anywhere (Vercel, Netlify, Cloudflare Pages, S3, etc.)
— there's no backend to stand up.

## Project structure

```
src/
  components/   Dropzone, ImageCard, CompareSlider, SettingsPanel, Header, Footer, AdSlot
  contexts/      ThemeContext (light/dark), UploadContext (file queue + compression state)
  hooks/         useDragAndDrop, useCountUp, useMediaQuery
  pages/         Home, Compare, Pricing, About, NotFound
  utils/         compression.ts (wraps browser-image-compression, byte formatting, downloads)
  types/         shared TypeScript types
  styles/        global.css (Tailwind v4 entry + design tokens)
```

## Design tokens

Color, font, and semantic tokens live in `src/styles/global.css` under
`@theme` (Tailwind v4's CSS-first config) plus a small set of
light/dark semantic variables (`--bg`, `--fg`, `--accent`, etc.) toggled by
`data-theme` on `<html>`, set by `ThemeContext`.

## Notes

- Compression settings (quality, max dimension, output format, EXIF) live in
  `UploadContext` and apply to new uploads immediately; "Re-apply to all"
  reruns them against already-uploaded originals.
- `AdSlot` is a placeholder — swap its inner markup for your ad network's
  embed code when you're ready to monetize.
- This was scaffolded without network access, so `npm install` hasn't been
  run against it yet here — do that locally before `npm run dev`.
