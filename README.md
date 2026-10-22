# Evantras Consulting Services Pvt Ltd — Corporate & Recruitment Website

A modern, high-performance web platform built for **Evantras Consulting Services Pvt Ltd**, headquartered in Anna Nagar, Chennai.

---

## 🌟 Key Highlights

1. **Dual-Engine Architecture:**
   - **Corporate Credibility:** Showcases IT & Business Strategy Consulting practice areas, company values, mission, vision, and corporate verification.
   - **Recruitment & Job Redirection Portal:** Dedicated `/careers` landing page specifically designed for candidate redirection from **Naukri, Indeed, LinkedIn, and Foundit**, complete with resume upload and direct HR routing.

2. **100% Content Compliance:**
   - **`About US.docx`** ➔ [`/about`](http://localhost:3001/about)
   - **`Contact Us.docx`** ➔ [`/contact`](http://localhost:3001/contact) (Interactive Google Maps pin + SDV Arcade address + hr@evantras.com)
   - **`Privacy Policy.docx`** ➔ [`/privacy-policy`](http://localhost:3001/privacy-policy)
   - **`Terms of Service.docx`** ➔ [`/terms-of-service`](http://localhost:3001/terms-of-service)

3. **Recruitment Desk Integration:**
   - Direct candidate applications via `/api/apply` routed to `hr@evantras.com`.
   - Contact inquiries via `/api/contact`.

---

## 🚀 Quick Start Guide

### 1. Run in Development Mode:
```powershell
npm run dev
```

### 2. Build and Run in Production:
```powershell
npm run build
npm run start -- -p 3001
```

The application is accessible at:
- **Local:** `http://localhost:3001`
- **Network:** `http://<your-ip>:3001`

---

## 📁 Project Structure

```
eVantras/
├── src/
│   ├── app/
│   │   ├── page.tsx               # Home Page
│   │   ├── about/page.tsx         # About Us Page
│   │   ├── services/page.tsx      # Consulting Services Practice Areas
│   │   ├── careers/page.tsx       # Careers & Application Portal
│   │   ├── contact/page.tsx       # Contact Us + Google Map Embed
│   │   ├── portal-admin/page.tsx  # Secret Admin Portal for Job Management
│   │   ├── privacy-policy/page.tsx # Privacy Policy
│   │   ├── terms-of-service/page.tsx # Terms of Service
│   │   └── api/
│   │       ├── admin/             # Admin Auth, Jobs & Applications APIs
│   │       ├── apply/route.ts     # Candidate Application Handler
│   │       └── contact/route.ts   # Contact Inquiry Handler
│   ├── components/
│   │   ├── Navbar.tsx             # Corporate Header with Official Emblem Logo
│   │   └── Footer.tsx             # Corporate Footer with Office Info & Links
│   └── globals.css
├── public/
│   ├── logo.svg                   # Vector Brand Emblem
│   ├── logo.png                   # Brand Logo Asset
│   └── robots.txt                 # SEO & Crawler Rules
├── package.json
└── tsconfig.json
```

---

## 💼 Naukri / Indeed Employer Setup Guide

1. **Company Domain:** `evantras.com`
2. **Official Email:** `hr@evantras.com`
3. **Office Location:** `4th Floor, SDV Arcade, No. AB5, 2nd Avenue, AB Block, Shanthi Colony, Anna Nagar, Chennai - 600040`
4. **Job Posting Redirection URL:** `https://evantras.com/careers` (or specific anchor `#apply-form`)
5. **Legal URLs for Portal Verification:**
   - Privacy Policy: `https://evantras.com/privacy-policy`
   - Terms: `https://evantras.com/terms-of-service`
