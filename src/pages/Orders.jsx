import { useQuery } from "@tanstack/react-query";

const Orders = () => {

    // ডাটাবেস থেকে রিয়েল ডাটা নিয়ে আসা হচ্ছে
    const { data: ordersList = [], isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await fetch('https://shafiq-portfolio-server.vercel.app/orders', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            });
            return res.json();
        }
    });

    // স্ট্যাটাস অনুযায়ী অটোমেটিক কালার সেট করার ফাংশন
    const getStatusStyle = (status) => {
        const currentStatus = status?.toLowerCase();
        if (currentStatus === 'completed') return { color: "#4ade80", bg: "rgba(74,222,128,0.1)" };
        if (currentStatus === 'in progress') return { color: "#60a5fa", bg: "rgba(96,165,250,0.1)" };
        if (currentStatus === 'pending') return { color: "#fb923c", bg: "rgba(251,146,60,0.1)" };
        return { color: "#a1a1aa", bg: "rgba(161,161,170,0.1)" }; // ডিফল্ট কালার
    };

    if (isLoading) {
        return <div className="text-white text-center mt-10"><span className="loading loading-spinner text-primary"></span> Loading orders...</div>;
    }

    return (
        <>
            <style>{`
                .ord-container { background: #13131e; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 24px; margin-top: 20px;}
                .ord-header { margin-bottom: 24px; }
                .ord-title { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 6px; }
                .ord-sub { font-size: 13px; color: rgba(255,255,255,0.4); }
                
                /* Grid Layout */
                .ord-table-header { display: grid; grid-template-columns: 1fr 1.5fr 1.5fr 1fr 1fr 1fr; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06); margin-bottom: 8px; }
                .ord-th { font-size: 11px; color: rgba(255,255,255,0.3); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
                
                .ord-row { display: grid; grid-template-columns: 1fr 1.5fr 1.5fr 1fr 1fr 1fr; align-items: center; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.2s; }
                .ord-row:hover { background: rgba(255,255,255,0.02); border-radius: 8px; padding-left: 8px; margin-left: -8px;}
                .ord-row:last-child { border-bottom: none; }
                
                .ord-td { font-size: 13px; color: rgba(255,255,255,0.75); font-weight: 500; }
                .ord-id { color: #a78bfa; font-weight: 600; }
                .ord-amount { color: #fff; font-weight: 700; font-size: 14px; }
                .ord-date { font-size: 12px; color: rgba(255,255,255,0.4); }
                .ord-status { padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; width: fit-content; text-transform: capitalize;}
            `}</style>

            <div className="ord-container">
                <div className="ord-header">
                    <h2 className="ord-title">Manage Orders</h2>
                    <p className="ord-sub">Track and manage your freelance project orders (Total {ordersList.length})</p>
                </div>

                <div className="ord-table-header">
                    <div className="ord-th">Order ID</div>
                    <div className="ord-th">Client Name</div>
                    <div className="ord-th">Service</div>
                    <div className="ord-th">Date</div>
                    <div className="ord-th">Amount</div>
                    <div className="ord-th">Status</div>
                </div>

                <div>
                    {ordersList.length > 0 ? (
                        ordersList.map((order) => {
                            const statusStyle = getStatusStyle(order.status);
                            
                            return (
                                <div key={order._id || order.id} className="ord-row">
                                    <div className="ord-td ord-id">{order.orderId || order.id || "N/A"}</div>
                                    <div className="ord-td">{order.clientName || order.client || "Unknown"}</div>
                                    <div className="ord-td">{order.service || "Web Development"}</div>
                                    <div className="ord-td ord-date">{order.date || "Just Now"}</div>
                                    <div className="ord-td ord-amount">{order.amount || "$0"}</div>
                                    <div className="ord-td">
                                        <span className="ord-status" style={{ background: statusStyle.bg, color: statusStyle.color }}>
                                            {order.status || "Pending"}
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            No orders found in the database.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Orders;