# Pavan Poriya — Data Analyst Portfolio

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![License](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](https://opensource.org/licenses/ISC)

> Professional portfolio of **Pavan Poriya**, a Data Analyst specializing in exploratory data analysis, interactive dashboard building, SQL querying, Python analytics, and cloud data infrastructure.

---

## 🔗 Quick Links

- 🌐 **Live Portfolio**: [pavanporiya.com](https://pavanporiya.com/)
- 📄 **Interactive Resume**: [pavanporiya.com/resume.html](https://pavanporiya.com/resume.html)

---

## 📌 About This Portfolio

This repository contains the source code for my personal developer portfolio and resume platform. Engineered with vanilla web technologies and zero external runtime frameworks, the site delivers near-instantaneous page loads, optimal SEO indexing, and strict WCAG accessibility compliance. 

Designed specifically for recruiters, hiring managers, and prospective collaborators, it provides a comprehensive overview of my technical domain expertise across data analytics, database management, and cloud architecture alongside highlighted open-source projects.

---

## ✨ Key Features

- **💎 Dark Luxury Design System**: Custom tokenized CSS architecture featuring sleek glassmorphism, responsive grid layouts, and high-contrast typography.
- **📊 Featured Projects Showcase**: Highlighted analytics and software engineering repositories with verified links to GitHub source code and live demonstrations.
- **📄 Recruiter-Ready Resume Page**: Dedicated print-optimized resume route ([resume.html](https://pavanporiya.com/resume.html)) formatted for rapid candidate evaluation and clean PDF conversion.
- **✉️ Serverless Contact Form**: Asynchronous inquiry submission powered by a Vercel Serverless Function (`/api/contact.js`) integrated with Nodemailer and Gmail SMTP authentication.
- **⚡ Zero-Framework High Performance**: Standardized vanilla HTML5, CSS3, and ES6+ JavaScript execution eliminating client-side bundle overhead.
- **🔍 Enterprise SEO & Accessibility**: Built-in Schema.org JSON-LD structured data, Open Graph meta previews, Twitter Cards, dynamic sitemap, and accessible semantic HTML landmarks.

---

## 🛠️ Technology Stack

| Technology | Purpose & Implementation |
| :--- | :--- |
| **HTML5** | Semantic web page architecture, Schema.org JSON-LD metadata, and accessibility landmarks. |
| **CSS3** | Modular CSS design system with custom properties (`assets/css/variables.css`), Flexbox/Grid layouts, and responsive breakpoints. |
| **JavaScript (ES6+)** | Modular script architecture (`js/modules/`, `js/core/`, `js/utils/`, `js/config/`) handling asynchronous form validation and UI state. |
| **Vercel** | Edge network static site deployment and serverless API execution. |
| **Gmail SMTP Contact Form** | Serverless backend endpoint (`/api/contact.js`) built with `nodemailer` for secure message handling using environment variables. |

---

## 📁 Project Structure

```
portfolio/
├── api/
│   └── contact.js          # Vercel Serverless Function (Nodemailer SMTP handler)
├── assets/
│   ├── css/                # Modular stylesheets (variables, layout, components, hero, etc.)
│   ├── documents/          # PDF assets and resume downloads
│   ├── fonts/              # Typography font assets
│   ├── icons/              # Favicons & application manifest icons
│   └── images/             # Open Graph metadata and UI images
├── js/
│   ├── config/             # Global configuration constants
│   ├── core/               # Primary application initializer
│   ├── modules/            # UI interactions and contact form logic
│   ├── utils/              # Reusable JavaScript helper utilities
│   └── app.js              # Application entry point
├── profilePic/             # Portfolio avatar and profile media assets
├── styles/                 # ITCSS structured design system modules
├── 404.html                # Custom 404 error page
├── index.html              # Main single-page portfolio application
├── package.json            # Node.js dependencies & project configuration
├── resume.html             # Recruiter-focused interactive resume page
├── robots.txt              # Search engine indexing directives
├── site.webmanifest       # Web application manifest
└── sitemap.xml             # Search engine XML sitemap
```

---

## 🖼️ Screenshots

### Desktop View
![Desktop Preview Placeholder](https://via.placeholder.com/1200x675/0f172a/ffffff?text=Desktop+Portfolio+Preview)
*Desktop overview showcasing the hero section, interactive project cards, and dark luxury aesthetic.*

### Mobile View
![Mobile Preview Placeholder](https://via.placeholder.com/375x812/0f172a/ffffff?text=Mobile+Portfolio+Preview)
*Responsive mobile layout optimized for touch navigation and seamless reading.*

---

## 💻 Local Development

Follow these steps to run the portfolio locally on your machine:

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **Git**

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pavanporiya/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory to test contact form submissions locally:
   ```env
   EMAIL_USER=your-gmail-address@gmail.com
   EMAIL_PASS=your-gmail-app-password
   ```

4. **Run the local development server**:

   *Option A: Using Vercel CLI (Recommended for testing serverless API routes)*
   ```bash
   npx vercel dev
   ```

   *Option B: Using a lightweight HTTP server (Static assets only)*
   ```bash
   npx serve .
   # OR
   python3 -m http.server 8000
   ```

5. Open your browser and navigate to `http://localhost:3000` (or `http://localhost:8000`).

---

## 🚀 Deployment (Vercel)

This portfolio is configured for deployment on **Vercel**.

1. Push your changes to your GitHub repository:
   ```bash
   git add README.md
   git commit -m "docs: add production-quality README"
   git push origin main
   ```
2. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import the `portfolio` repository.
4. Configure the required **Environment Variables** in the Vercel Project Settings:
   - `EMAIL_USER`: Your Gmail address used to transmit contact form entries.
   - `EMAIL_PASS`: Your 16-character Gmail App Password (generated via Google Security settings).
5. Click **Deploy**. Vercel will automatically host the static application and bind `/api/contact.js` as an active serverless endpoint.

---

## 📬 Contact

Feel free to reach out for career opportunities, consulting, or technical inquiries:

- **Email**: [pavanporiya@gmail.com](mailto:pavanporiya@gmail.com)
- **GitHub**: [github.com/pavanporiya](https://github.com/pavanporiya)
- **LinkedIn**: [linkedin.com/in/pavan-poriya-b01704424](https://www.linkedin.com/in/pavan-poriya-b01704424/)

---

## 🔮 Future Improvements

- [ ] **Interactive Dashboard Embeds**: Integration of dynamic Power BI and Tableau iframe preview widgets directly into project detail views.
- [ ] **Automated API Testing**: Comprehensive unit and integration testing suite for `/api/contact.js` using Jest and Supertest.
- [ ] **Theme Preference Toggle**: System-matched light and dark mode toggle with persistent local storage state.
- [ ] **Technical Blog Section**: Dynamic data analytics case studies and article publishing system.

---

## 📜 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
