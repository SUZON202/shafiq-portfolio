import React from 'react';

const Orders = () => {
    // ডেমো অর্ডার ডাটা
    const ordersList = [
        { id: "#ORD-001", client: "Karim Islam", service: "Full-Stack Website", date: "12 May 2026", amount: "$450", status: "Completed", color: "#4ade80", bg: "rgba(74,222,128,0.1)" },
        { id: "#ORD-002", client: "Tech BD", service: "React Frontend", date: "10 May 2026", amount: "$200", status: "In Progress", color: "#60a5fa", bg: "rgba(96,165,250,0.1)" },
        { id: "#ORD-003", client: "Nadia Rahman", service: "Bug Fixing", date: "08 May 2026", amount: "$50", status: "Pending", color: "#fb923c", bg: "rgba(251,146,60,0.1)" },
    ];

    return (
        <>
            <style>{`
                .ord-container { background: #13131e; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 24px; }
                .ord-header { margin-bottom: 24px; }
                .ord-title { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 6px; }
                .ord-sub { font-size: 13px; color: rgba(255,255,255,0.4); }
                
                /* Grid Layout for exact match with Users page */
                .ord-table-header { display: grid; grid-template-columns: 1fr 1.5fr 1.5fr 1fr 1fr 1fr; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06); margin-bottom: 8px; }
                .ord-th { font-size: 11px; color: rgba(255,255,255,0.3); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
                
                .ord-row { display: grid; grid-template-columns: 1fr 1.5fr 1.5fr 1fr 1fr 1fr; align-items: center; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.2s; }
                .ord-row:hover { background: rgba(255,255,255,0.01); }
                .ord-row:last-child { border-bottom: none; }
                
                .ord-td { font-size: 13px; color: rgba(255,255,255,0.75); font-weight: 500; }
                .ord-id { color: #a78bfa; font-weight: 600; }
                .ord-amount { color: #fff; font-weight: 700; font-size: 14px; }
                .ord-date { font-size: 12px; color: rgba(255,255,255,0.4); }
                .ord-status { padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; width: fit-content; }
            `}</style>

            <div className="ord-container">
                {/* টাইটেল এখন কার্ডের ভেতরে */}
                <div className="ord-header">
                    <h2 className="ord-title">Manage Orders</h2>
                    <p className="ord-sub">Track and manage your freelance project orders (Total 3)</p>
                </div>

                {/* কাস্টম গ্রিড টেবিল হেডার */}
                <div className="ord-table-header">
                    <div className="ord-th">Order ID</div>
                    <div className="ord-th">Client Name</div>
                    <div className="ord-th">Service</div>
                    <div className="ord-th">Date</div>
                    <div className="ord-th">Amount</div>
                    <div className="ord-th">Status</div>
                </div>

                {/* ডাটা রো */}
                <div>
                    {ordersList.map((order, index) => (
                        <div key={index} className="ord-row">
                            <div className="ord-td ord-id">{order.id}</div>
                            <div className="ord-td">{order.client}</div>
                            <div className="ord-td">{order.service}</div>
                            <div className="ord-td ord-date">{order.date}</div>
                            <div className="ord-td ord-amount">{order.amount}</div>
                            <div className="ord-td">
                                <span className="ord-status" style={{ background: order.bg, color: order.color }}>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Orders;