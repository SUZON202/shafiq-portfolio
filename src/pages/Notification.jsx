import React from 'react';
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2"; 

const Notification = () => {
    // ১. ডাটা নিয়ে আসার সময় চাবি (Token) পাঠানো হচ্ছে
    const { data: messages = [], refetch, isLoading } = useQuery({
        queryKey: ['messages'],
        queryFn: async () => {
            const res = await fetch('https://shafiq-portfolio-server.vercel.app/messages', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            });
            // যদি টোকেন না থাকে বা ভুল হয়, তবে এটি এরর হ্যান্ডেল করবে
            if (!res.ok) {
                throw new Error('Unauthorized Access');
            }
            return res.json();
        }
    });

    // ২. মেসেজ ডিলিট করার সময় চাবি পাঠানো হচ্ছে
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete Message?',
            text: "Are you sure you want to delete this message?",
            icon: 'warning',
            showCancelButton: true,
            background: '#13131e',
            color: '#fff',
            confirmButtonColor: '#f87171',
            cancelButtonColor: '#7c3aed',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://shafiq-portfolio-server.vercel.app/messages/${id}`, { 
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('access-token')}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'The message has been deleted.',
                            icon: 'success',
                            background: '#13131e',
                            color: '#fff',
                            confirmButtonColor: '#7c3aed',
                            timer: 2000,
                            showConfirmButton: false
                        });
                        refetch();
                    }
                });
            }
        });
    };

    if (isLoading) return <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}><span className="loading loading-spinner text-primary"></span> Loading Messages...</div>;

    return (
        <>
            <style>{`
                .msg-container { background: #13131e; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 24px; margin-top: 10px; }
                .msg-header { margin-bottom: 24px; color: white; }
                .msg-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; margin-bottom: 16px; transition: 0.3s; position: relative; }
                .msg-card:hover { border-color: rgba(124,58,237,0.4); background: rgba(255,255,255,0.05); transform: translateY(-2px); }
                .msg-user { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
                .msg-av { width: 40px; height: 40px; background: #7c3aed; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 16px; color: white; }
                .msg-name { font-weight: 700; color: #fff; font-size: 15px; }
                .msg-email { font-size: 13px; color: rgba(255,255,255,0.5); margin-top: 2px;}
                .msg-content { color: rgba(255,255,255,0.8); font-size: 14px; line-height: 1.6; padding-left: 52px; }
                .msg-budget { display: inline-block; background: rgba(74, 222, 128, 0.1); color: #4ade80; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; margin-top: 12px; margin-left: 52px;}
                .msg-time { font-size: 12px; color: rgba(255,255,255,0.3); position: absolute; top: 20px; right: 20px; }
                .msg-del { position: absolute; bottom: 20px; right: 20px; color: #f87171; background: rgba(248, 113, 113, 0.1); border: 1px solid rgba(248, 113, 113, 0.2); width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s; }
                .msg-del:hover { background: #f87171; color: white; }
            `}</style>

            <div className="msg-container">
                <div className="msg-header">
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Inbox Messages ({messages.length})</h2>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>Messages from your portfolio contact form</p>
                </div>

                {messages.map((msg) => (
                    <div key={msg._id} className="msg-card">
                        <span className="msg-time">{msg.date || "Just now"}</span>
                        <div className="msg-user">
                            <div className="msg-av">{msg.name ? msg.name[0].toUpperCase() : "U"}</div>
                            <div>
                                <div className="msg-name">{msg.name}</div>
                                <div className="msg-email">{msg.email}</div>
                            </div>
                        </div>
                        <div className="msg-content">{msg.message}</div>
                        {msg.budget && <div className="msg-budget">Budget: {msg.budget}</div>}
                        
                        <button className="msg-del" onClick={() => handleDelete(msg._id)} title="Delete Message">
                            <i className="ti ti-trash"></i>
                        </button>
                    </div>
                ))}

                {messages.length === 0 && !isLoading && (
                    <div style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '60px 20px' }}>
                        <i className="ti ti-inbox" style={{ fontSize: "48px", marginBottom: "16px", display: "block", opacity: "0.5" }}></i>
                        Your inbox is empty. No new messages yet!
                    </div>
                )}
            </div>
        </>
    );
};

export default Notification; // <-- এখানেই স্পেসটা ঠিক করে দিয়েছি