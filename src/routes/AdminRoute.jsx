import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth"; 
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    // ইউজার বা অ্যাডমিন ডাটা লোড হতে সময় লাগলে লোডিং স্পিনার দেখাবে
    if (loading || isAdminLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-900">
                <span className="loading loading-spinner loading-lg text-indigo-500"></span>
            </div>
        );
    }

    // ইউজার যদি লগইন থাকে এবং সে যদি অ্যাডমিন হয়, তবেই পেজটি দেখাবে
    if (user && isAdmin) {
        return children;
    }

    // অ্যাডমিন না হলে তাকে লগইন পেজে পাঠিয়ে দেবে
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;