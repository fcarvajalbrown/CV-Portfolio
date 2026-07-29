# 💼 CV & Portfolio — Monorepo

A lightweight monorepo that automates both:
1. **CV compilation** → from LaTeX → PDF → auto-deployed.
2. **Portfolio site** → built with Next.js → hosted on GitHub Pages.

Everything is designed to stay self-contained and updatable through GitHub Actions.

---

## ⚡ Quick Guide — Fork & Deploy

If you want to fork and customize this repo, follow these steps:

### 1. Fork the repository
Click **“Fork”** on GitHub → your account → `username/CV-Portfolio`.

### 2. Install dependencies
```bash
# 1)
cd apps/web

# 2)
pnpm install
# or
npm install
```

### 3. Build the CV
```bash
cd cv
latexmk -pdf cv.tex
```

### 4. Run portfolio local
```bash
pnpm dev
# or
npm run dev
```

### 5. Deploy via GitHub Pages
Every push to `main` will trigger:
- CV rebuild → PDF upload  
- Static export of the Next.js portfolio  
- Deployment to GitHub Pages under  
  `https://<your-username>.github.io/CV-Portfolio/`

### Note:
If you fork this, set both env vars in `.github/workflows/pages.yml` to your own values:

```yaml
NEXT_PUBLIC_BASE_PATH: /YourRepoName
NEXT_PUBLIC_SITE_URL: https://your-username.github.io/YourRepoName
```

`NEXT_PUBLIC_SITE_URL` is what the canonical URLs, the Open Graph tags and `sitemap.xml` are built from, so leaving it pointing at someone else's site will send crawlers and link previews there.

If you change the repository name, update the paths in `next.config.mjs`:
```js
export default {
  output: "export",
  basePath: "/CV-Portfolio",
  assetPrefix: "/CV-Portfolio/",
  images: { unoptimized: true },
};
```

---

## 🧠 How It Works

### 🧾 1. CV Compilation
- The workflow uses [`xu-cheng/latex-action`](https://github.com/xu-cheng/latex-action)
- It compiles your `.tex` source and commits the generated `cv.pdf` into `public/`.
- The PDF is then accessible directly from your portfolio.

### 💻 2. Portfolio Site
- Built with **Next.js 14** using static export mode (`next export`).
- Styled through a **modular CSS theme** (`globals.css`) with tunable tokens:
  - color palette, radius, shadow depth, accent glow.
- The design focuses on:
  - transparent “glass” cards
  - designer-friendly variables
  - adaptive layout for any resolution.

### 🔁 3. Automated Deployment
- CI runs LaTeX → copies PDF → builds static site → pushes `/out` to `gh-pages`.
- No manual step required.
- If only your CV changes, the PDF will update automatically without rebuilding the app.

---

## 🧰 Stack Summary

| Layer | Tech |
|-------|------|
| CV | LaTeX (`latexmk`, `xu-cheng/latex-action`) |
| Frontend | Next.js (static export mode) |
| Styling | Vanilla CSS (`globals.css` tokenized theme) |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

---

## 📜 License & Usage

This project is **free to use and adapt**.  
You can fork, modify, and build upon it — personal or commercial use are allowed.

💡 **Please do not remove or claim authorship** of the original structure or design.  
If you use or showcase it publicly, a brief credit is always appreciated:

> “Based on the CV & Portfolio Monorepo by [Noothowl](https://github.com/Noothowl)”

This helps a lot c:

---

2025 — [Noothowl](https://github.com/Noothowl)
