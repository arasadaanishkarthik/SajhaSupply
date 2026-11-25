# SajhaSupply - Live Deployment Links & Status

## 🌐 Official Live URL
- **Production URL:** [https://arasadaanishkarthik.github.io/SajhaSupply/](https://arasadaanishkarthik.github.io/SajhaSupply/)
- **Repository URL:** [https://github.com/arasadaanishkarthik/SajhaSupply](https://github.com/arasadaanishkarthik/SajhaSupply)
- **Deployment Workflow:** [https://github.com/arasadaanishkarthik/SajhaSupply/actions](https://github.com/arasadaanishkarthik/SajhaSupply/actions)

---

## 🔍 Why the `main.jsx 404` Error Happened

In a Vite + React project:
1. The development file `index.html` at the repository root points to `<script type="module" src="/src/main.jsx"></script>`. Browsers cannot run raw unbundled `.jsx` directly.
2. In production, `npm run build` compiles all React/JSX code into bundled JavaScript in the `dist/` directory (`dist/assets/index-*.js`).
3. On GitHub Pages, if **Settings → Pages → Source** is set to **"Deploy from a branch" (main / root)**, GitHub Pages serves the raw root `index.html`, causing the browser to request `/src/main.jsx`, resulting in a **404 Not Found** and a blank white screen.

---

## 🚀 How to Fix in 10 Seconds (One-Time Setup on GitHub)

1. Open your repository settings:
   👉 **[https://github.com/arasadaanishkarthik/SajhaSupply/settings/pages](https://github.com/arasadaanishkarthik/SajhaSupply/settings/pages)**
2. Under **"Build and deployment"** → **"Source"**:
   - Change from **"Deploy from a branch"** to **"GitHub Actions"**.
3. That's it! GitHub will automatically run the existing `.github/workflows/deploy.yml` workflow, build `dist/`, and publish your live app with zero errors.

---

## 💻 Pushing the Latest Code

To push your latest commits from your terminal:
```bash
git push origin main
```
Or use the **Source Control (Ctrl+Shift+G)** panel in VS Code / Antigravity to sync changes.
