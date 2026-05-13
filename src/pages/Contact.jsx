import React, { useState, useRef } from "react";

const TICKER = [
  "Available for new projects", "—", "Rajshahi, Bangladesh",
  "—", "Open to remote work", "—", "Let's build something great", "—",
];

const FIELDS = [
  { id: "name",   label: "Full name",     type: "text",   ph: "Your name" },
  { id: "email",  label: "Email address", type: "email", ph: "hello@example.com" },
  { id: "budget", label: "Budget range",  type: "text",   ph: "$500 – $5000" },
];

// 🔴 আপনার ইমেইল এবং ফোন নম্বর এখানে সঠিকভাবে বসানো হয়েছে
const INFO = [
  { label: "Email",        value: "shafiqsuzon1@gmail.com", link: "mailto:shafiqsuzon1@gmail.com" },
  { label: "Phone",        value: "01686678625", link: "tel:01686678625" },
  { label: "Based in",     value: "Rajshahi, Bangladesh" },
  { label: "Availability", value: "● Open now", red: true },
];

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;700;800&family=DM+Mono:wght@300;400&display=swap');

/* =========================================
   Light Mode & Default Variables
   ========================================= */
:root {
  --cs-paper: #f2ede4;
  --cs-ink: #111111;
  --cs-accent: #e8380d;
  --cs-muted: #9e9488;
  --cs-faint: rgba(17, 17, 17, 0.1);
  --cs-success-bg: rgba(232, 56, 13, 0.07);
  
  --cs-mono: 'DM Mono', monospace;
  --cs-display: 'Bebas Neue', sans-serif;
  --cs-body: 'Syne', sans-serif;
}

/* =========================================
   Dark Mode Variables 
   ========================================= */
.dark, [data-theme="dark"] {
  --cs-paper: #111111;
  --cs-ink: #f2ede4;
  --cs-accent: #ff5733; 
  --cs-muted: #8c8273;
  --cs-faint: rgba(242, 237, 228, 0.15);
  --cs-success-bg: rgba(255, 87, 51, 0.1);
}

/* =========================================
   Base Styles
   ========================================= */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
.cs-root { 
  background: var(--cs-paper); 
  font-family: var(--cs-body); 
  min-height: 100vh; 
  position: relative; 
  overflow: hidden; 
  transition: background-color 0.4s ease, color 0.4s ease; 
}
.cs-ticker { background: var(--cs-ink); color: var(--cs-paper); font-family: var(--cs-mono); font-size: 11px; letter-spacing: 0.12em; padding: 9px 0; overflow: hidden; white-space: nowrap; border-bottom: 2px solid var(--cs-accent); transition: background-color 0.4s ease, border-color 0.4s ease; }
.cs-ticker-track { display: inline-flex; animation: cs-slide 22s linear infinite; }
@keyframes cs-slide { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.cs-tick-item { padding: 0 2.5rem; }
.cs-body { display: grid; grid-template-columns: 1fr 1px 1fr; min-height: calc(100vh - 38px); }
.cs-left { padding: 3.5rem 3rem; display: flex; flex-direction: column; }
.cs-split { background: var(--cs-faint); transition: background-color 0.4s ease; }
.cs-right { padding: 3.5rem 3rem; display: flex; flex-direction: column; }

/* Typography */
.cs-eyebrow { display: flex; align-items: center; gap: 10px; font-family: var(--cs-mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--cs-muted); margin-bottom: 2rem; transition: color 0.4s ease;}
.cs-eyebrow-line { width: 30px; height: 2px; background: var(--cs-accent); flex-shrink: 0; transition: background-color 0.4s ease;}
.cs-heading { font-family: var(--cs-display); font-size: clamp(4rem, 9vw, 7.5rem); line-height: 0.88; letter-spacing: 0.015em; color: var(--cs-ink); margin-bottom: 1.8rem; transition: color 0.4s ease; }
.cs-heading-red { color: var(--cs-accent); transition: color 0.4s ease; }
.cs-tagline { font-size: 13px; font-weight: 400; color: var(--cs-muted); line-height: 1.75; max-width: 290px; margin-bottom: 3rem; transition: color 0.4s ease; }

/* Info Section */
.cs-info { margin-top: auto; }
.cs-info-row { display: flex; justify-content: space-between; align-items: center; padding: 13px 0; border-top: 1px solid var(--cs-faint); cursor: pointer; transition: padding-left 0.18s ease, border-color 0.4s ease; text-decoration: none; color: inherit; }
.cs-info-row:last-child { border-bottom: 1px solid var(--cs-faint); }
.cs-info-row.hov { padding-left: 10px; }
.cs-info-lbl { font-family: var(--cs-mono); font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--cs-muted); margin-bottom: 3px; transition: color 0.4s ease;}
.cs-info-val { font-size: 13px; font-weight: 700; color: var(--cs-ink); transition: color 0.4s ease;}
.cs-info-val.red { color: var(--cs-accent); }
.cs-arrow { color: var(--cs-accent); font-size: 18px; line-height: 1; transition: color 0.4s ease;}
.cs-bignum { font-family: var(--cs-display); font-size: 9rem; line-height: 1; color: var(--cs-faint); pointer-events: none; user-select: none; letter-spacing: -0.04em; margin-top: 1rem; text-align: right; transition: color 0.4s ease;}

/* Form */
.cs-form-head { font-family: var(--cs-display); font-size: 2.2rem; letter-spacing: 0.06em; color: var(--cs-ink); margin-bottom: 2rem; transition: color 0.4s ease;}
.cs-field { border-top: 1px solid var(--cs-faint); transition: border-color 0.4s ease;}
.cs-field:last-of-type { border-bottom: 1px solid var(--cs-faint); }
.cs-field-lbl { display: block; font-family: var(--cs-mono); font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--cs-muted); padding: 11px 0 2px; transition: color 0.15s; }
.cs-field-lbl.on { color: var(--cs-accent); }
.cs-field input, .cs-field textarea { display: block; width: 100%; background: transparent; border: none; outline: none; font-family: var(--cs-body); font-size: 15px; font-weight: 400; color: var(--cs-ink); padding: 4px 0 13px; resize: none; line-height: 1.55; transition: color 0.4s ease;}
.cs-field input::placeholder, .cs-field textarea::placeholder { color: var(--cs-muted); opacity: 1; transition: color 0.4s ease;}

/* Buttons & Alerts */
.cs-submit-row { display: flex; align-items: center; gap: 1.5rem; margin-top: 2rem; }
.cs-btn { font-family: var(--cs-display); font-size: 1.15rem; letter-spacing: 0.1em; background: var(--cs-ink); color: var(--cs-paper); border: none; padding: 15px 2.2rem; cursor: pointer; transition: background-color 0.3s ease, transform 0.15s, color 0.3s ease; flex-shrink: 0; }
.cs-btn:hover { background: var(--cs-accent); color: white; }
.cs-btn:active { transform: scale(0.97); }
.cs-btn.err { background: var(--cs-accent); color: white; }
@keyframes cs-shake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-8px); } 40%,80% { transform: translateX(8px); } }
.shake { animation: cs-shake 0.5s ease; }
.cs-note { font-family: var(--cs-mono); font-size: 10px; color: var(--cs-muted); line-height: 1.7; transition: color 0.4s ease;}
.cs-success { margin-top: 2rem; padding: 1.1rem 1.4rem; border-left: 3px solid var(--cs-accent); background: var(--cs-success-bg); transition: background-color 0.4s ease, border-color 0.4s ease;}
.cs-success p { font-family: var(--cs-mono); font-size: 12px; letter-spacing: 0.04em; color: var(--cs-ink); transition: color 0.4s ease;}
.cs-stamp { position: absolute; bottom: 2.5rem; right: 2.8rem; font-family: var(--cs-mono); font-size: 9px; letter-spacing: 0.18em; color: var(--cs-muted); text-transform: uppercase; writing-mode: vertical-rl; opacity: 0.35; pointer-events: none; transition: color 0.4s ease;}

@media (max-width: 680px) { 
  .cs-body { grid-template-columns: 1fr; } 
  .cs-split { display: none; } 
  .cs-left, .cs-right { padding: 2.2rem 1.4rem; } 
  .cs-bignum { display: none; } 
  .cs-stamp { display: none; } 
}
`;

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [focus, setFocus] = useState(null);
  const [hov, setHov] = useState(null);
  const btnRef = useRef(null);

  const set = (id) => (e) => setForm((f) => ({ ...f, [id]: e.target.value }));

  const submit = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError(true);
      btnRef.current?.classList.add("shake");
      setTimeout(() => { btnRef.current?.classList.remove("shake"); setError(false); }, 700);
      return;
    }

    const messageData = {
        name: form.name,
        email: form.email,
        budget: form.budget,
        message: form.message
    };

    fetch('http://localhost:5000/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(messageData)
    })
    .then(res => res.json())
    .then(data => {
        if (data.insertedId) {
            setSent(true);
            setForm({ name: "", email: "", budget: "", message: "" });
        }
    })
    .catch(err => console.log(err));
  };

  const tickItems = [...TICKER, ...TICKER];

  return (
    <>
      <style>{STYLES}</style>
      <div className="cs-root">
        <div className="cs-ticker">
          <div className="cs-ticker-track">
            {tickItems.map((item, i) => <span key={i} className="cs-tick-item">{item}</span>)}
          </div>
        </div>
        <div className="cs-body">
          <div className="cs-left">
            <div>
              <p className="cs-eyebrow"><span className="cs-eyebrow-line" />Contact</p>
              <h1 className="cs-heading">Got an<br /><span className="cs-heading-red">Idea?</span><br />Let&apos;s<br />Talk.</h1>
              <p className="cs-tagline">I&apos;m Shafiq Suzon — a developer from Rajshahi who turns rough ideas into polished, fast digital products.</p>
            </div>
            <div className="cs-info">
              {INFO.map((row, i) => (
                <a 
                  key={row.label} 
                  href={row.link || "#"} 
                  className={`cs-info-row${hov === i ? " hov" : ""}`} 
                  onMouseEnter={() => setHov(i)} 
                  onMouseLeave={() => setHov(null)}
                  target={row.link?.startsWith('tel') ? "_self" : "_blank"}
                >
                  <div>
                    <div className="cs-info-lbl">{row.label}</div>
                    <div className={`cs-info-val${row.red ? " red" : ""}`}>{row.value}</div>
                  </div>
                  <span className="cs-arrow">→</span>
                </a>
              ))}
            </div>
            <div className="cs-bignum">01</div>
          </div>
          <div className="cs-split" />
          <div className="cs-right">
            <p className="cs-form-head">Send a message</p>
            {FIELDS.map((f) => (
              <div key={f.id} className="cs-field">
                <label htmlFor={`cs-${f.id}`} className={`cs-field-lbl${focus === f.id ? " on" : ""}`}>{f.label}</label>
                <input id={`cs-${f.id}`} type={f.type} placeholder={f.ph} value={form[f.id]} onChange={set(f.id)} onFocus={() => setFocus(f.id)} onBlur={() => setFocus(null)} />
              </div>
            ))}
            <div className="cs-field">
              <label htmlFor="cs-message" className={`cs-field-lbl${focus === "message" ? " on" : ""}`}>Message</label>
              <textarea id="cs-message" rows={5} placeholder="Tell me about your project..." value={form.message} onChange={set("message")} onFocus={() => setFocus("message")} onBlur={() => setFocus(null)} />
            </div>
            {!sent ? (
              <div className="cs-submit-row">
                <button ref={btnRef} className={`cs-btn${error ? " err" : ""}`} onClick={submit}>
                  {error ? "Fill required fields!" : "Send it →"}
                </button>
                <p className="cs-note">I typically reply<br />within 24 hours.</p>
              </div>
            ) : (
              <div className="cs-success"><p>✓ Message received — I&apos;ll be in touch shortly.</p></div>
            )}
          </div>
        </div>
        <span className="cs-stamp">© 2026 Shafiq Suzon</span>
      </div>
    </>
  );
}