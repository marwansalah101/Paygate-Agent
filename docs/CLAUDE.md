## Project Structure

project-root/
├── public/
│   ├── images/
│   └── icons/
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── projects/
│   │       └── [slug]/
│   │           └── page.tsx
│   │
│   ├── views/                  # Page-level sections
│   │   ├── HomeView.tsx
│   │   ├── AboutView.tsx
│   │   ├── ProjectsView.tsx
│   │   └── ContactView.tsx
│   │
│   ├── components/             # Reusable components
│   │   ├── ui/                 # Button, Card, Badge, etc.
│   │   ├── layout/              # Header, Footer, Nav
│   │   └── shared/              # ProjectCard, SectionTitle, etc.
│   │
│   ├── hooks/                  # useScrollSpy, useTheme, etc.
│   ├── lib/                    # utils.ts (cn(), formatters)
│   ├── types/                  # shared TS types
│   └── constants/              # project data, nav links, etc.
│
├── tailwind.config.ts
├── next.config.js
└── package.json

**Conventions:**
- `app/` pages stay thin, just render the matching view: `app/page.tsx` → `<HomeView />`
- `views/` = full page sections, each can have its own `components/` subfolder if needed
- `components/ui/` = generic primitives, `components/shared/` = composed but reused across views

## React libraries
- lenis      - smooth scroll wrapper
- gsap       - ScrollTrigger — pinning, scrubbing, parallax
- three.js   - hero/background 3D canvas, isolated component
- motion     - component transitions, hover, menus (formerly framer-motion)
- @react-three/fiber + @react-three/drei - React wrapper/helpers for three.js

**Division of labor:**
- Lenis → global smooth scroll wrapper only
- GSAP + ScrollTrigger → scroll-scrubbed/pinned animations (galleries, section pins, parallax)
- motion → component enter/exit, hover states, menu transitions, layout animations
- three.js (via R3F) → hero canvas / background 3D only, isolated component
- Sync note: drive Three.js scroll-reactivity off Lenis's scroll value, not native `window.scroll`, or it'll lag a frame behind

## UI Component Sourcing
- **shadcn/ui** — base primitives, install via `npx shadcn`
- **21st.dev** — community registry of shadcn/ui-based components (heroes, nav, footers, cards, scroll areas, shaders)
- **Aceternity UI** — animated components (bento grids, spotlight cards, text reveals), Awwwards-coded aesthetic
- **Magic UI** — similar to Aceternity, free/open-source, built with motion + Tailwind
- **Hover.dev** — GSAP/motion-based animated components
- Custom scroll/animation logic (GSAP, Lenis, motion, three.js) still hand-built on top of these

## Animation/Motion Assets
- **LottieFiles** — pre-made Lottie (vector) animations for lightweight drop-in effects
- **Rive** — interactive vector animations/state machines for more complex interactivity

## 3D/Shader Assets
- **Poly Haven** — free HDRIs/textures/3D models for backgrounds and environment lighting
- **Shadergradient** — shader-based gradient blob backgrounds, exports as React component

## Design Reference
- **Awwwards** — site of the day/honors, primary reference for this aesthetic
- **Godly.website** — curated Awwwards-style gallery
- **Lapa Ninja** — landing page inspo

## Icons/Illustration
- **Lucide** — icon set (comes via shadcn)
- **unDraw / Blush** — customizable illustration sets if needed

## Terminology
- "Scroll-triggered animation" / "scrollytelling" — general term for GSAP ScrollTrigger + Lenis style effects
- "Scroll-jacking" — technical term for hijacking native scroll to pin/control it

## Tech Stack
- React.JS
- Next.js
- Tailwind CSS

## Design system
- Use the design-system set in /docs/Design-system.md and follow its rules

## Rules
- Make sure its looks as beautiful on mobile standards
- Re-test everything to make sure it 100% works
- The design is supposed to be attractive and techy
- all colors are made in a global.css file for easier transition
- read /docs/Voice.md first to understand the project