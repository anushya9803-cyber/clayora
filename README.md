# Clayora — Hand Made Products Web App

An artisanal, human-crafted responsive web application for handmade ceramics, wheel-thrown pottery, and raw terracotta home objects.

---

## 🚀 How to Host on GitHub Pages

This project is pre-configured with **relative asset paths (`base: './'`)** and a ready-to-go **GitHub Actions deployment workflow** (`.github/workflows/deploy.yml`).

### Step 1: Create a Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Enter a repository name (for example: `clayora` or `clayora-handmade`).
3. Set the repository to **Public** and click **Create repository**.

### Step 2: Push this Code to Your GitHub Repository
Run these commands in your project directory:
```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages in Repository Settings
1. On your GitHub repository page, click **Settings** (top right tab).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment > Source**, choose **GitHub Actions**.
4. GitHub Actions will automatically run the build and publish your site at:
   ```
   https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME/
   ```

---

## 🛠 Features

- **Human-Made Artisanal Aesthetic:** Playfair Display editorial typography, warm natural terracotta/linen palette, genuine studio photography, and zero AI cliches.
- **Dual User Logins on First Page:**
  - **Admin Login:** Protected with password `anu@9803` to manage live kiln batch inventory and track customer orders.
  - **Customer Login:** Collector authentication with order details.
- **Multi-Device Responsive Layout:** Dedicated mobile bottom bar (≤15% sticky cap), tactile 44px+ touch targets, and 1440px desktop grid.
- **Interactive Device Simulator:** Test Mobile 390px, Tablet 768px, and Desktop 1440px directly in your browser.
- **Shopping Bag & Checkout:** Itemized cart, quantity steppers, Cash on Delivery (COD) / Card options, and instant order confirmation.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
