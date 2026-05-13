import React from "react";

const SKILLS = [
  {
    category: "Frontend Development",
    items: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Next.js", "Tailwind CSS", "DaisyUI", "Framer Motion"]
  },
  {
    category: "Backend & Database",
    items: ["Node.js", "Express.js", "MongoDB", "RESTful APIs", "Firebase", "JWT Auth"]
  },
  {
    category: "Tools & Workflow",
    items: ["Git", "GitHub", "VS Code", "Vite", "Figma", "NPM / Yarn", "Postman"]
  }
];

const TICKER = [
  "Frontend Architecture", "—", "Clean Code", "—", "Interactive UI", "—",
  "Problem Solving", "—", "Responsive Design", "—", "Web Performance", "—",
];

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;700;800&family=DM+Mono:wght@300;400&display=swap');

/* =========================================
   Light Mode & Default Variables
   ========================================= */
:root {
  --ab-paper: #f2ede4;
  --ab-ink: #111111;
  --ab-accent: #e8380d;
  --ab-muted: #9e9488;
  --ab-faint: rgba(17, 17, 17, 0.08);
  
  --ab-mono: 'DM Mono', monospace;
  --ab-display: 'Bebas Neue', sans-serif;
  --ab-body: 'Syne', sans-serif;
}

/* =========================================
   Dark Mode Variables
   ========================================= */
:root[data-theme="dark"], [data-theme="dark"] {
  --ab-paper: #111111;
  --ab-ink: #f2ede4;
  --ab-accent: #ff5733; 
  --ab-muted: #8c8273;
  --ab-faint: rgba(242, 237, 228, 0.15);
}

/* =========================================
   Base Layout
   ========================================= */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
.ab-root { background: var(--ab-paper); font-family: var(--ab-body); min-height: 100vh; position: relative; overflow-x: hidden; transition: background-color 0.4s ease, color 0.4s ease; display: flex; flex-direction: column; }

/* === BLACK TICKER === */
.ab-ticker { background: var(--ab-ink); color: var(--ab-paper); font-family: var(--ab-mono); font-size: 11px; letter-spacing: 0.12em; padding: 12px 0; overflow: hidden; white-space: nowrap; transition: background-color 0.4s ease; border-bottom: 2px solid var(--ab-accent); }
.ab-ticker-track { display: inline-flex; animation: ab-slide 25s linear infinite; }
@keyframes ab-slide { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.ab-tick-item { padding: 0 2.5rem; }

/* =========================================
   Grid Container
   ========================================= */
.ab-container { display: grid; grid-template-columns: 1fr 1px 1.2fr; flex-grow: 1; border-bottom: 1px solid var(--ab-faint); transition: border-color 0.4s ease; }
.ab-split { background: var(--ab-faint); transition: background-color 0.4s ease; }

/* =========================================
   Left Side - Bio & Story
   ========================================= */
.ab-left { padding: 5rem 3rem; display: flex; flex-direction: column; }
.ab-eyebrow { display: flex; align-items: center; gap: 10px; font-family: var(--ab-mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--ab-muted); margin-bottom: 2rem; transition: color 0.4s ease; }
.ab-eyebrow-line { width: 40px; height: 2px; background: var(--ab-accent); flex-shrink: 0; transition: background-color 0.4s ease; }

.ab-heading { font-family: var(--ab-display); font-size: clamp(4.5rem, 9vw, 8rem); line-height: 0.85; letter-spacing: 0.02em; color: var(--ab-ink); transition: color 0.4s ease; margin-bottom: 3rem; text-transform: uppercase; }
.ab-heading-red { color: var(--ab-accent); transition: color 0.4s ease; }

.ab-bio-text { font-size: 16px; font-weight: 400; line-height: 1.8; color: var(--ab-muted); max-width: 450px; transition: color 0.4s ease; margin-bottom: 2rem; }
.ab-bio-text strong { color: var(--ab-ink); font-weight: 700; transition: color 0.4s ease; }

.ab-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: auto; padding-top: 2rem; border-top: 1px solid var(--ab-faint); }
.ab-stat-item { display: flex; flex-direction: column; }
.ab-stat-num { font-family: var(--ab-display); font-size: 3rem; color: var(--ab-ink); line-height: 1; transition: color 0.4s ease; }
.ab-stat-num span { color: var(--ab-accent); }
.ab-stat-lbl { font-family: var(--ab-mono); font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ab-muted); margin-top: 5px; transition: color 0.4s ease; }

/* =========================================
   Right Side - Tech Stack & Skills
   ========================================= */
.ab-right { padding: 5rem 3rem; background: var(--ab-paper); transition: background-color 0.4s ease; }
.ab-section-title { font-family: var(--ab-display); font-size: 4rem; color: var(--ab-ink); margin-bottom: 3rem; letter-spacing: 0.05em; transition: color 0.4s ease; line-height: 1; }

.ab-skill-group { margin-bottom: 3.5rem; }

/* === BIG & BOLD CATEGORY HEADER === */
.ab-skill-header { display: flex; align-items: center; gap: 15px; margin-bottom: 1.8rem; border-bottom: 3px solid var(--ab-ink); padding-bottom: 12px; transition: border-color 0.4s ease; }
.ab-skill-num { font-family: var(--ab-mono); font-size: 1.2rem; font-weight: 800; background: var(--ab-accent); color: #ffffff; padding: 6px 12px; display: inline-block; transition: background-color 0.4s ease; }
.ab-skill-cat-title { font-family: var(--ab-display); font-size: clamp(2.2rem, 4vw, 3rem); color: var(--ab-ink); margin: 0; letter-spacing: 0.03em; line-height: 1; text-transform: uppercase; transition: color 0.4s ease; }

.ab-tags-container { display: flex; flex-wrap: wrap; gap: 12px; }

/* Brutalist Hover Tags */
.ab-tag { font-family: var(--ab-body); font-size: 15px; font-weight: 700; padding: 12px 20px; border: 2px solid var(--ab-faint); color: var(--ab-ink); transition: all 0.2s ease; cursor: default; user-select: none; background: transparent; }
.ab-tag:hover { background: var(--ab-ink); color: var(--ab-paper); transform: translate(-4px, -4px); box-shadow: 6px 6px 0px var(--ab-accent); border-color: var(--ab-ink); }

/* Decorative Stamp */
.ab-stamp { position: absolute; bottom: 2rem; right: 2rem; font-family: var(--ab-mono); font-size: 9px; letter-spacing: 0.2em; color: var(--ab-muted); text-transform: uppercase; writing-mode: vertical-rl; opacity: 0.3; pointer-events: none; transition: color 0.4s ease; }

/* Responsive Settings */
@media (max-width: 900px) { 
  .ab-container { grid-template-columns: 1fr; } 
  .ab-split { display: none; }
  .ab-left { padding: 4rem 2rem; border-right: none; border-bottom: 1px solid var(--ab-faint); } 
  .ab-right { padding: 4rem 2rem; } 
}
@media (max-width: 640px) { 
  .ab-left { padding: 3rem 1.5rem; } 
  .ab-right { padding: 3rem 1.5rem; } 
  .ab-heading { font-size: clamp(4rem, 12vw, 6rem); }
  .ab-skill-header { gap: 10px; }
  .ab-skill-num { font-size: 1rem; padding: 4px 8px; }
  .ab-tag { padding: 10px 15px; font-size: 14px; }
  .ab-stamp { display: none; }
}
`;

export default function AboutSection() {
  const tickItems = [...TICKER, ...TICKER];

  return (
    <>
      <style>{STYLES}</style>
      <section className="ab-root" id="about">
        
        {/* ================= BLACK TICKER ================= */}
        <div className="ab-ticker relative z-10">
          <div className="ab-ticker-track">
            {tickItems.map((item, i) => (
              <span key={i} className="ab-tick-item">{item}</span>
            ))}
          </div>
        </div>

        <div className="ab-container relative z-10">
          
          {/* ================= Left Side: Story & Bio ================= */}
          <div className="ab-left">
            <p className="ab-eyebrow">
              <span className="ab-eyebrow-line" />
              The Developer
            </p>
            <h2 className="ab-heading">
              CODE.<br />
              <span className="ab-heading-red">DESIGN.</span><br />
              BUILD.
            </h2>
            
            <p className="ab-bio-text">
              I am a web developer based in Rajshahi, Bangladesh. I bridge the gap between design and engineering — translating complex problems into highly interactive, fast, and scalable digital products. 
            </p>
            <p className="ab-bio-text">
              My approach is simple: write <strong>clean code</strong>, build <strong>intuitive interfaces</strong>, and never stop learning. When I'm not coding, I'm usually exploring new tech stacks or optimizing performance metrics.
            </p>

            <div className="ab-stat-grid">
              <div className="ab-stat-item">
                <div className="ab-stat-num">5<span>+</span></div> {/* 🔴 ৫টি প্রজেক্ট করা হলো */}
                <div className="ab-stat-lbl">Projects Completed</div>
              </div>
              <div className="ab-stat-item">
                <div className="ab-stat-num">1<span>yr</span></div> {/* 🔴 ১ বছর অভিজ্ঞতা করা হলো */}
                <div className="ab-stat-lbl">Coding Experience</div>
              </div>
            </div>
          </div>
          
          <div className="ab-split" />
          
          {/* ================= Right Side: Tech Stack ================= */}
          <div className="ab-right">
            <h3 className="ab-section-title">TECH STACK</h3>
            
            <div className="ab-skills-wrapper">
              {SKILLS.map((skillGroup, index) => (
                <div key={index} className="ab-skill-group">
                  
                  {/* BIG HEADER DESIGN */}
                  <div className="ab-skill-header">
                    <span className="ab-skill-num">0{index + 1}</span>
                    <h4 className="ab-skill-cat-title">{skillGroup.category}</h4>
                  </div>

                  <div className="ab-tags-container">
                    {skillGroup.items.map((item, idx) => (
                      <span key={idx} className="ab-tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
        
        {/* Background Stamp */}
        <span className="ab-stamp">Shafiq Suzon — Portfolio</span>
      </section>
    </>
  );
}