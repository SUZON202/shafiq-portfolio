import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider'; // আপনার AuthProvider এর সঠিক পাথ দিন
import Swal from 'sweetalert2';

const Settings = () => {
    // Firebase থেকে লগ-ইন করা ইউজারের ডাটা নিয়ে আসা হচ্ছে
    const { user } = useContext(AuthContext);

    // সেভ বাটনের ফাংশন
    const handleSave = (e) => {
        e.preventDefault();
        
        // এখানে ভবিষ্যতে ব্যাকএন্ডে ডাটা পাঠানোর API যোগ করতে পারবেন
        // আপাতত রিয়ালিস্টিক ফিল দেওয়ার জন্য SweetAlert যোগ করা হলো
        Swal.fire({
            title: 'Settings Saved!',
            text: 'Your profile information has been updated successfully.',
            icon: 'success',
            background: '#13131e',
            color: '#fff',
            confirmButtonColor: '#7c3aed',
            timer: 2000,
            showConfirmButton: false
        });
    };

    return (
        <>
            <style>{`
                .pg-title { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 4px; }
                .pg-sub { font-size: 13px; color: rgba(255,255,255,0.4); margin-bottom: 24px; }
                .set-card { background: #13131e; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 28px; max-width: 700px; }
                .set-group { margin-bottom: 20px; }
                .set-label { display: block; font-size: 13px; color: rgba(255,255,255,0.6); margin-bottom: 8px; font-weight: 500; }
                .set-input { width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 12px 16px; border-radius: 8px; color: #fff; font-size: 14px; outline: none; transition: 0.2s; }
                .set-input:focus { border-color: #7c3aed; background: rgba(124,58,237,0.05); }
                .set-btn { background: #7c3aed; color: #fff; border: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: 0.2s; margin-top: 10px; }
                .set-btn:hover { background: #6d28d9; }
                .set-flex { display: flex; gap: 16px; }
                .set-flex > div { flex: 1; }
                
                @media (max-width: 600px) {
                    .set-flex { flex-direction: column; gap: 0; }
                }
            `}</style>

            <div>
                <h2 className="pg-title">Account Settings</h2>
                <p className="pg-sub">Update your profile details and preferences.</p>

                <div className="set-card">
                    <form onSubmit={handleSave}>
                        <div className="set-flex">
                            <div className="set-group">
                                <label className="set-label">Full Name</label>
                                {/* ইউজারের নাম ডায়নামিকভাবে দেখানো হচ্ছে */}
                                <input 
                                    type="text" 
                                    className="set-input" 
                                    defaultValue={user?.displayName || "Shafiq Suzon"} 
                                    placeholder="Your Name" 
                                />
                            </div>
                            <div className="set-group">
                                <label className="set-label">Email Address</label>
                                {/* ইউজারের ইমেইল ডায়নামিকভাবে দেখানো হচ্ছে */}
                                <input 
                                    type="email" 
                                    className="set-input" 
                                    defaultValue={user?.email || ""} 
                                    readOnly 
                                    style={{ opacity: 0.6, cursor: 'not-allowed' }} 
                                />
                            </div>
                        </div>

                        <div className="set-group">
                            <label className="set-label">Portfolio Bio</label>
                            <textarea 
                                className="set-input" 
                                rows="4" 
                                placeholder="I am a MERN stack developer..." 
                                defaultValue="Full-Stack Web Developer based in Rajshahi, Bangladesh. Specialized in React, Node.js, and MongoDB."
                            ></textarea>
                        </div>

                        <div className="set-group">
                            <label className="set-label">GitHub Profile URL</label>
                            <input 
                                type="url" 
                                className="set-input" 
                                placeholder="https://github.com/yourusername" 
                            />
                        </div>

                        <button type="submit" className="set-btn">Save Changes</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Settings;