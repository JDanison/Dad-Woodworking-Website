# WoodCraft Shop - Setup Guide

Welcome! This guide will help you get your woodworking shop website live on GitHub Pages with Stripe payments.

## 🎯 Quick Overview

Your website is a **static site** (HTML/CSS/JS) that:
- ✅ Can be hosted **FREE** on GitHub Pages
- ✅ Uses Stripe Payment Links for secure transactions
- ✅ Works with Live Server for local development
- ✅ Features a beautiful wood-themed design

---

## 📦 What You Have

- **index.html** - Your main website page
- **styles.css** - Beautiful wood-themed styling
- **script.js** - Interactive features and animations
- **.gitignore** - Tells Git what files to ignore

---

## 🚀 Part 1: Local Development (Test on Your Computer)

### Option A: Using Live Server (Recommended)

1. **Install Live Server Extension**
   - Open VS Code
   - Click Extensions icon (or press `Ctrl+Shift+X`)
   - Search for "Live Server" by Ritwick Dey
   - Click Install

2. **Launch Your Site**
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Your browser will open automatically
   - **Every time you save a file, the page auto-refreshes!**

### Option B: Using Python HTTP Server

If you have Python installed:
```powershell
cd c:\Personal\MiniProjects\Dad-Woodworking-Website
python -m http.server 8000
```
Then open: `http://localhost:8000`

---

## 💳 Part 2: Setting Up Stripe Payments

### Step 1: Create a Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Click "Sign up" and create your account
3. Complete the business information

### Step 2: Create Products

For each item you want to sell:

1. Go to [Products](https://dashboard.stripe.com/products) in your Stripe dashboard
2. Click **"Add product"**
3. Fill in:
   - **Name**: e.g., "Custom Cutting Board"
   - **Description**: Brief description of the item
   - **Price**: e.g., $45.00
   - **Image**: Upload a photo of your product (optional but recommended)
4. Click **"Save product"**

### Step 3: Generate Payment Links

For each product:

1. On the product page, click **"Create payment link"**
2. Configure options:
   - ✅ Quantity: Set to 1 (or allow customers to choose)
   - ✅ After payment: Choose where to redirect customers
3. Click **"Create link"**
4. **Copy the payment link URL** (looks like: `https://buy.stripe.com/xxxxxxxxxxxxx`)

### Step 4: Add Links to Your Website

Open `index.html` and find your product's button. Update the `data-stripe-link` attribute:

**Before:**
```html
<button class="btn btn-cart" data-product="Cutting Board" data-price="45.00" data-stripe-link="">
```

**After:**
```html
<button class="btn btn-cart" data-product="Cutting Board" data-price="45.00" data-stripe-link="https://buy.stripe.com/xxxxxxxxxxxxx">
```

Repeat for all products!

### Step 5: Test Your Payments

1. Click a "Buy Now" button on your site
2. You'll be redirected to Stripe's checkout page
3. Use a [test card](https://stripe.com/docs/testing#cards):
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits

---

## 🌍 Part 3: Deploy to GitHub Pages (Make It Live!)

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in (or create account)
2. Click the **"+"** icon → **"New repository"**
3. Fill in:
   - **Repository name**: `dad-woodworking-website` (or your choice)
   - **Description**: "Dad's woodworking and 3D printing shop"
   - **Public** (required for free GitHub Pages)
4. Click **"Create repository"**

### Step 2: Push Your Code to GitHub

Open PowerShell in your project folder and run:

```powershell
# Navigate to your project
cd c:\Personal\MiniProjects\Dad-Woodworking-Website

# Initialize Git (if not already done)
git init

# Add all files
git add .

# Commit your files
git commit -m "Initial commit - WoodCraft Shop"

# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/dad-woodworking-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under "Source":
   - Select **"Deploy from a branch"**
   - Choose **"main"** branch
   - Select **"/ (root)"** folder
5. Click **"Save"**

### Step 4: Access Your Live Site

- Your site will be live at: `https://YOUR_USERNAME.github.io/dad-woodworking-website/`
- It may take 1-2 minutes to deploy
- GitHub will show you the URL at the top of the Pages settings

---

## 🎨 Part 4: Customization Guide

### Update Contact Information

In `index.html`, find the contact section and update:

```html
<a href="mailto:contact@woodcraftshop.com">your-email@example.com</a>
<a href="tel:+15551234567">Your Phone Number</a>
```

### Replace Product Images

Replace the Unsplash placeholder URLs with your own images:

1. **Option A - Using URLs:**
   - Upload images to a hosting service (Imgur, Cloudinary, etc.)
   - Replace the image `src` with your URL

2. **Option B - Using Local Images:**
   - Create an `images` folder in your project
   - Add your photos there
   - Update the `src` to: `src="images/cutting-board.jpg"`

### Update Product Information

In `index.html`, update for each product:
- Product title (`<h3>`)
- Price (`<p class="product-price">`)
- Description
- Stripe payment link

### Change Colors

In `styles.css`, modify the color variables at the top:

```css
:root {
    --wood-brown: #6B4423;      /* Main brand color */
    --wood-light: #8B6F47;       /* Hover states */
    --wood-dark: #4A2C1A;        /* Dark accents */
    --accent-amber: #B8860B;     /* Accent color */
}
```

---

## 🔧 Part 5: Maintenance & Updates

### Updating Your Live Site

After making changes locally:

```powershell
git add .
git commit -m "Updated product prices"
git push
```

GitHub Pages will automatically redeploy (takes 1-2 minutes).

### Adding New Products

1. Copy an existing product card in `index.html`
2. Update all the details (title, price, description, image)
3. Create the product in Stripe
4. Add the Stripe Payment Link
5. Push to GitHub

---

## 📊 Part 6: Managing Your Business

### Stripe Dashboard

Access at: [dashboard.stripe.com](https://dashboard.stripe.com)

**You can:**
- ✅ View all transactions
- ✅ See customer information
- ✅ Issue refunds
- ✅ Export financial reports
- ✅ Set up email receipts
- ✅ Track inventory (optional)

### Email Notifications

Stripe automatically sends:
- Customer receipts after purchase
- Payment notifications to you
- Weekly/monthly summaries

Configure in: Stripe Dashboard → Settings → Emails

### Payouts

- Stripe deposits funds to your bank account automatically
- Default: 2-day rolling basis
- Configure in: Stripe Dashboard → Balance → Payouts

---

## 🎯 Custom Domain (Optional)

Want `www.yourname.com` instead of GitHub's URL?

1. **Buy a domain** from Namecheap, Google Domains, etc. (~$10-15/year)
2. In your repository, create a file named `CNAME` with your domain:
   ```
   www.yourname.com
   ```
3. In your domain registrar's DNS settings, add:
   - Type: `CNAME`
   - Host: `www`
   - Value: `YOUR_USERNAME.github.io`
4. Wait 24 hours for DNS propagation

Full guide: [GitHub Custom Domain Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

## 🆘 Troubleshooting

### Site Not Showing Up?

- Check that GitHub Pages is enabled in repository settings
- Verify the repository is public
- Wait 2-3 minutes after pushing changes
- Check for typos in file names (must be `index.html`)

### Stripe Link Not Working?

- Verify you copied the full payment link URL
- Check that the link is in "Live mode" (not test mode)
- Ensure the product is active in Stripe dashboard

### Images Not Loading?

- Check image URLs are correct
- If using local images, verify the path is correct
- Make sure images are committed to GitHub

### CSS Not Applying?

- Clear your browser cache (Ctrl+Shift+R)
- Check that `styles.css` is in the same folder as `index.html`
- Verify there are no syntax errors in CSS

---

## 📚 Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [GitHub Pages Guide](https://pages.github.com/)
- [Markdown Guide](https://www.markdownguide.org/) (for README files)
- [Web Development Tutorial](https://www.w3schools.com/)

---

## 🎉 You're All Set!

Your dad's woodworking shop is now online and ready to accept payments! 

**Quick Checklist:**
- [ ] Tested site locally with Live Server
- [ ] Created Stripe account and products
- [ ] Added Stripe Payment Links to buttons
- [ ] Pushed code to GitHub
- [ ] Enabled GitHub Pages
- [ ] Updated contact information
- [ ] Replaced placeholder images
- [ ] Tested a purchase with Stripe test card
- [ ] Shared the live URL with customers!

Good luck with the shop! 🪵✨
