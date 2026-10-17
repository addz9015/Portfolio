# Advika Nagool — Portfolio

My personal portfolio: who I am, what I'm building, and the questions I keep chasing across data science, AI/ML, research and quantum computing.

**Live site:** https://addz9015.github.io/Portfolio/

## What's on the site

- **About:** how I like to work, and where archery, rifle shooting and guitar fit in
- **Experience:** an interactive timeline of my internships
- **Projects:** six flip cards (quantum ML, Braille recognition, fraud detection, a PR review bot, SQL analytics, a quantum-circuit DBMS), each linking to its repository
- **Currently exploring:** the areas I'm learning right now
- **Achievements:** competitions, research and sport, with certificates viewable in a pop-up
- **Contact:** email, LinkedIn, GitHub and a terminal-style message form

## Design choices

The site is built around a terminal motif, because that's where most of my work happens. The hero runs a `whoami` command that reveals my name on a split-flap board. The contact form is a shell prompt, and its button says `[ EXECUTE ]`. The blue-on-paper palette and monospace labels are meant to feel like a research notebook rather than a sales page. The project artwork is hand-built SVG, one illustration per project.

## Tech stack

- React 19 + TypeScript, bundled with Vite
- Tailwind CSS v4 plus hand-written CSS for the layout and animations
- Lenis for smooth scrolling
- Web3Forms to deliver contact-form messages
- GitHub Actions deploying to GitHub Pages (`.github/workflows`)

## Run locally

```bash
cd advika-portfolio
pnpm install
pnpm dev
```

The contact form needs a Web3Forms key in `advika-portfolio/.env`:

```
VITE_WEB3FORMS_ACCESS_KEY=your_key_here
```

In production, the key comes from the `WEB3FORMS_ACCESS_KEY` repository secret.

## Credits

- **Project scaffold:** The initial React + Vite project structure was generated with [Manus](https://manus.im). The page content, layout, design and interactions in `client/src/pages/Home.tsx`, `client/src/components/ProjectArt.tsx`, `client/src/components/AsciiWaves.tsx` and `client/src/index.css` are my own work.
- **AI assistance:** I used AI coding assistants to help write and debug code, as the assignment permits. The ideas, writing and design are mine.
- **UI primitives:** The dialog and alert-dialog components in `client/src/components/ui/` come from [shadcn/ui](https://ui.shadcn.com) (MIT), built on [Radix UI](https://www.radix-ui.com).
- **Icons:** [Lucide](https://lucide.dev) (ISC)
- **Fonts:** [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [DM Sans](https://fonts.google.com/specimen/DM+Sans) and [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono), via Google Fonts (SIL Open Font License)
- **Smooth scrolling:** [Lenis](https://github.com/darkroomengineering/lenis) (MIT)
- **Contact form delivery:** [Web3Forms](https://web3forms.com)
- **Photos and certificates:** my own

The Quantum Circuit DBMS project is team work with [horserider2146](https://github.com/horserider2146). BrailleBridge was built with Thejovati Narayanan and Lakshita Mukti.

## License

MIT. See `LICENSE`.
