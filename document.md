# 🚀 Futuristic Portfolio — Complete Build Prompt
### For: Satyam Sah (satyamsah.com) — Full Stack Developer

---

## 📋 PROJECT OVERVIEW

Build a **fully immersive, futuristic, single-page portfolio** for **Sat Narayan Sah (Satyam Sah)** — a Full Stack Developer (MERN/MEAN) from JanakpurDham, Nepal. The design language should feel like a **sci-fi OS dashboard** crossed with a **cyberpunk dev terminal** — dark, glowing, precise. Every section should breathe with animation. The goal is to be unforgettable.

---

## 🎨 DESIGN SYSTEM

### Color Palette
```
--bg-primary:      #020409       /* Deep space black */
--bg-secondary:    #080d1a       /* Dark navy */
--bg-card:         #0d1526       /* Card surface */
--accent-cyan:     #00f5ff       /* Primary glow */
--accent-purple:   #7c3aed       /* Secondary glow */
--accent-green:    #00ff88       /* Terminal green */
--accent-orange:   #ff6b35       /* Highlight warm */
--text-primary:    #e2e8f0       /* Off-white */
--text-muted:      #4a5568       /* Dim grey */
--border-glow:     rgba(0,245,255,0.15)
--grid-line:       rgba(0,245,255,0.04)
```

### Typography
```
Headings:  'Space Grotesk' (Google Fonts) — weights 300, 500, 700
Body:      'Inter' — weights 400, 500
Mono/Code: 'JetBrains Mono' — for tech tags, terminals, code snippets
```

### Visual Language
- **Background:** animated SVG grid with perspective depth (CSS transform3d)
- **Cards:** glassmorphism with `backdrop-filter: blur(20px)`, glowing borders
- **Borders:** thin cyan or purple neon glow — `box-shadow: 0 0 20px var(--accent-cyan)`
- **Cursor:** custom cursor (ring + dot) that reacts to hover states
- **Noise texture:** subtle CSS noise overlay for depth

---

## 📦 ANIMATION STACK

Install all of these. Each serves a specific role — do not replace one with another.

```bash
npm install gsap animejs lottie-web @motionone/dom
```

### Animation Responsibility Matrix

| Library | Used For | Sections |
|---|---|---|
| **GSAP** + ScrollTrigger | Scroll-driven reveals, parallax, pinning, timeline orchestration | Hero, Experience, Projects, Skills |
| **GSAP** MorphSVG | SVG shape morphing on hover & transitions | Hero icons, Section dividers |
| **Anime.js** | Staggered grid animations, skill bar fills, number counters | Skills, Stats, About grid |
| **Lottie** | After Effects JSON animations — loading screen, section icons | Loader, Service icons, Contact |
| **Motion One** | Micro-interactions, button physics, magnetic hover, gesture-based | Nav, Buttons, Cards, Cursor |

---

## 🏗️ FULL SECTION BREAKDOWN

---

### 1. 🔄 LOADING SCREEN

**Package:** Lottie + GSAP

```
- Full-screen black overlay
- Lottie JSON animation: "code compiling" or "circuit board" (use lottiefiles.com — free)
  → Recommended: https://lottiefiles.com/animations/coding (search: "code", "circuit")
- Progress bar fill: cyan glow, bottom of screen
- Text: "INITIALIZING SATYAM.DEV..." monospace, character-by-character reveal (Anime.js)
- After load: GSAP timeline — overlay splits vertically (like a door), reveals hero
- Duration: ~2.5s max
```

**Code blueprint:**
```js
// Anime.js — typewriter text
anime({
  targets: '.loader-text .char',
  opacity: [0, 1],
  duration: 60,
  delay: anime.stagger(40),
  easing: 'linear'
});

// GSAP — split door exit
gsap.timeline()
  .to('.loader-left', { x: '-100%', duration: 0.8, ease: 'power3.inOut' })
  .to('.loader-right', { x: '100%', duration: 0.8, ease: 'power3.inOut' }, '<')
  .from('.hero', { opacity: 0, duration: 0.5 });
```

---

### 2. 🌌 HERO SECTION

**Package:** GSAP + Anime.js + Canvas

```
Layout:
  LEFT:  Profile photo (hexagonal clip-path), name, title, social icons, CTA buttons
  RIGHT: Interactive 3D rotating tech orbit (Canvas or CSS 3D)

Background:
  - Animated SVG grid lines — subtle perspective, extending to horizon
  - Floating particles (Canvas — requestAnimationFrame) — tiny cyan dots drifting
  - One large blurred radial gradient blob (CSS) — moves slowly on mousemove

Profile Photo:
  - Hexagon shape via clip-path polygon
  - Glowing animated border (CSS @keyframes rotating gradient)
  - On load: scale from 0.8 → 1 + fade in (GSAP)

Name Animation:
  - "Sat Narayan Sah" — split into chars, staggered drop-in (GSAP SplitText or manual)
  - Subtitle: "Full Stack Developer" — typewriter effect (Anime.js)
  - Under subtitle: rotating badge chips — MERN | MEAN | Cloud | Next.js (auto-rotate with fade)

Tech Orbit (Right side):
  - 8–10 tech icon SVGs orbiting a central glowing circle
  - CSS 3D perspective + GSAP rotation loop
  - On hover: pause orbit, zoom hovered icon, show tooltip

Social Icons:
  - Magnetic hover effect (Motion One) — icons repel/attract cursor
  - Glow on hover matching brand color (GitHub=white, LinkedIn=blue, etc.)

CTA Buttons:
  - "Download Resume" → cyan fill, glitch hover effect
  - "Contact Me" → outline with animated dashed border on hover
  - Both: particle burst on click (Anime.js)
```

---

### 3. 👤 ABOUT SECTION

**Package:** GSAP ScrollTrigger + Anime.js

```
Layout: 3-column bento grid

Panels:
  [A] Bio card — text, with animated background code rain (Canvas, subtle opacity)
  [B] Stats block — "3+ Years", "6+ Projects", "5+ Open Source"
       → Numbers count up from 0 when scrolled into view (Anime.js)
  [C] Location card — minimal animated Nepal map SVG, glowing pin dot
  [D] Language proficiency — Nepali, English, Hindi, Maithili
       → Radial fill rings (Anime.js SVG strokeDashoffset)
  [E] Contact info card — icons + text, hover glow

On Scroll:
  - Cards appear with staggered fade+translate (GSAP ScrollTrigger, stagger: 0.1s)
  - Grid lines draw in from center (SVG stroke animation)
```

---

### 4. ⚙️ SERVICES SECTION

**Package:** Lottie + Motion One + GSAP

```
4 service cards in a 2×2 grid (mobile: vertical stack)

Services:
  1. Full Stack Web Development
  2. Graphics Designing
  3. Digital Marketing
  4. Email Marketing

Each Card:
  - Lottie animation as icon (replace static PNG) — loop on hover only
  - Number (01, 02...) in giant ghosted text behind card
  - On hover: card lifts (transform: translateY(-12px))
  - Border traces itself on hover (SVG rect stroke animation, GSAP DrawSVG)
  - Background: subtle gradient shift on hover

Section Entrance:
  - Cards slide in from alternating sides (odd=left, even=right), staggered (GSAP ScrollTrigger)
```

---

### 5. 📊 SKILLS SECTION

**Package:** Anime.js + GSAP

```
Two sub-sections: "Tech Stack" + "Proficiency Bars"

Tech Stack Grid:
  - 16 tech logos in a masonry/hexagon grid layout
  - Each icon in a glowing hexagon tile
  - Entrance: staggered scale + opacity from center outward (Anime.js stagger)
  - Hover: icon rotates 360°, tile border pulses

Proficiency Bars (HTML, CSS, JS, React, etc.):
  - Custom styled bars — NOT default progress bars
  - Style: horizontal glowing line with % marker
  - On scroll into view: bar fills left→right with easing (Anime.js, width: 0 → X%)
  - Cyan glow at the fill tip

Knowledge Tags:
  - Pills with tick icons — animate in like typing (sequential fade, Anime.js stagger)

Languages:
  - Circular SVG rings — animate strokeDashoffset on scroll (Anime.js)
```

**Anime.js skill bar blueprint:**
```js
ScrollTrigger.create({
  trigger: '.skills-section',
  onEnter: () => {
    anime({
      targets: '.skill-bar-fill',
      width: (el) => el.dataset.percent + '%',
      duration: 1200,
      delay: anime.stagger(100),
      easing: 'easeOutExpo'
    });
  }
});
```

---

### 6. 📅 RESUME / EXPERIENCE SECTION

**Package:** GSAP ScrollTrigger + Motion One

```
Layout: Vertical timeline — centered line, alternating left/right cards

Timeline Line:
  - SVG vertical line that "draws" downward as user scrolls (GSAP DrawSVG or strokeDashoffset)
  - Glowing dot at each milestone point

Experience Cards:
  - Full Stack Developer & Freelancer (2023–Present)
  - System Engineer — Mithila Development Fund (2023–2024)
  - Lab System Engineer — MREC (2022–2023)

Education Cards:
  - Janakpur Community College — BIT (2023–Present)
  - MREC — Diploma in Computer Engineering (2018–2022)
  - Shree Girija Secondary School — SEE (2008–2018)

Each Card:
  - Glassmorphism style
  - Date badge with neon border
  - Entrance: slide in from respective side + fade (GSAP ScrollTrigger)
  - Hover: subtle 3D tilt (Motion One perspective)

Active/Current item:
  - Glowing pulse ring around dot (CSS @keyframes)
  - "CURRENT" badge with green blink
```

---

### 7. 🗂️ PROJECTS SECTION

**Package:** GSAP + Motion One + Anime.js

```
Filter Tabs: All | React | Next.js | Django | Node — animated underline slide (GSAP)

Projects (7 total):
  1. Business website (React + Tailwind + Django)
  2. Education Website (HTML + CSS + PHP)
  3. Foodmandu Clone (React + Tailwind + OpenAPI)
  4. Wedding VideoShoot Website (Next.js + Django)
  5. Advice Generator (React + OpenAPI)
  6. Countries Details Website (React + OpenAPI)
  7. GitHub Profile Finder (React + OpenAPI)

Each Card:
  - Screenshot with overlay on hover
  - Tech tag chips (colored by category)
  - GitHub + Live demo buttons appear on hover (slide up)
  - Card: 3D tilt on mouse move (Motion One)
  - Border: animated gradient rotation on hover (CSS)

Grid Entrance:
  - Cards pop in with staggered scale effect (Anime.js)
  - Filter transition: GSAP flip animation (reorder without layout jump)

Hover Overlay:
  - Project screenshot darkens
  - Title + tags + buttons fade in upward
  - Scanline effect (CSS repeating-linear-gradient animation)
```

---

### 8. 📝 BLOG SECTION

**Package:** Motion One + GSAP

```
Currently 1 post — design for 3-card grid, show "More Coming Soon" cards as placeholders

Blog Card:
  - Thumbnail with parallax on scroll (GSAP ScrollTrigger scrub)
  - Category badge + read time
  - Title + excerpt
  - Hover: image zoom, card lifts
  - "Read More" link with animated arrow →

Placeholder cards:
  - Blurred/dimmed, "Coming Soon" badge, animated shimmer loading effect
```

---

### 9. 📬 CONTACT SECTION

**Package:** GSAP + Lottie + Anime.js

```
Layout: Two columns
  LEFT:  Contact info cards + Lottie animation (envelope/communication themed)
  RIGHT: Contact form

Contact Info:
  - Location, Email, Phone — each in a glowing card
  - Lottie icon per card (location pin animate, email fly, phone ring)
  - Cards entrance: stagger slide-up (GSAP ScrollTrigger)

Contact Form:
  - Inputs: dark glass bg, cyan glowing bottom border (not full border)
  - Label: floats up on focus (CSS transition)
  - On focus: border pulses brighter
  - Submit button:
    → Default: "Send Message" with rocket icon
    → On click: particle burst + loading spinner (Anime.js)
    → On success: morph to ✓ checkmark (GSAP MorphSVG)
  - Form validation: shake animation on error (Anime.js)

Background:
  - Subtle animated circuit board SVG (low opacity)
  - Map embed: custom dark-styled iframe (inject dark CSS or use Mapbox dark theme)
```

---

### 10. 🧭 NAVIGATION

**Package:** Motion One + GSAP

```
- Sticky top nav, transparent → blurred glass on scroll (ScrollTrigger)
- Logo: "S." with animated SVG path draw on load (GSAP DrawSVG)
- Nav links: underline slides from left on hover (CSS + Motion One)
- Active section highlight: smooth underline moves between links (GSAP xPercent)
- Mobile: hamburger → fullscreen overlay menu with staggered link entrance (Anime.js)
- Mobile menu BG: animated noise + grid pattern

Scroll Progress:
  - Thin cyan line at very top of viewport filling as user scrolls (GSAP ScrollTrigger scrub)
```

---

### 11. ✨ GLOBAL MICRO-INTERACTIONS

**Package:** Motion One (primarily)

```
- Custom cursor: outer ring (40px) + inner dot (6px)
  → Ring lags behind cursor (lerp: 0.1)
  → Expands + inverts color over clickable elements
  → Shrinks + changes color over text (text cursor mode)

- Magnetic buttons: elements within 80px attract cursor slightly (Motion One)

- Scroll-to-top button: appears after 400px scroll
  → Rocket icon, launches upward on click with particle trail (Anime.js)

- Section transitions: each section fades from a slight blur (CSS) + translate (GSAP)

- Link hover: text glitch/scramble effect (custom JS + Anime.js, randomize chars → reveal)
```

---

## 📁 RECOMMENDED FILE STRUCTURE

```
satyam-portfolio/
├── index.html
├── assets/
│   ├── css/
│   │   ├── main.css           # Variables, base styles
│   │   ├── animations.css     # Keyframes, transitions
│   │   └── components.css     # Cards, buttons, forms
│   ├── js/
│   │   ├── main.js            # Init, scroll events
│   │   ├── hero.js            # Hero section animations
│   │   ├── loader.js          # Loading screen
│   │   ├── skills.js          # Skill bars, counters
│   │   ├── projects.js        # Filter, cards
│   │   ├── timeline.js        # Experience SVG line
│   │   ├── cursor.js          # Custom cursor + magnetic
│   │   └── contact.js         # Form animations
│   ├── lottie/
│   │   ├── loader.json
│   │   ├── service-dev.json
│   │   ├── service-design.json
│   │   ├── service-marketing.json
│   │   └── contact-envelope.json
│   └── images/               # Existing images from satyamsah.com
├── package.json
└── vite.config.js            # Or webpack / plain script tags
```

---

## 🔗 CDN / NPM IMPORTS

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">

<!-- GSAP + Plugins (CDN) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/DrawSVGPlugin.min.js"></script>
<!-- Note: MorphSVG and DrawSVG are Club GSAP plugins (paid). Free alt: use CSS clip-path transitions -->

<!-- Anime.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js"></script>

<!-- Lottie -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script>

<!-- Motion One (via npm recommended) -->
<!-- npm install @motionone/dom -->
```

---

## 🎬 GSAP SCROLLTRIGGER MASTER SETUP

```js
// main.js — register all plugins
gsap.registerPlugin(ScrollTrigger);

// Global scroll animation helper
function revealOnScroll(selector, options = {}) {
  gsap.from(selector, {
    scrollTrigger: {
      trigger: selector,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
      ...options.scrollTrigger
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: options.stagger || 0.1,
    ease: 'power3.out',
    ...options.animation
  });
}

// Usage example
revealOnScroll('.service-card', { stagger: 0.15 });
revealOnScroll('.project-card', { stagger: 0.1 });
revealOnScroll('.timeline-item', {
  animation: { x: (i) => i % 2 === 0 ? -60 : 60, y: 0 }
});
```

---

## 🎯 LOTTIE FREE ANIMATION SOURCES

Search these on **lottiefiles.com** (free tier):

| Use Case | Search Term |
|---|---|
| Loader | "code compile", "loading circuit", "developer" |
| Web Dev Service | "coding laptop", "web development" |
| Design Service | "graphic design", "pen tool" |
| Marketing Service | "digital marketing", "growth chart" |
| Email Service | "email send", "newsletter" |
| Contact | "send message", "envelope fly" |
| Location | "location pin", "map marker" |

Download as `.json` → load with:
```js
lottie.loadAnimation({
  container: document.getElementById('lottie-loader'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: '/assets/lottie/loader.json'
});
```

---

## 🌐 FREE GSAP ALTERNATIVES (if avoiding Club GSAP)

| Feature | Club GSAP | Free Alternative |
|---|---|---|
| DrawSVG | DrawSVGPlugin | Manual `strokeDashoffset` CSS |
| MorphSVG | MorphSVGPlugin | `<animateTransform>` or flubber.js |
| SplitText | SplitTextPlugin | Manual char splitting with JS |
| ScrollTrigger | ✅ FREE | Same |

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Mobile first */
/* sm: 640px — single column, no orbit */
/* md: 768px — 2-col grid, simplified timeline */
/* lg: 1024px — full layout, orbit active */
/* xl: 1280px — max container width */

/* Disable heavy animations on mobile for performance */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}

/* Disable orbit + canvas on mobile */
@media (max-width: 768px) {
  .hero-orbit { display: none; }
  .particle-canvas { display: none; }
}
```

---

## ⚡ PERFORMANCE CHECKLIST

- [ ] Use `will-change: transform` only on actively animating elements, remove after animation
- [ ] All Canvas operations inside `requestAnimationFrame`
- [ ] Lottie: use `renderer: 'canvas'` for complex animations (faster than SVG)
- [ ] GSAP: use `gsap.ticker` instead of `setInterval`
- [ ] Lazy-load project screenshots (`loading="lazy"`)
- [ ] Defer non-critical JS with `defer` attribute
- [ ] Use `IntersectionObserver` fallback for browsers without ScrollTrigger
- [ ] Compress all images (WebP format recommended)
- [ ] Minify final CSS/JS bundle

---

## 🧑‍💻 FULL CONTENT DATA

### Personal Info
```
Name:     Sat Narayan Sah (Satyam Sah)
Role:     Full Stack Developer & Solutions Architect
Stack:    MERN | MEAN | Next.js | Python | Django
Location: JanakpurDham, Dhanush, Nepal
Email:    contact@satyamsah.com
Phone:    +977-9812039791
GitHub:   github.com/SatNarayanSah
LinkedIn: linkedin.com/in/satnarayansah/
```

### Stats (for count-up animation)
```
Years Experience:  3
Projects Handled:  6
Open Source Libs:  5
```

### Skills with percentages
```js
const skills = [
  { name: 'HTML5',             percent: 95, icon: 'html.svg'     },
  { name: 'CSS3',              percent: 70, icon: 'css.svg'      },
  { name: 'JavaScript',        percent: 75, icon: 'js.svg'       },
  { name: 'ReactJs',           percent: 90, icon: 'react.svg'    },
  { name: 'NextJs',            percent: 83, icon: 'nextjs.svg'   },
  { name: 'Remix',             percent: 60, icon: 'remix.svg'    },
  { name: 'Angular',           percent: 75, icon: 'angular.svg'  },
  { name: 'NodeJs',            percent: 80, icon: 'nodejs.svg'   },
  { name: 'Express Js',        percent: 85, icon: 'express.svg'  },
  { name: 'Python',            percent: 80, icon: 'python.svg'   },
  { name: 'Django',            percent: 60, icon: 'django.svg'   },
  { name: 'Tailwind',          percent: 90, icon: 'tailwind.svg' },
  { name: 'jQuery',            percent: 70, icon: 'jquery.svg'   },
  { name: 'Adobe Photoshop',   percent: 40, icon: 'photoshop.svg'},
  { name: 'Figma',             percent: 75, icon: 'figma.svg'    },
  { name: 'Adobe Illustrator', percent: 30, icon: 'ai.svg'       },
];
```

### Projects
```js
const projects = [
  {
    title: 'Business Website',
    tags: ['React', 'Tailwind', 'Django', 'Python'],
    github: 'https://github.com',
    live: null,
    image: 'digineptronics.png'
  },
  {
    title: 'Education Website',
    tags: ['HTML', 'CSS', 'JS', 'PHP'],
    github: 'https://github.com',
    live: null,
    image: 'site.png'
  },
  {
    title: 'Foodmandu Clone',
    tags: ['ReactJs', 'Tailwind', 'OpenAPI', 'Node'],
    github: 'https://github.com/SatNarayanSah/foodmanduclones',
    live: 'https://satnarayansah-foodmanduclone.vercel.app/',
    image: 'foodmandu_clone.png'
  },
  {
    title: 'Wedding VideoShoot Website',
    tags: ['Nextjs', 'Tailwind', 'Django', 'Python'],
    github: 'https://github.com/SatNarayanSah/theweddyfilmer',
    live: 'https://theweddyfilmer-dc81.vercel.app/',
    image: 'theweddyfilmer.png'
  },
  {
    title: 'Advice Generator',
    tags: ['ReactJs', 'Tailwind', 'OpenAPI'],
    github: 'https://github.com/SatNarayanSah/advice-sgenerator-app',
    live: 'https://satnarayansah-advice-sgenerator-app.vercel.app/',
    image: 'advice.png'
  },
  {
    title: 'Countries Details Website',
    tags: ['ReactJs', 'Tailwind', 'OpenAPI'],
    github: 'https://github.com/SatNarayanSah/countries',
    live: 'https://countries-details-by-satnarayansah.vercel.app/',
    image: 'countries.png'
  },
  {
    title: 'GitHub Profile Finder',
    tags: ['ReactJs', 'Tailwind', 'OpenAPI'],
    github: 'https://github.com/SatNarayanSah/devfinder',
    live: 'https://devfinder-red.vercel.app/',
    image: 'devfinder.png'
  },
];
```

---

## 🔮 BONUS: ADVANCED EFFECTS (Optional but impressive)

### Glitch Text Effect (Hero name)
```js
function glitchText(element) {
  const chars = '!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const original = element.textContent;
  let iteration = 0;
  const interval = setInterval(() => {
    element.textContent = original.split('').map((char, i) => {
      if (i < iteration) return original[i];
      if (char === ' ') return ' ';
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
    if (iteration >= original.length) clearInterval(interval);
    iteration += 1/3;
  }, 30);
}
```

### Particle Canvas (Hero background)
```js
class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }
  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.6 + 0.1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > this.canvas.width) this.reset();
    if (this.y < 0 || this.y > this.canvas.height) this.reset();
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 245, 255, ${this.opacity})`;
    ctx.fill();
  }
}
```

### Magnetic Button (Motion One)
```js
import { animate } from '@motionone/dom';

document.querySelectorAll('.btn-magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    animate(btn, { x: x * 0.3, y: y * 0.3 }, { duration: 0.3, easing: 'ease-out' });
  });
  btn.addEventListener('mouseleave', () => {
    animate(btn, { x: 0, y: 0 }, { duration: 0.5, easing: [0.34, 1.56, 0.64, 1] });
  });
});
```

---

## 📌 IMPLEMENTATION PRIORITY ORDER

Build in this order for best results:

```
Phase 1 — Foundation (Day 1)
  [x] HTML structure + all sections skeleton
  [x] CSS variables, typography, base dark theme
  [x] Grid background, glassmorphism cards
  [x] Responsive layout (mobile + desktop)

Phase 2 — Core Animations (Day 2)
  [x] GSAP ScrollTrigger reveals on all sections
  [x] Hero entrance animation (name, subtitle, photo)
  [x] Anime.js skill bars + stat counters
  [x] Timeline SVG line draw

Phase 3 — Advanced Effects (Day 3)
  [x] Lottie icons (loader + services + contact)
  [x] Custom cursor + magnetic buttons
  [x] Project cards 3D tilt + filter animation
  [x] Glitch text + particle canvas

Phase 4 — Polish (Day 4)
  [x] Loading screen
  [x] Performance optimization
  [x] Mobile testing + reduced-motion fallbacks
  [x] Cross-browser testing
  [x] SEO meta tags, OG image
```

---

*Generated prompt for Satyam Sah's futuristic portfolio rebuild.*
*Based on: https://satyamsah.com*
*Animation stack: GSAP + Anime.js + Lottie + Motion One*