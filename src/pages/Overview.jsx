import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Overview = () => {
    // ডাটাবেস থেকে স্ট্যাটাস নিয়ে আসার জন্য API কল
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await fetch('https://shafiq-portfolio-server.vercel.app/admin-stats');
            return res.json();
        }
    });

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <div style={{
                    width: '40px', height: '40px', border: '4px solid rgba(124,58,237,0.2)', 
                    borderTopColor: '#7c3aed', borderRadius: '50%', animation: 'spin 1s linear infinite'
                }}></div>
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    // ─── Stat cards data (API থেকে ডাইনামিক ডাটা বসানো হয়েছে) ───
    const STATS = [
        { label: "Total Users", value: stats.users || 0, trend: "Real-time", up: true, icon: "ti-users", color: "#7c3aed", bg: "rgba(124,58,237,0.15)" },
        { label: "Total Projects", value: stats.projects || 0, trend: "Real-time", up: true, icon: "ti-apps", color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
        { label: "Total Messages", value: stats.messages || 0, trend: "Real-time", up: true, icon: "ti-mail", color: "#fb923c", bg: "rgba(251,146,60,0.12)" },
        // আপনার ৪টি কার্ডের ডিজাইন ঠিক রাখার জন্য শেষেরটি আগের মতোই রেখেছি
        { label: "Orders", value: "1,893", trend: "-2.3%", up: false, icon: "ti-shopping-bag", color: "#60a5fa", bg: "rgba(96,165,250,0.12)" },
    ];

    // ─── স্ট্যাটিক ডেমো ডাটা (ডিজাইন সুন্দর রাখার জন্য) ───
    const TRAFFIC = [
        { label: "Organic", pct: 78, color: "#7c3aed" },
        { label: "Social", pct: 54, color: "#60a5fa" },
        { label: "Email", pct: 38, color: "#4ade80" },
        { label: "Direct", pct: 22, color: "#fb923c" },
    ];

    const ACTIVITY = [
        { text: "System", sub: "database backed up", time: "10 min ago", dot: "#4ade80" },
        { text: "New User", sub: "registered an account", time: "1 hr ago", dot: "#7c3aed" },
        { text: "Admin", sub: "updated role settings", time: "2 hrs ago", dot: "#fb923c" },
    ];

    const WEEKLY = [55, 72, 48, 90, 65, 82, 70];
    const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const maxW = Math.max(...WEEKLY);

    return (
        <>
            <style>{`
                .ov-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
                .ov-stat { background: #13131e; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 20px; }
                .ov-stat-icon { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; font-size: 20px; }
                .ov-stat-label { font-size: 12px; color: rgba(255,255,255,0.4); letter-spacing: 0.5px; margin-bottom: 8px; text-transform: uppercase; font-weight: 600; }
                .ov-stat-val { font-size: 28px; font-weight: 700; color: #fff; margin-bottom: 8px; }
                .ov-stat-trend { font-size: 12px; display: flex; align-items: center; gap: 4px; font-weight: 500; }
                
                .ov-grid2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 24px; }
                .ov-card { background: #13131e; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 24px; }
                .ov-card-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
                .ov-card-title { font-size: 15px; font-weight: 600; color: #fff; }
                .ov-card-link { font-size: 13px; color: #7c3aed; cursor: pointer; text-decoration: none; font-weight: 500; }
                
                .ov-bar-row { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
                .ov-bar-label { font-size: 13px; color: rgba(255,255,255,0.5); width: 60px; flex-shrink: 0; }
                .ov-bar-track { flex: 1; height: 8px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden; }
                .ov-bar-fill { height: 100%; border-radius: 4px; }
                .ov-bar-num { font-size: 13px; color: rgba(255,255,255,0.7); width: 36px; text-align: right; flex-shrink: 0; font-weight: 500; }
                
                .ov-act-item { display: flex; gap: 12px; align-items: flex-start; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
                .ov-act-item:last-child { border-bottom: none; }
                .ov-act-dot { width: 10px; height: 10px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
                .ov-act-text { font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.5; }
                .ov-act-text strong { color: rgba(255,255,255,0.9); font-weight: 600; }
                .ov-act-time { font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 4px; }

                .ov-mini-stat { background: #1a1a28; border-radius: 12px; padding: 16px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; }
                .ov-mini-label { font-size: 12px; color: rgba(255,255,255,0.4); font-weight: 500; margin-bottom: 4px; }
                .ov-mini-val { font-size: 20px; font-weight: 700; color: #fff; }
                .ov-chart-bars { display: flex; align-items: flex-end; gap: 8px; height: 100px; margin-top: 20px; }
                .ov-cb { flex: 1; border-radius: 6px 6px 0 0; min-height: 4px; transition: height 0.3s ease; }
                .ov-day-labels { display: flex; justify-content: space-between; margin-top: 8px; }
                .ov-day-label { font-size: 11px; color: rgba(255,255,255,0.3); text-align: center; flex: 1; font-weight: 500; }
            `}</style>

            {/* ── Top Stat Cards ── */}
            <div className="ov-stats">
                {STATS.map(({ label, value, trend, up, icon, color, bg }) => (
                    <div key={label} className="ov-stat">
                        <div className="ov-stat-icon" style={{ background: bg, color }}>
                            <i className={`ti ${icon}`} aria-hidden="true" />
                        </div>
                        <div className="ov-stat-label">{label}</div>
                        <div className="ov-stat-val">{value}</div>
                        <div className="ov-stat-trend" style={{ color: up ? "#4ade80" : "#f87171" }}>
                            <i className={`ti ${up ? "ti-trending-up" : "ti-trending-down"}`} style={{ fontSize: 14 }} aria-hidden="true" />
                            {trend}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Two Column Grid ── */}
            <div className="ov-grid2">
                
                {/* Traffic Sources */}
                <div className="ov-card">
                    <div className="ov-card-hdr">
                        <span className="ov-card-title">Traffic by source</span>
                        <Link to="/dashboard/analytics" className="ov-card-link">View Details</Link>
                    </div>
                    {TRAFFIC.map(({ label, pct, color }) => (
                        <div key={label} className="ov-bar-row">
                            <span className="ov-bar-label">{label}</span>
                            <div className="ov-bar-track">
                                <div className="ov-bar-fill" style={{ width: `${pct}%`, background: color }} />
                            </div>
                            <span className="ov-bar-num">{pct}%</span>
                        </div>
                    ))}
                </div>

                {/* System Activity */}
                <div className="ov-card">
                    <div className="ov-card-hdr">
                        <span className="ov-card-title">Recent System Activity</span>
                    </div>
                    {ACTIVITY.map(({ text, sub, time, dot }, i) => (
                        <div key={i} className="ov-act-item">
                            <span className="ov-act-dot" style={{ background: dot }} />
                            <div>
                                <div className="ov-act-text"><strong>{text}</strong> {sub}</div>
                                <div className="ov-act-time">{time}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Weekly Report Chart */}
                <div className="ov-card" style={{ gridColumn: "1 / -1" }}>
                    <div className="ov-card-hdr">
                        <span className="ov-card-title">Weekly Engagement Overview</span>
                    </div>
                    <div className="ov-mini-stat">
                        <div>
                            <div className="ov-mini-label">This Week's Visitors</div>
                            <div className="ov-mini-val">2,480</div>
                        </div>
                        <span style={{ fontSize: 13, color: "#4ade80", fontWeight: 600, background: "rgba(74,222,128,0.1)", padding: "4px 8px", borderRadius: "6px" }}>+14% vs last week</span>
                    </div>
                    <div className="ov-chart-bars">
                        {WEEKLY.map((v, i) => (
                            <div key={i} className="ov-cb" style={{
                                height: `${(v / maxW) * 100}%`,
                                background: "linear-gradient(to top, rgba(124,58,237,0.5), #7c3aed)",
                                opacity: i === 3 ? 1 : 0.6,
                            }} />
                        ))}
                    </div>
                    <div className="ov-day-labels">
                        {DAYS.map(d => <span key={d} className="ov-day-label">{d}</span>)}
                    </div>
                </div>

            </div>
        </>
    );
};

export default Overview;