## Design System (AXON-inspired)

### Color Palette

**Primary**
- color-black: #0A0A0A          /* CTA buttons, dark section base /
- color-navy-dark: #0B0F14      / darkest hero/card background /
- color-navy-glow: #0F2A4A      / blue glow gradient on dark sections */

**Accent (signature blue — the only accent color)**
- color-blue-primary: #2E7DF5   /* logo dot, links, icons, active states /
- color-blue-tag-bg: #DCEBFC    / pale blue pill/tag backgrounds /
- color-blue-tag-text: #2E7DF5  / text inside pale blue tags /
- color-blue-highlight: #C7DFFB / highlighter-style text marker behind headlines */

**Neutrals**
- color-white: #FFFFFF
- color-gray-50: #F5F7FA        /* light section backgrounds /
- color-gray-200: #E5E8EC       / borders, dividers /
- color-gray-500: #6B7280       / body copy /
- color-gray-900: #111318       / headline text (near-black, not pure black) */

**Semantic**
- color-badge-popular: #2E7DF5  /* "MOST POPULAR" badge /
- color-success-check: #2E7DF5  / checkmarks — blue, not green */

### Typography

- **Headlines** — bold, tight tracking, near-black (#111318), geometric sans (Inter/Söhne-style)
- **Eyebrow labels** — UPPERCASE, letter-spaced, 11–12px, blue (#2E7DF5) — e.g. "WHY AXON", "PLATFORM"
- **Body** — regular weight, gray (#6B7280), comfortable line-height
- **Index numerals** (01, 02, 03) — large, low-opacity gray, decorative background numerals

### Component Patterns

**Buttons**
- Primary: black bg (#0A0A0A), white text, small-caps label
- Secondary: white bg, black border, black text

**Cards**
- Light: white bg, thin gray border (#E5E8EC), generous padding, blue icon top-left
- Dark/featured: near-black bg (#0B0F14) with subtle blue radial glow — used for hero visuals and the "most popular" pricing tier

**Tags/Pills**
- Pale blue bg (#DCEBFC), blue text (#2E7DF5), small rounded corners, small-caps feel

**Section dividers**
- Dash + uppercase eyebrow label pattern (blue dash/label combo) — recurring structural signature

**Dark hero/section backgrounds**
- Base #0B0F14 → radial/linear gradient into #0F2A4A, positioned bottom-right or center

### Design Principles

- High contrast: pure white sections punctuated by dramatic near-black ones — no gray-on-gray
- One accent color only (blue) — disciplined, no secondary/tertiary accents
- Numbered/indexed content blocks (01–04) as a recurring structural motif
- Generous whitespace, low text density per section
- Highlighter-marker effect on key headline phrases using pale blue background