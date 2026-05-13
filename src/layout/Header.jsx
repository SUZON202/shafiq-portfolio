import { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from 'sweetalert2';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(true); // ← নতুন state
    const dropdownRef = useRef(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ← dark/light mode HTML-এ apply করা
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const handleLogOut = () => {
        // মেনুগুলো যাতে বন্ধ হয়ে যায় 
        setDropdownOpen(false);
        setMenuOpen(false);

        // SweetAlert কনফার্মেশন
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out of your account!",
            icon: 'warning',
            showCancelButton: true,
            background: '#111827', 
            color: '#fff',
            confirmButtonColor: '#EF4444', 
            cancelButtonColor: '#4F46E5', 
            confirmButtonText: 'Yes, log out!'
        }).then((result) => {
            if (result.isConfirmed) {
                // ইউজার 'Yes' চাপলে লগআউট হবে
                logOut()
                    .then(() => {
                        Swal.fire({
                            title: 'Logged Out!',
                            text: 'You have been successfully logged out.',
                            icon: 'success',
                            background: '#111827',
                            color: '#fff',
                            confirmButtonColor: '#4F46E5',
                            timer: 2000, 
                            showConfirmButton: false 
                        });
                        navigate('/login'); // লগআউট শেষে লগইন পেজে যাবে
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        });
    }; 
    // এক্সট্রা ব্র্যাকেটটি এখান থেকে সরিয়ে দেওয়া হয়েছে!

    const initial = user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U";
    const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

    const navItems = [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/services", label: "Services" },
        { to: "/contact", label: "Contact" },
        ...(user ? [{ to: "/dashboard", label: "Dashboard" }] : []),
    ];

    // ← dark/light mode অনুযায়ী color values
    const t = darkMode ? {
        bg: "rgba(8,8,14,0.88)",
        bgScrolled: "rgba(6,6,10,0.96)",
        border: "rgba(255,255,255,0.06)",
        borderScrolled: "rgba(255,255,255,0.09)",
        mobBg: "rgba(7,7,12,0.97)",
        linkColor: "rgba(255,255,255,0.45)",
        linkHover: "rgba(255,255,255,0.88)",
        activeColor: "#c4b5fd",
        activeBg: "rgba(139,92,246,0.13)",
        userBtn: "rgba(255,255,255,0.05)",
        userBorder: "rgba(255,255,255,0.09)",
        dropBg: "rgba(12,12,18,0.98)",
        dropBorder: "rgba(255,255,255,0.07)",
        toggleBg: "rgba(255,255,255,0.07)",
        toggleBorder: "rgba(255,255,255,0.1)",
        iconColor: "rgba(255,255,255,0.7)",
    } : {
        bg: "rgba(248,248,252,0.92)",
        bgScrolled: "rgba(245,245,250,0.98)",
        border: "rgba(0,0,0,0.07)",
        borderScrolled: "rgba(0,0,0,0.1)",
        mobBg: "rgba(246,246,250,0.99)",
        linkColor: "rgba(0,0,0,0.45)",
        linkHover: "rgba(0,0,0,0.85)",
        activeColor: "#6d28d9",
        activeBg: "rgba(109,40,217,0.08)",
        userBtn: "rgba(0,0,0,0.04)",
        userBorder: "rgba(0,0,0,0.09)",
        dropBg: "rgba(255,255,255,0.99)",
        dropBorder: "rgba(0,0,0,0.08)",
        toggleBg: "rgba(0,0,0,0.05)",
        toggleBorder: "rgba(0,0,0,0.1)",
        iconColor: "#555",
    };

    // ← Theme Toggle Button
    const ThemeToggle = ({ isMobile = false }) => (
        <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            style={{
                width: 36, height: 36, borderRadius: 9, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: t.toggleBg, border: `1px solid ${t.toggleBorder}`,
                transition: "all 0.2s", flexShrink: 0,
                ...(isMobile && { width: "100%", borderRadius: 10, height: 42, gap: 8, fontSize: 13, color: t.linkColor }),
            }}
        >
            {darkMode ? (
                /* Sun icon — light mode-এ যেতে */
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.iconColor} strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="12" cy="12" r="4"/>
                    <line x1="12" y1="2" x2="12" y2="5"/>
                    <line x1="12" y1="19" x2="12" y2="22"/>
                    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
                    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
                    <line x1="2" y1="12" x2="5" y2="12"/>
                    <line x1="19" y1="12" x2="22" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
                    <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
                </svg>
            ) : (
                /* Moon icon — dark mode-এ যেতে */
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={t.iconColor} strokeWidth="1.8" strokeLinecap="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
            )}
            {isMobile && (darkMode ? "Light Mode" : "Dark Mode")}
        </button>
    );

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');
                .hdr { font-family: 'DM Sans', sans-serif; position: sticky; top: 0; z-index: 999; }
                .hdr-bar { backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); transition: box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s; }
                .hdr-inner { max-width: 1200px; margin: 0 auto; padding: 0 28px; height: 62px; display: flex; align-items: center; gap: 12px; }
                .hdr-logo { text-decoration: none; display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
                .hdr-logo-mark { width: 34px; height: 34px; border-radius: 9px; background: linear-gradient(140deg,#8b5cf6 0%,#5b21b6 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 18px rgba(139,92,246,0.4); transition: transform 0.35s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s; }
                .hdr-logo:hover .hdr-logo-mark { transform: rotate(-10deg) scale(1.08); box-shadow: 0 0 28px rgba(139,92,246,0.6); }
                .hdr-logo-text { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 800; letter-spacing: -0.5px; }
                .hdr-logo-text em { font-style: normal; background: linear-gradient(90deg,#a78bfa,#ddd6fe); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
                .hdr-nav { display: flex; align-items: center; gap: 2px; margin-left: auto; margin-right: 14px; }
                .hdr-auth { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
                .btn-login { height: 36px; padding: 0 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; border-radius: 9px; background: linear-gradient(135deg,#7c3aed,#6d28d9); color: #fff; border: none; cursor: pointer; text-decoration: none; display: flex; align-items: center; gap: 7px; box-shadow: 0 0 0 1px rgba(139,92,246,0.35), 0 4px 18px rgba(109,40,217,0.4); transition: all 0.2s ease; }
                .btn-login:hover { background: linear-gradient(135deg,#8b5cf6,#7c3aed); transform: translateY(-1px); }
                .hdr-avatar { width: 28px; height: 28px; border-radius: 7px; background: linear-gradient(135deg,#a78bfa,#6d28d9); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; font-family: 'Syne', sans-serif; color: #fff; }
                .hdr-chevron { transition: transform 0.2s; }
                .hdr-chevron.open { transform: rotate(180deg); }
                .hdr-drop { position: absolute; top: calc(100% + 8px); right: 0; width: 208px; border-radius: 14px; padding: 6px; opacity: 0; transform: translateY(-6px) scale(0.98); pointer-events: none; transition: all 0.22s cubic-bezier(0.16,1,0.3,1); }
                .hdr-drop.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: all; }
                .hdr-drop-head { padding: 8px 10px 10px; margin-bottom: 5px; }
                .hdr-drop-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 3px; }
                .hdr-drop-email { font-size: 12.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .hdr-drop-item { display: flex; align-items: center; gap: 9px; padding: 8px 10px; border-radius: 8px; font-size: 13px; text-decoration: none; cursor: pointer; border: none; background: none; width: 100%; text-align: left; font-family: 'DM Sans', sans-serif; transition: all 0.15s; }
                .hdr-burger { display: none; flex-direction: column; gap: 5px; padding: 8px; border-radius: 8px; cursor: pointer; margin-left: auto; transition: background 0.2s; }
                .hdr-burger span { display: block; width: 18px; height: 1.5px; border-radius: 2px; transition: all 0.3s cubic-bezier(0.16,1,0.3,1); transform-origin: center; }
                .hdr-burger.open span:nth-child(1) { transform: rotate(45deg) translate(4.5px,4.5px); }
                .hdr-burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
                .hdr-burger.open span:nth-child(3) { transform: rotate(-45deg) translate(4.5px,-4.5px); }
                .hdr-mob { max-height: 0; overflow: hidden; opacity: 0; transition: max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease; }
                .hdr-mob.open { max-height: 520px; opacity: 1; }
                .hdr-mob-inner { padding: 10px 16px 20px; display: flex; flex-direction: column; gap: 2px; }
                .hdr-mob-sep { height: 1px; margin: 8px 0; }
                @media (max-width: 1023px) {
                    .hdr-nav, .hdr-auth { display: none !important; }
                    .hdr-burger { display: flex; }
                }
            `}</style>

            <div className="hdr">
                <div
                    className="hdr-bar"
                    style={{
                        background: scrolled ? t.bgScrolled : t.bg,
                        borderBottom: `1px solid ${scrolled ? t.borderScrolled : t.border}`,
                        boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.2)" : "none",
                    }}
                >
                    <div className="hdr-inner">
                        {/* Logo */}
                        <Link to="/" className="hdr-logo">
                            <div className="hdr-logo-mark">
                                <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
                                    <path d="M2 12L7 2L12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3.8 8.8H10.2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <div className="hdr-logo-text" style={{ color: darkMode ? "#fff" : "#111" }}>
                                Shafiq<em>Suzon</em>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hdr-nav">
                            {navItems.map(({ to, label }) => (
                                <NavLink
                                    key={to} to={to} end={to === "/"}
                                    style={({ isActive }) => ({
                                        fontSize: "13.5px", fontWeight: 500, textDecoration: "none",
                                        padding: "6px 13px", borderRadius: 8, letterSpacing: "0.15px",
                                        transition: "color 0.18s, background 0.18s",
                                        color: isActive ? t.activeColor : t.linkColor,
                                        background: isActive ? t.activeBg : "transparent",
                                        position: "relative",
                                    })}
                                >
                                    {label}
                                </NavLink>
                            ))}
                        </nav>

                        {/* Desktop Auth + Toggle */}
                        <div className="hdr-auth">
                            <ThemeToggle />
                            {user ? (
                                <div style={{ position: "relative" }} ref={dropdownRef}>
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        style={{
                                            display: "flex", alignItems: "center", gap: 8,
                                            background: t.userBtn, border: `1px solid ${t.userBorder}`,
                                            borderRadius: 10, padding: "4px 11px 4px 4px",
                                            cursor: "pointer", transition: "all 0.2s",
                                        }}
                                    >
                                        <div className="hdr-avatar">{initial}</div>
                                        <span style={{ fontSize: 13, fontWeight: 500, color: darkMode ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.65)", maxWidth: 110, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                            {displayName}
                                        </span>
                                        <svg className={`hdr-chevron${dropdownOpen ? " open" : ""}`} width="11" height="11" viewBox="0 0 12 12" fill="none">
                                            <path d="M2 4L6 8L10 4" stroke={darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                    <div
                                        className={`hdr-drop${dropdownOpen ? " open" : ""}`}
                                        style={{
                                            background: t.dropBg,
                                            border: `1px solid ${t.dropBorder}`,
                                            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                                        }}
                                    >
                                        <div className="hdr-drop-head" style={{ borderBottom: `1px solid ${t.dropBorder}` }}>
                                            <div className="hdr-drop-label" style={{ color: darkMode ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.3)" }}>Signed in as</div>
                                            <div className="hdr-drop-email" style={{ color: darkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)" }}>{user.email}</div>
                                        </div>
                                        {[
                                            { to: "/dashboard", label: "Dashboard" },
                                            { to: "/profile", label: "Profile" },
                                        ].map(({ to, label }) => (
                                            <Link key={to} to={to} className="hdr-drop-item" onClick={() => setDropdownOpen(false)}
                                                style={{ color: darkMode ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)" }}>
                                                {label}
                                            </Link>
                                        ))}
                                        <button className="hdr-drop-item" onClick={handleLogOut}
                                            style={{ color: "#f87171" }}>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <Link to="/login" className="btn-login">
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Mobile Burger */}
                        <button
                            className={`hdr-burger${menuOpen ? " open" : ""}`}
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                            style={{
                                background: t.toggleBg,
                                border: `1px solid ${t.toggleBorder}`,
                            }}
                        >
                            <span style={{ background: darkMode ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.55)" }}/>
                            <span style={{ background: darkMode ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.55)" }}/>
                            <span style={{ background: darkMode ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.55)" }}/>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`hdr-mob${menuOpen ? " open" : ""}`} style={{ background: t.mobBg, borderTop: `1px solid ${t.border}` }}>
                    <div className="hdr-mob-inner">
                        {navItems.map(({ to, label }) => (
                            <NavLink
                                key={to} to={to} end={to === "/"}
                                onClick={() => setMenuOpen(false)}
                                style={({ isActive }) => ({
                                    fontSize: 14, fontWeight: 500, textDecoration: "none",
                                    padding: "10px 14px", borderRadius: 10, transition: "all 0.18s",
                                    color: isActive ? t.activeColor : t.linkColor,
                                    background: isActive ? t.activeBg : "transparent",
                                })}
                            >
                                {label}
                            </NavLink>
                        ))}
                        <div className="hdr-mob-sep" style={{ background: t.border }}/>
                        <ThemeToggle isMobile={true} />
                        <div className="hdr-mob-sep" style={{ background: t.border }}/>
                        {user ? (
                            <>
                                <div style={{
                                    display: "flex", alignItems: "center", gap: 10,
                                    padding: "10px 14px", borderRadius: 10, marginBottom: 6,
                                    background: "rgba(139,92,246,0.07)",
                                    border: "1px solid rgba(139,92,246,0.14)",
                                }}>
                                    <div className="hdr-avatar">{initial}</div>
                                    <span style={{ fontSize: 12.5, color: darkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {user.email}
                                    </span>
                                </div>
                                <button onClick={handleLogOut} style={{
                                    display: "flex", alignItems: "center", gap: 9,
                                    padding: "10px 14px", borderRadius: 10, width: "100%",
                                    background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.13)",
                                    color: "#f87171", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                                }}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-login"
                                style={{ justifyContent: "center", borderRadius: 10, height: 42 }}>
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;