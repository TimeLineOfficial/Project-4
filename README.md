# Handcrafted Furniture Workshop Gallery
**Ticket ID**: ENG-15994  
**Epic**: Core Infrastructure Overhaul  
**Priority**: P1 (High)  
**Story Points**: 5  
**Reporter**: Amit Sharma (Senior Staff Engineer)  
**Assignee**: Floor Infrastructure & Front-End Engineering Team  

---

## 🎯 Executive Summary & Mission Context

Floor staff at the artisanal workshop previously managed furniture pieces, custom timber specifications, and bespoke commissions using manual paper systems and fragmented Excel spreadsheets. This caused severe data loss, dropped client handoffs, and substantial operational slowdowns.

This repository delivers the **P1 Digital Solution**: a high-performance, responsive **Handcrafted Furniture Workshop Gallery & Floor Inventory Portal** built with **pure semantic HTML5, vanilla CSS, and vanilla JavaScript**, adhering strictly to all Technical Requirements Document (TRD) criteria and Non-Functional Requirements (NFRs).

---

## 🏗️ Technical Requirements & Acceptance Criteria Compliance

### 1. Agile User Stories (The "Happy Path")
- **Artisanal Furniture Directory**: Displays handcrafted furniture workshop pieces (Dining Tables, Seating & Benches, Credenzas & Storage, Accent & Coffee Tables, Desks & Workspaces) complete with wood species, dimensions, artisan provenance, lead time, and pricing.
- **Real-Time Interactive Filtering & Search**: Instant full-text search across piece titles, wood species (Walnut, Oak, Ash, Cherry, Maple), and artisan names, paired with responsive category pills and an accessible custom select dropdown.
- **Workshop Commission & Custom Quote Modal**: Interactive inquiry flow allowing floor staff to select timber species, define budget allocations, and record custom joinery requests in real time.
- **Flexible Sorting**: Sort pieces by Featured, Price (Ascending/Descending), and Quickest Ready Lead Time.

---

### 2. The "Unhappy Path" (Edge Case Handling & Fault Tolerance)
- **Empty States**: If a search query or category filter returns zero results, the interface avoids showing a blank screen. Instead, it displays a user-friendly empty state (`#empty-state`) with an action button to **"Reset Search & Filters"**.
- **Bad Connectivity (3G Simulation)**: Accommodates slow or spotty floor Wi-Fi connections. Includes an animated orbital loading spinner overlay during data updates and a dedicated **"Simulate 3G Network Delay"** test button that demonstrates graceful loading feedback.
- **Invalid Input Handling**: The commission quote form strictly validates user inputs (Name $\ge$ 2 chars, valid email syntax, phone $\ge$ 7 digits, budget between $500 and $100,000). If malformed or missing, submission is prevented, offending inputs are highlighted in red (`.invalid`), inline error messages are displayed, and an alert banner is shown.

---

### 3. Non-Functional Requirements (NFRs)
- **100% Accessibility (a11y)**: Built with pure semantic HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<dialog>`/modal, `<footer>`), skip-navigation link (`#main-content`), high-contrast focus rings (`outline: 2px solid #10b981`), touch targets $\ge$ 44px, and `aria-live="polite"` screen-reader feedback.
- **Telemetry Simulation**: Emits structured console logs for all key interactions:
  ```text
  [Analytics] User interacted with Handcrafted Furniture Workshop Gallery | Action: ...
  ```
- **Security & XSS Prevention**: All user inputs are strictly sanitized via `sanitizeHTML()` prior to state ingestion or rendering. Zero usage of unsanitized HTML injections.
- **Monochromatic Corporate Design System**: Strict dark charcoal/slate theme (`#090d16`, `#111827`, `#1f2937`, `#374151`, `#f9fafb`) with subtle functional timber and emerald accents (`#10b981`, `#d97706`). Strict 8px / 16px / 32px spacing steps.
- **Zero Framework Constraint**: 100% pure vanilla HTML5/CSS3/JS. Zero React, Tailwind, or Bootstrap dependencies.

---

## 📋 Definition of Done (DoD) Checklist

- [x] Code compiles and runs cleanly with zero runtime console errors.
- [x] Passes linting standards with semantic HTML5 and vanilla JavaScript.
- [x] Matches all Happy Path and Unhappy Path criteria (empty states, 3G buffering, red validation highlights).
- [x] Tested for mobile responsiveness (< 640px) with zero horizontal overflow.
- [x] No API keys or sensitive PII hardcoded in source.
- [x] Git repository configured and pushed to `Project-4`.

---

## 🌐 Deployment & Repository Links

- **GitHub Repository**: [TimeLineOfficial/Project-4](https://github.com/TimeLineOfficial/Project-4.git)
- **Live Deployment URL**: [https://timelineofficial.github.io/Project-4/](https://timelineofficial.github.io/Project-4/)
