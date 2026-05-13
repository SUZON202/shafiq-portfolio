import React from 'react';

const Analytics = () => {
    return (
        <>
            <style>{`
                .pg-title { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 4px; }
                .pg-sub { font-size: 13px; color: rgba(255,255,255,0.4); margin-bottom: 24px; }
                .an-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-bottom: 24px; }
                .an-card { background: #13131e; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 24px; }
                .an-card-title { font-size: 14px; color: rgba(255,255,255,0.5); margin-bottom: 12px; font-weight: 600; }
                .an-val { font-size: 32px; font-weight: 700; color: #fff; margin-bottom: 8px; }
                .an-desc { font-size: 13px; color: #4ade80; display: flex; align-items: center; gap: 4px; }
                
                .an-bar-container { margin-top: 20px; }
                .an-bar-row { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
                .an-bar-label { font-size: 13px; color: rgba(255,255,255,0.6); width: 80px; }
                .an-bar-track { flex: 1; height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden; }
                .an-bar-fill { height: 100%; border-radius: 4px; background: linear-gradient(90deg, #7c3aed, #a78bfa); }
                .an-bar-pct { font-size: 13px; color: #fff; font-weight: 600; width: 40px; text-align: right; }
            `}</style>

            <div>
                <h2 className="pg-title">Analytics Overview</h2>
                <p className="pg-sub">Detailed statistics about your portfolio performance.</p>

                <div className="an-grid">
                    <div className="an-card">
                        <div className="an-card-title">Profile Views</div>
                        <div className="an-val">12,450</div>
                        <div className="an-desc"><i className="ti ti-arrow-up-right"></i> +15% from last week</div>
                    </div>
                    <div className="an-card">
                        <div className="an-card-title">GitHub Clicks</div>
                        <div className="an-val">842</div>
                        <div className="an-desc"><i className="ti ti-arrow-up-right"></i> +5% from last week</div>
                    </div>
                    <div className="an-card">
                        <div className="an-card-title">Resume Downloads</div>
                        <div className="an-val">156</div>
                        <div className="an-desc"><i className="ti ti-arrow-up-right"></i> +22% from last week</div>
                    </div>
                </div>

                <div className="an-card">
                    <div className="an-card-title" style={{ fontSize: '16px', color: '#fff' }}>Visitor Demographics (Countries)</div>
                    <div className="an-bar-container">
                        {[
                            { country: "Bangladesh", pct: 65 },
                            { country: "USA", pct: 15 },
                            { country: "India", pct: 10 },
                            { country: "UK", pct: 5 },
                            { country: "Others", pct: 5 },
                        ].map((item, i) => (
                            <div key={i} className="an-bar-row">
                                <span className="an-bar-label">{item.country}</span>
                                <div className="an-bar-track">
                                    <div className="an-bar-fill" style={{ width: `${item.pct}%` }}></div>
                                </div>
                                <span className="an-bar-pct">{item.pct}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Analytics;