# Jaswanth — Portfolio

A cinematic, lime/black portfolio built with React + Vite + Express. This pass replaced
the old star-field background with a single sitewide WebGL 3D scene and refreshed several
key animations. All content (projects, resume, certificates, contact info) is unchanged —
this was a UI-only pass.

## What changed in this UI pass

- **New sitewide 3D background** (`client/src/components/GlobalBackground.tsx`) — the star
  field is gone. In its place is a real WebGL scene (three.js via `@react-three/fiber`):
  a breathing, distorted wireframe monolith anchoring the hero, a field of low-poly shards
  drifting at different depths, and a horizon grid fading into fog. Scrolling dollies the
  camera through the scene; the mouse adds a light parallax tilt on top.
- **Fixed a real visibility bug**: every section previously had a fully opaque background
  color painted directly over the fixed background layer, so the old star field (and, at
  first, the new scene) was rendering completely hidden behind solid walls the whole time.
  Every section background is now semi-transparent so the 3D scene actually reads through
  the whole site, not just the hero.
- **Refreshed animations**:
  - Hero CTA buttons now have a magnetic pull + spring-physics hover (`useMagnet` hook,
    previously unused, wired in) instead of manual style mutation.
  - The nav's active-link indicator is now an animated shared-layout underline that slides
    between links (`framer-motion` `layoutId`).
  - Project cards (both the featured and grid layouts) now reveal with a 3D rotate + blur
    entrance instead of a plain slide-up.
- Removed dead/unused files that were never actually rendered: the old 2D canvas star
  field, `CinematicCanvas.tsx`, and `ParticleBackground.tsx`.
- Everything else — the custom cursor, letter-reveal hero type, project tilt-on-hover,
  timeline, forms — is the same hand-built system that was already here.

## Run it locally

```bash
npm install
npm run dev      # starts the Express + Vite dev server
```

Then open the printed local URL. To build for production:

```bash
npm run build
npm start
```

## Notes

- The 3D scene is intentionally understated behind text-heavy sections (About, Resume,
  Contact) so nothing hurts legibility, and more present in the Hero.
- No content, copy, project data, resume, or contact details were changed — only the
  UI layer.
