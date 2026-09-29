# Digital Inertia — website

A React + Vite website for Digital Inertia (Home, About, Contact), built with
Framer Motion for scroll and entrance animations.

## Run it in VS Code

1. Open this folder in VS Code.
2. Open a terminal and run:
   ```
   npm install
   npm run dev
   ```
3. Open the URL it prints (usually http://localhost:5173).

## Build for production

```
npm run build
```
This creates a `dist/` folder you can deploy anywhere that serves static files
(Netlify, Vercel, Hostinger, your own server, etc.). Preview it locally with
`npm run preview`.

## Editing content

All the site's copy (headlines, service list, process steps, stats, footer
text) lives in one place: `src/data/content.js`. Change the text there and it
updates everywhere it's used.

## Editing design

Colors, fonts and spacing are defined as CSS variables at the top of
`src/index.css` (`:root { ... }`). Change `--accent` to swap the accent color
site-wide.

## Connecting the contact form to a backend

The contact form in `src/components/ContactForm.jsx` currently simulates a
network request so the loading/success/error states work without a backend.
When you have an API, open that file and follow the `TODO` comment inside
`handleSubmit` — it shows the exact `fetch('/api/contact', ...)` call to swap
in, wrapped in the same try/catch that already drives the success and error
states.

## Project structure

```
src/
  components/   Navbar, Footer, ContactForm, Reveal (scroll animation), StatCounter
  pages/        Home.jsx, About.jsx, Contact.jsx
  data/         content.js — all site copy
  index.css     design system + all styles
```
