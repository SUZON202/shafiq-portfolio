import React from "react";

const FOOTER_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

const SOCIALS = [
  { 
    platform: "LinkedIn", 
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
    link: "https://linkedin.com/in/shafiqsuzon" 
  },
  { 
    platform: "GitHub", 
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>,
    link: "https://github.com/SUZON202" 
  },
  { 
    platform: "Upwork", 
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6"></path><path d="M12 7v5"></path><path d="M9 12h6"></path></svg>,
    link: "https://upwork.com/freelancers/~your-id" 
  },
  { 
    platform: "Fiverr", 
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>,
    link: "https://fiverr.com/shafiqsuzon" 
  },
];

const STYLES = `
/* 1. Theme Variables */
:root {
  --ft-paper: #f2ede4;
  --ft-ink: #111111;
  --ft-accent: #e8380d;
  --ft-muted: #9e9488;
  --ft-border: rgba(17, 17, 17, 0.08);
}

/* Dark Mode logic consistent with your app */
[data-theme="dark"], .dark {
  --ft-paper: #111111;
  --ft-ink: #f2ede4;
  --ft-accent: #ff5733;
  --ft-muted: #8c8273;
  --ft-border: rgba(242, 237, 228, 0.12);
}

.ft-root {
  background: var(--ft-paper);
  color: var(--ft-ink);
  padding: 80px 3rem 40px;
  border-top: 2px solid var(--ft-accent);
  font-family: 'Syne', sans-serif;
  transition: all 0.4s ease;
}

.ft-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  gap: 50px;
}

.ft-brand-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 4rem;
  line-height: 0.9;
  margin-bottom: 20px;
  text-transform: uppercase;
}
.ft-brand-name span { color: var(--ft-accent); }

.ft-tagline {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--ft-muted);
  max-width: 250px;
}

.ft-title {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ft-accent);
  margin-bottom: 25px;
}

.ft-link-list { list-style: none; padding: 0; }
.ft-link-list li { margin-bottom: 12px; }
.ft-link-list a { 
  text-decoration: none; 
  color: var(--ft-ink); 
  font-size: 15px; 
  transition: 0.3s; 
}
.ft-link-list a:hover { color: var(--ft-accent); padding-left: 5px; }

.ft-social-grid { display: flex; flex-wrap: wrap; gap: 12px; }
.ft-social-card {
  width: 45px;
  height: 45px;
  border: 1px solid var(--ft-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ft-ink);
  transition: all 0.3s ease;
  text-decoration: none;
}
.ft-social-card:hover {
  background: var(--ft-ink);
  color: var(--ft-paper);
  border-color: var(--ft-ink);
  transform: translateY(-5px);
}

.ft-bottom {
  margin-top: 80px;
  padding-top: 30px;
  border-top: 1px solid var(--ft-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ft-muted);
}

@media (max-width: 1024px) { .ft-container { grid-template-columns: 1fr 1fr; } }
@media (max-width: 640px) {
  .ft-container { grid-template-columns: 1fr; gap: 40px; }
  .ft-root { padding: 60px 1.5rem 30px; }
  .ft-bottom { flex-direction: column; gap: 15px; text-align: center; }
}
`;

export default function Footer() {
  return (
    <>
      <style>{STYLES}</style>
      <footer className="ft-root">
        <div className="ft-container">
          
          <div className="ft-col">
            <h2 className="ft-brand-name">SHAFIQ<br /><span>SUZON.</span></h2>
            <p className="ft-tagline">
              Web Developer building custom digital solutions in Rajshahi.
            </p>
          </div>

          <div className="ft-col">
            <h4 className="ft-title">Navigation</h4>
            <ul className="ft-link-list">
              {FOOTER_LINKS.map(link => (
                <li key={link.label}><a href={link.path}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="ft-col">
            <h4 className="ft-title">Find Me On</h4>
            <div className="ft-social-grid">
              {SOCIALS.map(soc => (
                <a key={soc.platform} href={soc.link} target="_blank" rel="noreferrer" className="ft-social-card" title={soc.platform}>
                  {soc.svg}
                </a>
              ))}
            </div>
          </div>

          <div className="ft-col">
            <h4 className="ft-title">Location</h4>
            <p style={{ fontSize: '15px' }}>Rajshahi, Bangladesh</p>
            <p style={{ fontSize: '12px', color: 'var(--ft-muted)', marginTop: '10px', lineHeight: '1.6' }}>
              Available for remote opportunities and international collaborations.
            </p>
          </div>

        </div>

        <div className="ft-bottom">
          <p>© 2026 Shafiq Suzon — All Rights Reserved.</p>
          <p>Built with React & Tailwind</p>
        </div>
      </footer>
    </>
  );
}