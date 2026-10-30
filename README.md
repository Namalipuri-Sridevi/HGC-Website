# H. Gokaldas & Co. (Dyes • Pigments • Chemicals)

Official corporate website and industrial product catalog for **H. Gokaldas & Co.**, established in 1963 in Secunderabad & Hyderabad, India.

---

## Catalog & System Highlights
- **100% Authoritative Catalog (456 Products & 20 Categories)**: Exactly matching HGC's official product sheets:
  1. Direct Dyes (24)
  2. Acid Dyes (28)
  3. Basic Dyes (15)
  4. Napthols and Base (17)
  5. VAT Dyes (40)
  6. UCP GO Dyes (38)
  7. Reactive Dyes (64)
  8. Disperse Dyes (37)
  9. Rapid & Oil Colours (16)
  10. Fluorescent Pigment (13)
  11. Metal Oxide & Inorganic Pigments (17)
  12. Organic Pigment (22)
  13. Fine H/C Pigment Emulsion (15)
  14. Solvent Dyes (16)
  15. Metal Powders (21)
  16. Glitter DG (11)
  17. Food Supra (17)
  18. Chemicals in general (29)
  19. CHT India (6)
  20. Starch Glucose (10)
- **Crisp Visual Display**:
  - Dyes & Colorants: Sharp dual-tone **FULL SHADE** & **TINT** shade cards.
  - Glitter DG, Metal Powders & Chemicals: Clean, authentic product imagery and specifications (no color swatches or masstone/tint labels).
- **Interactive Capabilities**:
  - AI Chemical & Product Finder with domain search fallback.
  - WhatsApp & Direct Calling enquiry system (+91 9100112561).
  - Google Maps Secunderabad directions integration.
  - Technical procedure guidelines and application suitability matrices.

---

## How to Push to Git & GitHub

### 1. Initialize Git in the Project Root
```bash
git init
git add .
git commit -m "feat: complete HGC website with 456 products and full shade visuals"
```

### 2. Connect to Your GitHub Repository
1. Create a new repository on [GitHub](https://github.com/new) (e.g. `h-gokaldas-website`).
2. Link your local project to GitHub and push:
```bash
git branch -M main
git remote add origin https://github.com/<your-username>/h-gokaldas-website.git
git push -u origin main
```

---

## How to Deploy to Vercel

The repository already includes `vercel.json` configured for single-page routing and static asset caching.

### Option A: Via GitHub (Recommended)
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **"Add New..."** -> **"Project"**.
3. Import your GitHub repository `h-gokaldas-website`.
4. Vercel automatically detects the Vite configuration:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. In under 1 minute, your site will be live with a free SSL certificate!

### Option B: Via Vercel CLI
```bash
npm install -g vercel
vercel
```
Follow the quick CLI prompts to deploy immediately.

---

## Migrating to Custom Hosting Services Later

When you are ready to transition from Vercel to a dedicated hosting service (such as Render, Railway, DigitalOcean, AWS, or an on-premise VPS):

1. **Standard Node.js Server**:
   ```bash
   npm install
   npm run build
   npm start
   ```
   The built-in Express server (`server.ts`) will serve both the compiled Vite frontend and the `/api` endpoints on your configured `PORT` (default: 3000).

2. **Docker Deployment**:
   You can easily run the application inside a container using Node 20 LTS:
   ```dockerfile
   FROM node:20-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

---

## Local Development

```bash
# Install dependencies
npm install

# Start local development server (runs on port 3000)
npm run dev

# Run TypeScript checks
npm run lint

# Compile production bundle
npm run build
```
