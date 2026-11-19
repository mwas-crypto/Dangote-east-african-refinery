# Dangote East African Refinery — Web Portal

An educational and informational multi-page web platform exploring the development, technical specifications, socioeconomic benefits, and environmental considerations of the proposed **Dangote East African Refinery** located in Mokowe, Lamu County, Kenya.

---

## Project Structure

```text
my-first-website/
├── index.html          # Main landing page & executive summary
├── about.html          # Background on Dangote Group, Aliko Dangote & Lamu context
├── project.html        # Technical specifications, refining units & gallery
├── benefits.html       # Macroeconomic, employment, and regional energy benefits
├── challenges.html     # Environmental impact, ESG safeguards & financing
├── contact.html        # Research inquiries, FAQ & interactive feedback form
├── css/
│   └── style.css       # Unified responsive CSS design system
├── js/
│   └── main.js         # Automated interactive features & form handling
└── README.md           # Project documentation and setup guide
```

---

## Features

- **Multi-Page Layout**: Separate HTML files with consistent navigation headers, branding, and footers.
- **Dedicated Stylesheet (`css/style.css`)**:
  - Responsive design optimized for mobile, tablet, and desktop screens.
  - CSS custom properties (variables) for consistent color themes and typography.
  - Flexbox and CSS Grid card layouts.
- **Automated JavaScript Features (`js/main.js`)**:
  - **Dynamic Year**: Automatically updates copyright year across all pages.
  - **Mobile Navigation Drawer**: Smooth mobile menu toggle with auto-closing on outside clicks.
  - **Active Link Detection**: Automatically highlights current page in the navigation bar.
  - **Animated Stat Counters**: Animates numerical metrics ($16B, 700,000 bpd, 2030) as they scroll into view.
  - **Interactive Accordions**: Accessible collapsible items for FAQs and ESG strategies.
  - **Image Lightbox**: Click any gallery image to view an enlarged modal preview.
  - **Contact Form Validation**: Validates user inputs with simulated asynchronous feedback alerts.
  - **Back to Top**: Floating action button appearing automatically on scroll.

---

## How to Run This Project

This project uses standard **HTML5**, **CSS3**, and **vanilla ES6 JavaScript**. There are **no build tools, compilers, or heavy dependencies required**.

You can run it using any of the following methods:

### Method 1: Directly in your Browser (Quickest)

1. Open your file explorer and navigate to the project directory:
   ```bash
   cd /my-first-website
   ```
2. Double-click **`index.html`** or right-click and choose **Open With > Google Chrome / Firefox / Edge / Safari**.

---

### Method 2: Using Python's Built-In HTTP Server (Recommended)

Running a local HTTP server ensures smooth module loading and proper path resolution:

1. Open your terminal in the project directory:
   ```bash
   cd /my-first-website
   ```

2. Start the local server:
   ```bash
   # For Python 3
   python3 -m http.server 8000
   ```

3. Open your browser and visit:
   ```
   http://localhost:8000
   ```

*(Press `Ctrl + C` in the terminal to stop the server).*

---

### Method 3: Using Node.js (`npx serve`)

If you have Node.js installed:

```bash
# Run a quick local server without installing anything globally
npx serve .
```

Then visit the URL provided in the terminal (usually `http://localhost:3000`).

---

### Method 4: Using VS Code Live Server Extension

If using Visual Studio Code:
1. Open the project folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and click **"Open with Live Server"**.
4. The website will launch automatically with live-reloading on save.

---

## Browser Support

- Google Chrome (latest)
- Mozilla Firefox (latest)
- Microsoft Edge (latest)
- Apple Safari (latest)
- Mobile Browsers (iOS Safari, Android Chrome)

---

## License & Attribution

This website is developed as an educational research portal documenting industrial energy infrastructure in East Africa.
