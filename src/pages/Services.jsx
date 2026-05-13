/**
 * ServicesSection — Brutalist Editorial Design (Perfect Sync with Tailwind/DaisyUI)
 *
 * Add to index.html <head>:
 * <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;700;800&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet" />
 */

import { useState, useEffect } from "react";

const SERVICES = [
  {
    num: "01", title: "Web Design", sub: "UI / UX",
    desc: "Pixel-perfect, fast-loading websites that convert visitors into clients. Every layout is custom — no templates, no compromise.",
    tags: ["Figma", "Responsive", "Micro-animations"], price: "From $400",
  },
  {
    num: "02", title: "Frontend Dev", sub: "React / Next.js",
    desc: "Clean, maintainable code built with modern React. Blazing-fast performance, SEO-ready, and built to scale with your business.",
    tags: ["React", "Next.js", "Tailwind"], price: "From $600",
  },
  {
    num: "03", title: "Full-Stack Apps", sub: "End-to-End",
    desc: "From database to deployment. I handle the entire stack — authentication, APIs, dashboards, and everything in between.",
    tags: ["Node.js", "MongoDB", "REST API"], price: "From $1200",
  },
  {
    num: "04", title: "Brand Identity", sub: "Logo & Visual",
    desc: "A brand that people remember. Logo, color palette, typography system, and brand guidelines delivered as a complete package.",
    tags: ["Logo", "Style Guide", "Print-ready"], price: "From $300",
  },
  {
    num: "05", title: "SEO & Speed", sub: "Performance",
    desc: "Get found on Google. I audit your site, fix Core Web Vitals, compress assets, and implement technical SEO that actually works.",
    tags: ["Core Web Vitals", "Lighthouse", "Schema"], price: "From $250",
  },
  {
    num: "06", title: "Maintenance", sub: "Ongoing Support",
    desc: "Monthly retainer for updates, security patches, content changes, and priority support. Stay fast, stay secure, stay worry-free.",
    tags: ["Monthly", "Priority", "Backups"], price: "From $150/mo",
  },
];

const TICKER = [
  "Web Design", "—", "React Development", "—",
  "Full-Stack Apps", "—", "Brand Identity", "—",
  "SEO & Performance", "—", "Ongoing Maintenance", "—",
];

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;700;800&family=DM+Mono:wght@300;400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* 1. Theme Variables - Light Mode Default */
.sv-root {
  --bg: #f2ede4;
  --text: #111111;
  --text-muted: #9e9488;
  --accent: #e8380d;
  --faint: rgba(17, 17, 17, 0.08);

  /* Elements that invert on hover */
  --invert-bg: #111111;
  --invert-text: #f2ede4;
  --invert-text-rgb: 242, 237, 228;

  --font-mono: 'DM Mono', monospace;
  --font-display: 'Bebas Neue', sans-serif;
  --font-body: 'Syne', sans-serif;

  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  transition: background 0.3s ease, color 0.3s ease;
}

/* 2. React Controlled Dark Mode Class */
.sv-root.sv-dark {
  --bg: #111111;
  --text: #f2ede4;
  --text-muted: #888888;
  --faint: rgba(242, 237, 228, 0.12);

  --invert-bg: #f2ede4;
  --invert-text: #111111;
  --invert-text-rgb: 17, 17, 17;
}

/* Layout & Divider */
.sv-divider { background: var(--faint); transition: background 0.3s ease; }

/* Ticker */
.sv-ticker { background: var(--invert-bg); color: var(--invert-text); font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.12em; padding: 9px 0; overflow: hidden; white-space: nowrap; border-bottom: 2px solid var(--accent); transition: background 0.3s ease, color 0.3s ease; }
.sv-ticker-track { display: inline-flex; animation: sv-slide 28s linear infinite; }
@keyframes sv-slide { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.sv-tick-item { padding: 0 2.5rem; }

/* Hero Section */
.sv-hero { display: grid; grid-template-columns: 1fr 1px 1fr; border-bottom: 1px solid var(--faint); transition: border-color 0.3s ease; }
.sv-hero-left { padding: 4rem 3rem; border-right: 1px solid var(--faint); transition: border-color 0.3s ease; }
.sv-hero-right { padding: 4rem 3rem; display: flex; flex-direction: column; justify-content: flex-end; }
.sv-eyebrow { display: flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 1.8rem; transition: color 0.3s ease; }
.sv-eyebrow-line { width: 30px; height: 2px; background: var(--accent); flex-shrink: 0; }
.sv-heading { font-family: var(--font-display); font-size: clamp(4.5rem, 10vw, 8rem); line-height: 0.86; letter-spacing: 0.015em; color: var(--text); transition: color 0.3s ease; }
.sv-heading-red { color: var(--accent); }
.sv-hero-tagline { font-size: 14px; color: var(--text-muted); line-height: 1.8; max-width: 320px; margin-bottom: 2.5rem; transition: color 0.3s ease; }
.sv-hero-stats { display: flex; gap: 3rem; }
.sv-stat-num { font-family: var(--font-display); font-size: 2.8rem; color: var(--text); line-height: 1; transition: color 0.3s ease; }
.sv-stat-num span { color: var(--accent); }
.sv-stat-lbl { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-muted); margin-top: 4px; transition: color 0.3s ease; }

/* Grid & Cards */
.sv-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
.sv-card { padding: 2.5rem 2.8rem; border-right: 1px solid var(--faint); border-bottom: 1px solid var(--faint); cursor: default; transition: background 0.2s ease, border-color 0.3s ease; position: relative; overflow: hidden; }
.sv-card:nth-child(3n) { border-right: none; }

.sv-card:hover { background: var(--invert-bg); }

.sv-card-num { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; color: var(--text-muted); margin-bottom: 2rem; transition: color 0.2s; }
.sv-card:hover .sv-card-num { color: rgba(var(--invert-text-rgb), 0.4); }

.sv-card-title { font-family: var(--font-display); font-size: 2.4rem; letter-spacing: 0.02em; line-height: 0.9; color: var(--text); margin-bottom: 0.4rem; transition: color 0.2s; }
.sv-card:hover .sv-card-title { color: var(--invert-text); }

.sv-card-sub { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent); margin-bottom: 1.4rem; }

.sv-card-desc { font-size: 13px; font-weight: 400; line-height: 1.75; color: var(--text-muted); margin-bottom: 1.8rem; transition: color 0.2s; }
.sv-card:hover .sv-card-desc { color: rgba(var(--invert-text-rgb), 0.7); }

.sv-card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1.8rem; }
.sv-tag { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.12em; padding: 4px 10px; border: 1px solid var(--faint); color: var(--text-muted); text-transform: uppercase; transition: border-color 0.2s, color 0.2s; }
.sv-card:hover .sv-tag { border-color: rgba(var(--invert-text-rgb), 0.2); color: rgba(var(--invert-text-rgb), 0.6); }

.sv-card-price { font-family: var(--font-display); font-size: 1.4rem; letter-spacing: 0.05em; color: var(--accent); display: flex; align-items: center; justify-content: space-between; }
.sv-card-arrow { font-size: 20px; color: var(--accent); opacity: 0; transform: translateX(-8px); transition: opacity 0.2s, transform 0.2s; }
.sv-card:hover .sv-card-arrow { opacity: 1; transform: translateX(0); }

/* CTA Section */
.sv-cta { display: grid; grid-template-columns: 1fr 1px 1fr; border-top: 1px solid var(--faint); transition: border-color 0.3s ease; }
.sv-cta-left { padding: 3.5rem 3rem; border-right: 1px solid var(--faint); transition: border-color 0.3s ease; }
.sv-cta-heading { font-family: var(--font-display); font-size: clamp(2.5rem, 6vw, 4.5rem); line-height: 0.9; color: var(--text); margin-bottom: 1.2rem; transition: color 0.3s ease; }
.sv-cta-heading span { color: var(--accent); }
.sv-cta-sub { font-size: 13px; color: var(--text-muted); line-height: 1.75; max-width: 300px; transition: color 0.3s ease; }
.sv-cta-right { padding: 3.5rem 3rem; display: flex; flex-direction: column; justify-content: center; gap: 1.2rem; }

.sv-cta-btn { font-family: var(--font-display); font-size: 1.2rem; letter-spacing: 0.08em; padding: 16px 2rem; border: none; cursor: pointer; transition: background 0.15s, color 0.15s; text-align: left; }
.sv-cta-btn.primary { background: var(--text); color: var(--bg); }
.sv-cta-btn.primary:hover { background: var(--accent); color: #fff; }
.sv-cta-btn.secondary { background: transparent; color: var(--text); border: 1px solid var(--faint); }
.sv-cta-btn.secondary:hover { border-color: var(--text); }

.sv-stamp { position: fixed; bottom: 2.5rem; right: 2.8rem; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.18em; color: var(--text-muted); text-transform: uppercase; writing-mode: vertical-rl; opacity: 0.3; pointer-events: none; transition: color 0.3s ease; }

/* Responsive */
@media (max-width: 900px) { .sv-grid { grid-template-columns: repeat(2, 1fr); } .sv-card:nth-child(3n) { border-right: 1px solid var(--faint); } .sv-card:nth-child(2n) { border-right: none; } }
@media (max-width: 640px) { .sv-hero { grid-template-columns: 1fr; } .sv-hero-left { border-right: none; padding: 4.5rem 1.5rem 2.5rem; } .sv-hero-right { padding: 2rem 1.5rem; border-top: 1px solid var(--faint); } .sv-grid { grid-template-columns: 1fr; } .sv-card { border-right: none !important; } .sv-cta { grid-template-columns: 1fr; } .sv-cta-left { border-right: none; padding: 2.5rem 1.5rem; } .sv-cta-right { padding: 2rem 1.5rem; border-top: 1px solid var(--faint); } .sv-stamp { display: none; } .sv-hero, .sv-hero-left, .sv-hero-right, .sv-cta, .sv-cta-left, .sv-cta-right { border-color: var(--faint); } }
`;

export default function ServicesSection() {
  const [active, setActive] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const tickItems = [...TICKER, ...TICKER];

  // 🔴 Magic happens here: Automatically listen to Tailwind/DaisyUI Theme Changes
  useEffect(() => {
    const checkTheme = () => {
      const html = document.documentElement;
      const body = document.body;
      
      const hasDarkClass = html.classList.contains("dark") || body.classList.contains("dark");
      const themeAttr = html.getAttribute("data-theme");
      const hasDarkAttr = themeAttr === "dark" || themeAttr === "black" || themeAttr === "dim" || themeAttr === "dracula";
      
      setIsDark(hasDarkClass || hasDarkAttr);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{STYLES}</style>
      
      <div className={`sv-root ${isDark ? "sv-dark" : ""}`}>
        
        {/* Ticker */}
        <div className="sv-ticker">
          <div className="sv-ticker-track">
            {tickItems.map((item, i) => (
              <span key={i} className="sv-tick-item">{item}</span>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div className="sv-hero">
          <div className="sv-hero-left">
            <p className="sv-eyebrow">
              <span className="sv-eyebrow-line" />
              What I Do
            </p>
            <h1 className="sv-heading">
              My<br />
              <span className="sv-heading-red">Services</span><br />
              &amp; Skills.
            </h1>
          </div>
          <div className="sv-divider" />
          <div className="sv-hero-right">
            <p className="sv-hero-tagline">
              Six focused services, zero fluff. Every project gets my full attention
              from kickoff to launch — and beyond. Hover a card to explore.
            </p>
            <div className="sv-hero-stats">
              <div>
                <div className="sv-stat-num">5<span>+</span></div> {/* 🔴 ৫টি প্রজেক্ট করা হলো */}
                <div className="sv-stat-lbl">Projects done</div>
              </div>
              <div>
                <div className="sv-stat-num">1<span>yr</span></div> {/* 🔴 ১ বছর অভিজ্ঞতা করা হলো */}
                <div className="sv-stat-lbl">Experience</div>
              </div>
              <div>
                <div className="sv-stat-num">100<span>%</span></div>
                <div className="sv-stat-lbl">Client satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="sv-grid">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.num}
              className={`sv-card${active === i ? " active" : ""}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="sv-card-num">{svc.num}</div>
              <div className="sv-card-title">{svc.title}</div>
              <div className="sv-card-sub">{svc.sub}</div>
              <p className="sv-card-desc">{svc.desc}</p>
              <div className="sv-card-tags">
                {svc.tags.map((tag) => (
                  <span key={tag} className="sv-tag">{tag}</span>
                ))}
              </div>
              <div className="sv-card-price">
                {svc.price}
                <span className="sv-card-arrow">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Strip */}
        <div className="sv-cta">
          <div className="sv-cta-left">
            <h2 className="sv-cta-heading">
              Got a project<br />
              in <span>mind?</span>
            </h2>
            <p className="sv-cta-sub">
              Let&apos;s talk about your idea and figure out the best plan of attack.
              No commitment, no pressure — just an honest conversation.
            </p>
          </div>
          <div className="sv-divider" />
          <div className="sv-cta-right">
            <button className="sv-cta-btn primary">Start a project →</button>
            <button className="sv-cta-btn secondary">See my work →</button>
          </div>
        </div>

        <span className="sv-stamp">© 2026 Shafiq Suzon</span>
      </div>
    </>
  );
}