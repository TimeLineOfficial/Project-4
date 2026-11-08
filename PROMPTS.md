# AI Prompts & Engineering Architecture Log
## Ticket ENG-15994: Handcrafted Furniture Workshop Gallery
**Engineer:** Himesh Singh (PDIT-FTE-11462)  
**Track:** Client Project Submission — Prodesk IT  
**Submission Protocol:** FTEWSVE | PDIT-FTE-11462 | Client Project Submission  

---

### Prompt 1: Technical Requirements & Architecture Framing
* **Prompt:** "You are tasked with leading ticket ENG-15994: Core Infrastructure Overhaul for the client's Handcrafted Furniture Workshop Gallery. Floor staff is losing data and facing operational slowdowns with paper/Excel. Build a digital solution using pure semantic HTML5, vanilla CSS, and vanilla JS. Must handle 3G buffering, empty states, input validation in red, 100% Lighthouse a11y, telemetry pings, and XSS sanitization."
* **Architectural Decisions:**
  - Selected pure semantic HTML5 with zero runtime framework overhead to achieve instantaneous loading and 100% a11y score.
  - Implemented an immutable state store with reactive rendering for search, category filtering, and sorting.
  - Integrated custom HTML `<dialog>` modal with keyboard focus trapping (`Escape`, `Tab`) and accessible ARIA attributes.

### Prompt 2: Unhappy Path & Resilience Engineering
* **Prompt:** "Engineer the unhappy path states: 1) Empty state when no furniture pieces match search/filter, 2) Spotty 3G connection simulation with an orbital loading spinner, 3) Form input validation highlighting offending fields in red with specific inline error messaging."
* **Architectural Decisions:**
  - Designed `#empty-state` container with an intuitive "Reset Search & Filters" trigger.
  - Created a simulated 3G latency pipeline (`simulateNetworkLatency()`) with an animated spinner overlay and `aria-busy="true"`.
  - Built declarative form validation logic checking required fields, regex email syntax, and realistic budget ranges ($500 - $100,000), applying `.invalid` red borders and focus management.

### Prompt 3: Non-Functional Requirements (NFRs) & Security
* **Prompt:** "Ensure zero security vulnerabilities against XSS injection, emit structured console telemetry on primary actions, and enforce WCAG 2.1 AA accessibility standards."
* **Architectural Decisions:**
  - Created a robust sanitization function `sanitizeHTML()` to escape all user-entered strings before injecting into DOM.
  - Added structured telemetry logging function `logTelemetry(action, payload)` emitting `[Analytics] User interacted with Handcrafted Furniture Workshop Gallery`.
  - Applied WCAG AA color contrast standards (slate-900 `#090d16` background with slate-100 `#f9fafb` text and emerald `#10b981` interactive accents).
