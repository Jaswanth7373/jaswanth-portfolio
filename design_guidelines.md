# Jaswanth Simha Portfolio - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern tech portfolios like Linear, Vercel, and Framer, combined with futuristic gaming UI aesthetics for the glassmorphism and neon elements.

## Core Design Elements

### A. Color Palette
**Dark Mode Primary**:
- Background: 8 15% 8% (deep navy-black)
- Surface: 220 25% 12% (dark blue-gray)
- Primary: 200 100% 60% (electric cyan)
- Accent: 280 100% 70% (neon purple)
- Text Primary: 0 0% 95% (near white)
- Text Secondary: 0 0% 70% (light gray)

**Light Mode** (for toggle):
- Background: 0 0% 98% (off-white)
- Surface: 220 20% 95% (light blue-gray)
- Primary: 200 80% 45% (deep cyan)
- Accent: 280 60% 50% (muted purple)

### B. Typography
- **Primary**: Inter (clean, modern readability)
- **Accent**: Orbitron (futuristic headings and tech elements)
- **Body**: Poppins (warm, approachable content)

### C. Layout System
**Spacing**: Tailwind units of 4, 6, 8, 12, 16, 24 for consistent rhythm

### D. Visual Effects
**Glassmorphism**: Semi-transparent cards (backdrop-blur-xl) with subtle borders using primary color at 20% opacity

**Neon Accents**: 
- Subtle glows on interactive elements using box-shadow with primary/accent colors
- Animated borders on focus states
- Pulsing effects on CTA buttons

**Particle Animation**: Floating geometric shapes in hero background with slow, organic movement

### E. Component Library

**Navigation**: Fixed glassmorphic header with smooth scroll indicators

**Cards**: Hover-lift animations (translateY + shadow increase) with glassmorphic backgrounds

**Buttons**: 
- Primary: Solid with subtle glow
- Secondary: Outline with blur background when over images
- CTA: Gradient with pulse animation

**Forms**: Glassmorphic inputs with animated labels and neon focus states

**Modals**: Full glassmorphic overlay with backdrop blur

**Skill Visualization**: Interactive radar chart with animated data points and hover details

**Timeline**: Vertical design with connecting lines and glassmorphic milestone cards

## Animations
**Micro-interactions**:
- Typing animation for hero tagline
- Stagger animations for skill badges
- Smooth hover transitions (200-300ms)
- Page load fade-ins with stagger delays

**Scroll Effects**:
- Smooth scrolling with active navigation highlights
- Subtle parallax on hero elements
- Intersection-based animations for sections

## Layout Structure
**Single-page application** with smooth scroll navigation:
1. Hero (full viewport with particle background)
2. About Me (timeline + skills visualization)
3. Featured Projects (grid with modal interactions)
4. Blog/Articles (filterable grid)
5. Resume highlights + download
6. Contact form with social integration
7. Minimal footer with glowing accent border

## Responsive Behavior
- Mobile: Single column, condensed spacing
- Tablet: Two-column grids where appropriate
- Desktop: Full multi-column layouts with enhanced animations

## Interactive Features
- Dark/light mode toggle with smooth color transitions
- Smooth scrolling with momentum
- Hover states on all interactive elements
- Modal overlays for project details
- Search and filter functionality for blog
- Form validation with animated feedback