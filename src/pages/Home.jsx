import React from "react";
import { useQuery } from "@tanstack/react-query";

const TICKER = [
  "React.js", "—", "Tailwind CSS", "—", "Custom UI", "—",
  "Frontend Development", "—", "DaisyUI", "—", "Web Performance", "—",
];

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;700;800&family=DM+Mono:wght@300;400&display=swap');

/* =========================================
   Light Mode & Default Variables
   ========================================= */
:root {
  --hm-paper: #f2ede4;
  --hm-ink: #111111;
  --hm-accent: #e8380d;
  --hm-muted: #9e9488;
  --hm-faint: rgba(17, 17, 17, 0.08);
  
  --hm-mono: 'DM Mono', monospace;
  --hm-display: 'Bebas Neue', sans-serif;
  --hm-body: 'Syne', sans-serif;
}

/* =========================================
   Dark Mode Variables
   ========================================= */
.dark, [data-theme="dark"] {
  --hm-paper: #111111;
  --hm-ink: #f2ede4;
  --hm-accent: #ff5733; 
  --hm-muted: #8c8273;
  --hm-faint: rgba(242, 237, 228, 0.15);
}

/* =========================================
   Base Layout & Typography
   ========================================= */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
.hm-root { background: var(--hm-paper); font-family: var(--hm-body); min-height: 90vh; position: relative; overflow-x: hidden; transition: background-color 0.4s ease, color 0.4s ease; display: flex; flex-direction: column; }

/* Hero Section */
.hm-hero { display: grid; grid-template-columns: 1.3fr 1px 0.7fr; flex-grow: 1; border-bottom: 1px solid var(--hm-faint); transition: border-color 0.4s ease; }
.hm-split { background: var(--hm-faint); transition: background-color 0.4s ease; }

.hm-hero-left { padding: 4rem 3rem; display: flex; flex-direction: column; justify-content: center; position: relative; }

.hm-round-logo { 
  width: 75px; height: 75px; border-radius: 50%; background: var(--hm-ink); color: var(--hm-paper); 
  display: flex; align-items: center; justify-content: center; font-family: var(--hm-display); 
  font-size: 2.5rem; margin-bottom: 3rem; transition: all 0.4s ease; cursor: pointer; user-select: none;
}
.hm-round-logo:hover { transform: rotate(-15deg) scale(1.08); background: var(--hm-accent); }

.hm-eyebrow { display: flex; align-items: center; gap: 10px; font-family: var(--hm-mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--hm-muted); margin-bottom: 2rem; transition: color 0.4s ease; }
.hm-eyebrow-line { width: 40px; height: 2px; background: var(--hm-accent); flex-shrink: 0; transition: background-color 0.4s ease; }

.hm-heading { font-family: var(--hm-display); font-size: clamp(6rem, 14vw, 13rem); line-height: 0.82; letter-spacing: 0.02em; color: var(--hm-ink); transition: color 0.4s ease; margin: 0; text-transform: uppercase; }
.hm-heading-red { color: var(--hm-accent); transition: color 0.4s ease; }

.hm-hero-right { padding: 4rem 3rem; display: flex; flex-direction: column; justify-content: space-between; }
.hm-intro { font-size: 16px; font-weight: 400; line-height: 1.8; color: var(--hm-muted); max-width: 380px; transition: color 0.4s ease; margin-bottom: 3rem; }
.hm-intro strong { color: var(--hm-ink); font-weight: 700; transition: color 0.4s ease; }

.hm-availability { display: inline-flex; align-items: center; gap: 10px; padding: 12px 20px; border: 1px solid var(--hm-faint); border-radius: 100px; font-family: var(--hm-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--hm-ink); width: max-content; transition: border-color 0.4s ease, color 0.4s ease; margin-bottom: 2rem; }
.hm-dot { width: 8px; height: 8px; background-color: var(--hm-accent); border-radius: 50%; box-shadow: 0 0 10px var(--hm-accent); animation: hm-pulse 2s infinite; }
@keyframes hm-pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }

.hm-details-row { display: flex; gap: 3rem; margin-top: auto; border-top: 1px solid var(--hm-faint); padding-top: 2rem; transition: border-color 0.4s ease; }
.hm-detail-col { display: flex; flex-direction: column; gap: 5px; }
.hm-detail-lbl { font-family: var(--hm-mono); font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--hm-muted); transition: color 0.4s ease; }
.hm-detail-val { font-size: 14px; font-weight: 700; color: var(--hm-ink); transition: color 0.4s ease; }

.hm-scroll { position: absolute; bottom: 3rem; right: 3rem; display: flex; align-items: center; gap: 15px; font-family: var(--hm-mono); font-size: 9px; text-transform: uppercase; letter-spacing: 0.2em; color: var(--hm-muted); transform-origin: right center; transform: rotate(90deg); }
.hm-scroll-line { width: 40px; height: 1px; background: var(--hm-muted); position: relative; overflow: hidden; }
.hm-scroll-line::after { content: ''; position: absolute; top: 0; left: 0; width: 50%; height: 100%; background: var(--hm-accent); animation: hm-scrollright 2s ease-in-out infinite; }
@keyframes hm-scrollright { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }

.hm-ticker { background: var(--hm-ink); color: var(--hm-paper); font-family: var(--hm-mono); font-size: 11px; letter-spacing: 0.12em; padding: 12px 0; overflow: hidden; white-space: nowrap; transition: background-color 0.4s ease; border-bottom: 2px solid var(--hm-accent); }
.hm-ticker-track { display: inline-flex; animation: hm-slide 25s linear infinite; }
@keyframes hm-slide { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.hm-tick-item { padding: 0 2.5rem; }

/* =========================================
   🔴 NEW: PROJECTS SECTION STYLES
   ========================================= */
.p-section { padding: 8rem 3rem; max-width: 1400px; margin: 0 auto; }
.p-header { margin-bottom: 4rem; }
.p-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px; }
.p-card { background: var(--hm-faint); border: 1px solid transparent; border-radius: 20px; overflow: hidden; transition: all 0.4s ease; cursor: pointer; }
.p-card:hover { border-color: var(--hm-accent); transform: translateY(-10px); }
.p-img { width: 100%; height: 240px; object-fit: cover; filter: grayscale(1); transition: 0.5s; }
.p-card:hover .p-img { filter: grayscale(0); }
.p-info { padding: 25px; }
.p-title { font-family: var(--hm-display); font-size: 2.5rem; color: var(--hm-ink); margin-bottom: 10px; text-transform: uppercase; }
.p-tags { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
.p-tag { font-family: var(--hm-mono); font-size: 9px; color: var(--hm-accent); border: 1px solid var(--hm-accent); padding: 4px 10px; border-radius: 100px; text-transform: uppercase; }
.p-links { display: flex; gap: 15px; }
.p-btn { font-family: var(--hm-mono); font-size: 10px; text-decoration: none; color: var(--hm-ink); padding-bottom: 5px; border-bottom: 1px solid var(--hm-accent); text-transform: uppercase; transition: 0.3s; }
.p-btn:hover { color: var(--hm-accent); }

@media (max-width: 800px) { 
  .hm-hero { grid-template-columns: 1fr; } 
  .p-section { padding: 4rem 1.5rem; }
}
`;

export default function HomeSection() {
  const tickItems = [...TICKER, ...TICKER];

  // 🔴 ডাটাবেস থেকে প্রজেক্টগুলো নিয়ে আসা
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['public-projects'],
    queryFn: async () => {
      const res = await fetch('https://shafiq-portfolio-server.vercel.app/projects');
      return res.json();
    }
  });

  return (
    <>
      <style>{STYLES}</style>
      <div className="hm-root">
        
        {/* Ticker Section */}
        <div className="hm-ticker relative z-10">
          <div className="hm-ticker-track">
            {tickItems.map((item, i) => (
              <span key={i} className="hm-tick-item">{item}</span>
            ))}
          </div>
        </div>

        {/* Hero Area */}
        <div className="hm-hero relative z-10">
          <div className="hm-hero-left">
            <div className="hm-round-logo" title="Shafiq Suzon">SS</div>
            <p className="hm-eyebrow">
              <span className="hm-eyebrow-line" />
              Frontend Web Developer
            </p>
            <h1 className="hm-heading">
              SHAFIQ<br />
              <span className="hm-heading-red">SUZON.</span>
            </h1>
          </div>
          <div className="hm-split" />
          <div className="hm-hero-right">
            <div>
              <div className="hm-availability">
                <span className="hm-dot"></span>
                Available for new projects
              </div>
              <p className="hm-intro">
                I build fast, responsive, and pixel-perfect web experiences. Focused on clean code and custom architecture using <strong>React</strong>, <strong>Tailwind CSS</strong>, and <strong>DaisyUI</strong> to turn complex problems into elegant interfaces.
              </p>
            </div>
            <div className="hm-details-row">
              <div className="hm-detail-col">
                <span className="hm-detail-lbl">Location</span>
                <span className="hm-detail-val">Rajshahi, Bangladesh</span>
              </div>
              <div className="hm-detail-col">
                <span className="hm-detail-lbl">Specialty</span>
                <span className="hm-detail-val">Custom UI Architecture</span>
              </div>
            </div>
            <div className="hm-scroll">
              <div className="hm-scroll-line"></div>
              Scroll to explore
            </div>
          </div>
        </div>

        {/* 🔴 NEW: Projects Grid Section (Hero এর নিচে যুক্ত করা হলো) */}
        <section className="p-section">
          <div className="p-header">
            <p className="hm-eyebrow">
              <span className="hm-eyebrow-line" /> Selected Works
            </p>
            <h2 className="hm-heading" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>Portfolio.</h2>
          </div>

          {isLoading ? (
            <div style={{ color: 'var(--hm-accent)', fontFamily: 'var(--hm-mono)' }}>Loading Projects...</div>
          ) : (
            <div className="p-grid">
              {projects.slice().reverse().map((project) => (
                <div key={project._id} className="p-card">
                  <img src={project.image} alt={project.title} className="p-img" />
                  <div className="p-info">
                    <div className="p-tags">
                      {project.technologies?.map((tech, idx) => (
                        <span key={idx} className="p-tag">{tech}</span>
                      ))}
                    </div>
                    <h3 className="p-title">{project.title}</h3>
                    <div className="p-links">
                      <a href={project.liveLink} target="_blank" rel="noreferrer" className="p-btn">Live View</a>
                      <a href={project.githubLink} target="_blank" rel="noreferrer" className="p-btn">Repo</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </>
  );
}