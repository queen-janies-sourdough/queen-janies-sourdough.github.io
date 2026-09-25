# Queen Janie's Sourdough

Site for Queen Janie's Sourdough — artisan sourdough bread and hands-on
baking classes in McAllen, TX. Built with [Astro](https://astro.build) and
deployed to GitHub Pages.

Live at: https://queenbubbly.github.io

## Development

```bash
npm install
npm run dev       # start the dev server at localhost:4321
```

Other commands:

```bash
npm run build     # build the production site to dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  components/   # page sections (Header, Hero, Menu, Gallery, Classes, Order, Footer, ...)
  layouts/      # shared <head>/<body> shell
  pages/        # index.astro assembles the components into the page
public/assets/  # images, CSS, and JS served as-is
content/        # original source flyers/photos (not built into the site)
```

Menu items, gallery photos/captions, and class details live as data at the
top of their respective components in `src/components/`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
site with `withastro/action` and publishes it via GitHub Pages. In the repo
settings, **Pages → Build and deployment → Source** must be set to
**GitHub Actions**.
