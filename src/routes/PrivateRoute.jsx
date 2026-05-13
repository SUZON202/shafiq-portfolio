import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const PrivateRoute = ({ children }) => {
    // AuthContext থেকে ইউজার এবং লোডিং স্টেট নিয়ে আসছি
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // যদি ফায়ারবেস চেক করতে সময় নেয়, তাহলে একটি চমৎকার স্পিনার দেখাবে
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900">
                <span className="loading loading-spinner loading-lg text-blue-500"></span>
            </div>
        );
    }

    // যদি ইউজার লগইন করা থাকে, তাহলে তাকে তার কাঙ্ক্ষিত পেজে (ড্যাশবোর্ডে) যেতে দেবে
    if (user) {
        return children;
    }

    // ইউজার না থাকলে তাকে লগইন পেজে পাঠিয়ে দেবে
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;