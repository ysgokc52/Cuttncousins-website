# Cutt n Cousins Website — Updated Files

**Slogan:** *Your Lawn, Our Priority.*

## What's included

| File | Purpose |
|------|---------|
| `index.html` | Homepage |
| `services.html` | Services detail page |
| `quote.html` | Free quote request form |
| `contact.html` | Contact form |
| `portal.html` | Customer portal login |
| `styles.css` | Shared stylesheet (all pages) |
| `script.js` | Mobile menu + form handling |
| `logo.png` | Company logo |

## How to deploy to your GitHub repo

### Easiest way (GitHub web interface)

1. Go to https://github.com/ysgokc52/Cuttncousins-website
2. For each file in this folder, click **Add file → Upload files** at the repo root
3. Drag the files in and commit. Choose "Replace existing files" when prompted for `index.html`, `logo.png`, etc.
4. **Keep** your existing `CNAME` file — that controls your custom domain
5. Once committed, GitHub Pages will rebuild and the new site will be live in a minute or two

### Or via Git command line

```bash
git clone https://github.com/ysgokc52/Cuttncousins-website.git
cd Cuttncousins-website
# Copy all files from this folder into the repo, overwriting old ones
git add .
git commit -m "Redesign site with new modern look"
git push
```

## Form submissions

The forms currently show a "thanks" message but don't actually email you anything. To make them work, plug in a free service:

- **Formspree** (https://formspree.io) — easiest, just change form action
- **Netlify Forms** — free if you host on Netlify
- **Web3Forms** (https://web3forms.com) — free, no signup needed

Edit `script.js` and the form `action` attributes in each HTML file to wire them up. Happy to help with this when you're ready.

## What changed from the old site

- Modern, professional design with brand colors (orange, black, white, silver)
- Editorial typography (Fraunces serif + Inter sans-serif)
- Mobile-friendly layouts with a working hamburger menu
- Detailed services page with one-time cuts mentioned prominently
- Better quote form with service checkboxes
- Clear contact info and hours on contact page
- Polished portal login screen
- Consistent slogan placement: *Your Lawn, Our Priority*
- Fertilization references removed (you don't offer it)
