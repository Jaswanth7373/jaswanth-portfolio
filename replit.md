# M N Jaswanth — Portfolio

## Overview
Full-stack portfolio for M N Jaswanth, a B.Tech CSE student at M S Ramaiah University. Built with React + TypeScript + Express, featuring a lime (#c8ff00) on near-black (#050505) design system.

## Architecture

### Frontend (`client/`)
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v3 + custom CSS variables (lime/black theme)
- **Fonts**: Cabinet Grotesk (display/body) + Instrument Mono (code/labels)
- **Routing**: Single-page, anchor-scroll navigation (no wouter needed)

### Backend (`server/`)
- **Framework**: Express + TypeScript
- **Email**: SendGrid (`SENDGRID_API_KEY`) for contact form
- **API**: `POST /api/contact` — sends email, validates with Zod

## Design System

### Color Tokens (CSS Variables)
| Token | Value | Usage |
|---|---|---|
| `--lime` | `#c8ff00` | Primary accent everywhere |
| `--bg` | `#050505` | Main background |
| `--bg2` | `#080808` | Alternate section bg |
| `--bg3` | `#0d0d0d` | Card bg |
| `--text` | `#efefef` | Primary text |
| `--grey` | `#888` | Secondary text |
| `--grey2` | `#444` | Tertiary text |

### Tailwind Primary
`--primary: 74 100% 50%` (maps to lime #c8ff00)
`--primary-foreground: 0 0% 0%` (black — for text on lime buttons)

## Key Components

| Component | Purpose |
|---|---|
| `CustomCursor` | Small lime dot + slim trailing ring, no big circle |
| `Loader` | Character-by-character name reveal + progress bar |
| `MarqueeStrip` | Scrolling tech skills strip between hero and about |
| `ParticleBackground` | Canvas particle field with lime connections |
| `TypingAnimation` | Cycles 5 role strings with typewriter effect |
| `HeroSection` | Stats bar, particle canvas, social links, CTAs |
| `AboutSection` | Bio, skills cloud, timeline, 8 certifications with links |
| `ProjectsSection` | Featured big cards + 3-col grid, tilt + modal |
| `BlogSection` | Search + filter, blog cards with tilt, newsletter |
| `ResumeSection` | Highlights grid, skill categories, open CTA |
| `ContactSection` | Contact links + live SendGrid form |
| `Footer` | Brand, nav links, socials, back-to-top |

## Custom Hooks
- `useTilt(intensity)` — 3D perspective tilt on mousemove
- `useReveal(threshold)` — IntersectionObserver scroll reveal

## Personal Data
- **Name**: M N Jaswanth
- **Email**: jaswanthsimha533@gmail.com
- **GitHub**: Jaswanth7373
- **LinkedIn**: m-n-jaswanth
- **Instagram**: jaswanthsimha
- **Location**: Bengaluru, India
- **CGPA**: 88.1%
- **8 Certifications** (Deloitte, Internshala, Microsoft Azure, Edunet, Broadridge ×2, be10x, Upstop)
- **6 Projects** (2 featured, 4 grid)

## Environment Secrets
- `SENDGRID_API_KEY` — for contact form emails
- `SESSION_SECRET` — Express session secret

## Dev Server
- Runs on port 5000 (Express serves both API + Vite frontend)
- `npm run dev` — starts both server and Vite HMR
