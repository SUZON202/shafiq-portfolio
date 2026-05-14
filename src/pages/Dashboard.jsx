import { useContext, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

// ─── Sidebar nav items ────────────────────────────────────────────
const NAV_MAIN = [
    { to: "/dashboard", icon: "ti-layout-dashboard", label: "Overview", end: true },
    { to: "/dashboard/users", icon: "ti-users", label: "Users", badge: 24 },
    { to: "/dashboard/orders", icon: "ti-shopping-bag", label: "Orders" },
    { to: "/dashboard/analytics", icon: "ti-chart-bar", label: "Analytics" },
];
const NAV_MANAGE = [
    { to: "/dashboard/content", icon: "ti-file-text", label: "Content" },
    { to: "/dashboard/notifications", icon: "ti-bell", label: "Notifications", badge: 3 },
    { to: "/dashboard/settings", icon: "ti-settings", label: "Settings" },
];

const USERS = [
    { initials: "RA", name: "Rahim Ahmed", email: "rahim@mail.com", status: "Active", bg: "#3C3489", fg: "#CECBF6" },
    { initials: "NI", name: "Nadia Islam", email: "nadia@mail.com", status: "Pending", bg: "#085041", fg: "#9FE1CB" },
    { initials: "KH", name: "Karim Hossain", email: "karim@mail.com", status: "Active", bg: "#712B13", fg: "#F5C4B3" },
    { initials: "SB", name: "Sumaiya Begum", email: "sumaiya@mail.com", status: "Inactive", bg: "#633806", fg: "#FAC775" },
];

const TRAFFIC = [
    { label: "Organic", pct: 78, color: "#7c3aed" },
    { label: "Social", pct: 54, color: "#60a5fa" },
    { label: "Email", pct: 38, color: "#4ade80" },
    { label: "Direct", pct: 22, color: "#fb923c" },
    { label: "Referral", pct: 14, color: "#f472b6" },
];

const ACTIVITY = [
    { text: "Rahim Ahmed", sub: "placed a new order", time: "2 min ago", dot: "#4ade80" },
    { text: "Nadia Islam", sub: "registered an account", time: "18 min ago", dot: "#7c3aed" },
    { text: "Order #2841", sub: "marked as shipped", time: "45 min ago", dot: "#fb923c" },
    { text: "Karim Hossain", sub: "left a 5-star review", time: "1 hr ago", dot: "#60a5fa" },
    { text: "Promo SAVE20", sub: "used 14 times today", time: "2 hr ago", dot: "#f472b6" },
];

const WEEKLY = [55, 72, 48, 90, 65, 82, 70];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxW = Math.max(...WEEKLY);

const statusStyle = {
    Active: { background: "rgba(74,222,128,0.1)", color: "#4ade80" },
    Pending: { background: "rgba(251,146,60,0.1)", color: "#fb923c" },
    Inactive: { background: "rgba(248,113,113,0.1)", color: "#f87171" },
};

const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const [sideOpen, setSideOpen] = useState(false);
    const location = useLocation();

    const isOverview = location.pathname === "/dashboard" || location.pathname === "/dashboard/";

    // ডাটাবেস থেকে রিয়েল ডাটা নিয়ে আসার জন্য API কল (Headers যোগ করা হলো)
    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await fetch('https://shafiq-portfolio-server.vercel.app/admin-stats', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            });
            return res.json();
        }
    });

    const STATS = [
        { label: "Total Users", value: stats.users !== undefined ? stats.users : "...", trend: "Real-time", up: true, icon: "ti-users", color: "#7c3aed", bg: "rgba(124,58,237,0.15)" },
        { label: "Total Projects", value: stats.projects !== undefined ? stats.projects : "...", trend: "Real-time", up: true, icon: "ti-apps", color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
        { label: "Total Messages", value: stats.messages !== undefined ? stats.messages : "...", trend: "Real-time", up: true, icon: "ti-mail", color: "#fb923c", bg: "rgba(251,146,60,0.12)" },
        { label: "Orders", value: "1,893", trend: "-2.3%", up: false, icon: "ti-shopping-bag", color: "#60a5fa", bg: "rgba(96,165,250,0.12)" },
    ];

    const initial = user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U";
    const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

    const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
                @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.44.0/tabler-icons.min.css');

                .db-root { display: flex; min-height: 100vh; background: #0b0b12; font-family: 'DM Sans', sans-serif; }
                .db-sidebar { width: 220px; flex-shrink: 0; background: #0e0e18; border-right: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; position: sticky; top: 0; height: 100vh; transition: transform 0.3s ease; z-index: 100; }
                .db-logo { display: flex; align-items: center; gap: 9px; padding: 20px 18px 24px; text-decoration: none; }
                .db-logo-mark { width: 32px; height: 32px; border-radius: 8px; background: #7c3aed; display: flex; align-items: center; justify-content: center; }
                .db-brand { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 800; color: #fff; letter-spacing: -0.4px; }
                .db-brand em { font-style: normal; color: #a78bfa; }
                .db-section { font-size: 10px; color: rgba(255,255,255,0.2); letter-spacing: 1px; padding: 0 18px 8px; text-transform: uppercase; }
                .db-nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 18px; font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.38); cursor: pointer; border-left: 2px solid transparent; text-decoration: none; transition: all 0.15s; }
                .db-nav-item:hover { color: rgba(255,255,255,0.75); background: rgba(255,255,255,0.04); }
                .db-nav-item.active { color: #c4b5fd; background: rgba(139,92,246,0.1); border-left-color: #7c3aed; }
                .db-nav-item i { font-size: 16px; }
                .db-badge { margin-left: auto; background: #7c3aed; color: #fff; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 10px; }
                .db-sidebar-bottom { margin-top: auto; padding: 16px 18px; border-top: 1px solid rgba(255,255,255,0.05); }
                .db-user-row { display: flex; align-items: center; gap: 9px; }
                .db-av { width: 32px; height: 32px; border-radius: 8px; background: #3C3489; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #CECBF6; flex-shrink: 0; }
                .db-uname { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.65); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 90px; }
                .db-urole { font-size: 11px; color: rgba(255,255,255,0.25); }
                .db-logout-btn { margin-left: auto; background: none; border: none; color: rgba(255,255,255,0.2); font-size: 15px; cursor: pointer; padding: 4px; border-radius: 6px; display: flex; align-items: center; justify-content: center; }
                .db-logout-btn:hover { color: #f87171; background: rgba(248,113,113,0.08); }
                .db-main { flex: 1; padding: 28px; min-width: 0; }
                .db-topbar { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 28px; gap: 12px; }
                .db-page-title { font-size: 20px; font-weight: 700; color: #fff; }
                .db-page-sub { font-size: 12px; color: rgba(255,255,255,0.3); margin-top: 2px; }
                .db-top-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
                .db-notif { width: 36px; height: 36px; border-radius: 9px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; cursor: pointer; color: rgba(255,255,255,0.45); font-size: 16px; position: relative; text-decoration: none; }
                .db-notif-dot { width: 7px; height: 7px; background: #7c3aed; border-radius: 50%; position: absolute; top: 7px; right: 7px; border: 1.5px solid #0e0e18; }
                .db-add-btn { height: 36px; padding: 0 16px; background: #7c3aed; border: none; border-radius: 9px; color: #fff; font-size: 13px; font-weight: 600; font-family: 'DM Sans', sans-serif; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 0.2s; }
                .db-add-btn:hover { background: #6d28d9; }
                .db-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px,1fr)); gap: 12px; margin-bottom: 20px; }
                .db-stat { background: #13131e; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 18px; }
                .db-stat-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; font-size: 17px; }
                .db-stat-label { font-size: 11px; color: rgba(255,255,255,0.3); letter-spacing: 0.3px; margin-bottom: 6px; }
                .db-stat-val { font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 5px; }
                .db-stat-trend { font-size: 11px; display: flex; align-items: center; gap: 3px; }
                .db-grid2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px,1fr)); gap: 14px; margin-bottom: 20px; }
                .db-card { background: #13131e; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 20px; }
                .db-card-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
                .db-card-title { font-size: 13px; font-weight: 600; color: #fff; }
                .db-card-link { font-size: 12px; color: #7c3aed; cursor: pointer; text-decoration: none; }
                .db-bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 11px; }
                .db-bar-label { font-size: 12px; color: rgba(255,255,255,0.4); width: 52px; flex-shrink: 0; }
                .db-bar-track { flex: 1; height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden; }
                .db-bar-fill { height: 100%; border-radius: 3px; }
                .db-bar-num { font-size: 12px; color: rgba(255,255,255,0.45); width: 32px; text-align: right; flex-shrink: 0; }
                .db-act-item { display: flex; gap: 10px; align-items: flex-start; padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
                .db-act-item:last-child { border-bottom: none; }
                .db-act-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
                .db-act-text { font-size: 12px; color: rgba(255,255,255,0.45); line-height: 1.5; }
                .db-act-text strong { color: rgba(255,255,255,0.75); font-weight: 500; }
                .db-act-time { font-size: 11px; color: rgba(255,255,255,0.2); margin-top: 1px; }
                .db-bottom { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px,1fr)); gap: 14px; }
                .db-tr { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
                .db-tr:last-child { border-bottom: none; }
                .db-tr-av { width: 30px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }
                .db-tr-name { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.7); }
                .db-tr-email { font-size: 11px; color: rgba(255,255,255,0.25); }
                .db-tr-status { margin-left: auto; font-size: 11px; padding: 3px 8px; border-radius: 6px; font-weight: 500; white-space: nowrap; }
                .db-mini-stat { background: #1a1a28; border-radius: 10px; padding: 12px 14px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; }
                .db-mini-label { font-size: 11px; color: rgba(255,255,255,0.3); }
                .db-mini-val { font-size: 17px; font-weight: 700; color: #fff; }
                .db-chart-bars { display: flex; align-items: flex-end; gap: 5px; height: 80px; }
                .db-cb { flex: 1; border-radius: 4px 4px 0 0; min-height: 4px; }
                .db-day-labels { display: flex; justify-content: space-between; margin-top: 5px; }
                .db-day-label { font-size: 10px; color: rgba(255,255,255,0.2); text-align: center; flex: 1; }
                .db-burger { display: none; }

                @media (max-width: 768px) {
                    .db-sidebar { position: fixed; left: 0; top: 0; height: 100%; transform: translateX(-100%); }
                    .db-sidebar.open { transform: translateX(0); }
                    .db-burger { display: flex; position: fixed; top: 16px; left: 16px; z-index: 200; width: 36px; height: 36px; background: #7c3aed; border: none; border-radius: 9px; cursor: pointer; align-items: center; justify-content: center; color: #fff; font-size: 18px; }
                    .db-main { padding: 16px; padding-top: 64px; }
                }
            `}</style>

            <div className="db-root">
                <button className="db-burger" onClick={() => setSideOpen(!sideOpen)} aria-label="Toggle sidebar">
                    <i className={`ti ${sideOpen ? "ti-x" : "ti-menu-2"}`} />
                </button>

                <aside className={`db-sidebar${sideOpen ? " open" : ""}`}>
                    <Link to="/" className="db-logo">
                        <div className="db-logo-mark">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2 12L7 2L12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M3.8 8.8H10.2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <span className="db-brand">Shafiq<em>Suzon</em></span>
                    </Link>

                    <div className="db-section">Main</div>
                    {NAV_MAIN.map(({ to, icon, label, badge, end }) => (
                        <NavLink key={to} to={to} end={end}
                            className={({ isActive }) => `db-nav-item${isActive ? " active" : ""}`}
                            onClick={() => setSideOpen(false)}
                        >
                            <i className={`ti ${icon}`} aria-hidden="true" />
                            {label}
                            {/* ডাইনামিক ইউজার ব্যাজ */}
                            {label === "Users" ? (
                                <span className="db-badge">{stats.users ?? 0}</span>
                            ) : (
                                badge && <span className="db-badge">{badge}</span>
                            )}
                        </NavLink>
                    ))}

                    <div className="db-section" style={{ marginTop: 16 }}>Manage</div>
                    {NAV_MANAGE.map(({ to, icon, label, badge }) => (
                        <NavLink key={to} to={to}
                            className={({ isActive }) => `db-nav-item${isActive ? " active" : ""}`}
                            onClick={() => setSideOpen(false)}
                        >
                            <i className={`ti ${icon}`} aria-hidden="true" />
                            {label}
                            {/* ডাইনামিক নোটিফিকেশন ব্যাজ */}
                            {label === "Notifications" ? (
                                <span className="db-badge">{stats.messages ?? 0}</span>
                            ) : (
                                badge && <span className="db-badge">{badge}</span>
                            )}
                        </NavLink>
                    ))}

                    <div className="db-sidebar-bottom">
                        <div className="db-user-row">
                            <div className="db-av">{initial}</div>
                            <div style={{ minWidth: 0 }}>
                                <div className="db-uname" title={displayName}>{displayName}</div>
                                <div className="db-urole">Administrator</div>
                            </div>
                            <button className="db-logout-btn" onClick={() => logOut()} title="Logout">
                                <i className="ti ti-logout" />
                            </button>
                        </div>
                    </div>
                </aside>

                <main className="db-main">
                    <div className="db-topbar">
                        <div>
                            <div className="db-page-title">{greeting}, {displayName.split(" ")[0]}</div>
                            <div className="db-page-sub">{today}</div>
                        </div>
                        <div className="db-top-actions">
                            <Link to="/dashboard/notifications" className="db-notif">
                                <i className="ti ti-bell" />
                                {stats.messages > 0 && <span className="db-notif-dot" />}
                            </Link>
                            <button className="db-add-btn">
                                <i className="ti ti-plus" style={{ fontSize: 14 }} />
                                New Report
                            </button>
                        </div>
                    </div>

                    {isOverview ? (
                        <>
                            <div className="db-stats">
                                {STATS.map(({ label, value, trend, up, icon, color, bg }) => (
                                    <div key={label} className="db-stat">
                                        <div className="db-stat-icon" style={{ background: bg, color }}>
                                            <i className={`ti ${icon}`} />
                                        </div>
                                        <div className="db-stat-label">{label}</div>
                                        <div className="db-stat-val">{value}</div>
                                        <div className="db-stat-trend" style={{ color: up ? "#4ade80" : "#f87171" }}>
                                            <i className={`ti ${up ? "ti-trending-up" : "ti-trending-down"}`} style={{ fontSize: 13 }} />
                                            {trend} this month
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="db-grid2">
                                <div className="db-card">
                                    <div className="db-card-hdr">
                                        <span className="db-card-title">Traffic by source</span>
                                        <Link to="/dashboard/analytics" className="db-card-link">View all</Link>
                                    </div>
                                    {TRAFFIC.map(({ label, pct, color }) => (
                                        <div key={label} className="db-bar-row">
                                            <span className="db-bar-label">{label}</span>
                                            <div className="db-bar-track">
                                                <div className="db-bar-fill" style={{ width: `${pct}%`, background: color }} />
                                            </div>
                                            <span className="db-bar-num">{pct}%</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="db-card">
                                    <div className="db-card-hdr">
                                        <span className="db-card-title">Recent activity</span>
                                        <Link to="/dashboard/notifications" className="db-card-link">See all</Link>
                                    </div>
                                    {ACTIVITY.map(({ text, sub, time, dot }, i) => (
                                        <div key={i} className="db-act-item">
                                            <span className="db-act-dot" style={{ background: dot }} />
                                            <div>
                                                <div className="db-act-text"><strong>{text}</strong> {sub}</div>
                                                <div className="db-act-time">{time}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="db-bottom">
                                <div className="db-card">
                                    <div className="db-card-hdr">
                                        <span className="db-card-title">Recent users</span>
                                        <Link to="/dashboard/users" className="db-card-link">Manage</Link>
                                    </div>
                                    {USERS.map(({ initials, name, email, status, bg, fg }) => (
                                        <div key={email} className="db-tr">
                                            <div className="db-tr-av" style={{ background: bg, color: fg }}>{initials}</div>
                                            <div>
                                                <div className="db-tr-name">{name}</div>
                                                <div className="db-tr-email">{email}</div>
                                            </div>
                                            <span className="db-tr-status" style={statusStyle[status]}>{status}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="db-card">
                                    <div className="db-card-hdr">
                                        <span className="db-card-title">Weekly sales</span>
                                    </div>
                                    <div className="db-mini-stat">
                                        <div>
                                            <div className="db-mini-label">This week</div>
                                            <div className="db-mini-val">$9,840</div>
                                        </div>
                                        <span style={{ fontSize: 12, color: "#4ade80", fontWeight: 600 }}>+14%</span>
                                    </div>
                                    <div className="db-chart-bars">
                                        {WEEKLY.map((v, i) => (
                                            <div key={i} className="db-cb" style={{
                                                height: `${(v / maxW) * 100}%`,
                                                background: "#7c3aed",
                                                opacity: i === 3 ? 1 : 0.4,
                                            }} />
                                        ))}
                                    </div>
                                    <div className="db-day-labels">
                                        {DAYS.map(d => <span key={d} className="db-day-label">{d}</span>)}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <Outlet />
                    )}
                </main>
            </div>
        </>
    );
};

export default Dashboard;