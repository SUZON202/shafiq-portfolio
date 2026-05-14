import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Users = () => {
    // ১. ডাটা নিয়ে আসার সময় চাবি (Token) পাঠানো হচ্ছে
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://shafiq-portfolio-server.vercel.app/users', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            });
            return res.json();
        }
    });

    // ২. অ্যাডমিন বানানোর সময় চাবি পাঠানো হচ্ছে
    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Make Admin?",
            text: `Are you sure you want to make ${user.name || user.email} an Admin?`,
            icon: "question",
            showCancelButton: true,
            background: '#13131e',
            color: '#fff',
            confirmButtonColor: '#7c3aed',
            cancelButtonColor: '#f87171',
            confirmButtonText: 'Yes, make admin!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://shafiq-portfolio-server.vercel.app/users/admin/${user._id}`, {
                    method: 'PATCH',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('access-token')}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        Swal.fire({
                            title: 'Success!',
                            text: `${user.name || user.email} is an Admin Now! 🚀`,
                            icon: 'success',
                            background: '#13131e',
                            color: '#fff',
                            confirmButtonColor: '#7c3aed'
                        });
                        refetch();
                    }
                });
            }
        });
    };

    // ৩. ডিলিট করার সময় চাবি পাঠানো হচ্ছে
    const handleDelete = (user) => {
        Swal.fire({
            title: 'Delete User?',
            text: `Are you sure you want to delete ${user.name || user.email}?`,
            icon: 'warning',
            showCancelButton: true,
            background: '#13131e',
            color: '#fff',
            confirmButtonColor: '#f87171',
            cancelButtonColor: '#7c3aed',
            confirmButtonText: 'Yes, delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://shafiq-portfolio-server.vercel.app/users/${user._id}`, {
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
                            text: 'User has been deleted successfully.',
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

    if (isLoading) {
        return <div className="text-white text-center mt-10">Loading users...</div>;
    }

    // ইউজারদের দুই ভাগে ভাগ করা হচ্ছে
    const admins = users.filter(user => user.role === 'admin');
    const regularUsers = users.filter(user => user.role !== 'admin');

    return (
        <>
            <style>{`
                .us-container { background: #13131e; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 14px; padding: 24px; margin-top: 20px; }
                .us-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
                .us-title { font-size: 18px; font-weight: 700; color: #fff; }
                .us-subtitle { font-size: 13px; color: rgba(255, 255, 255, 0.4); margin-top: 4px; }
                .us-table-wrapper { overflow-x: auto; }
                .us-table { width: 100%; border-collapse: collapse; text-align: left; }
                .us-th { padding: 14px 16px; font-size: 12px; font-weight: 600; color: rgba(255, 255, 255, 0.3); text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
                .us-td { padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.03); color: rgba(255, 255, 255, 0.7); font-size: 14px; }
                .us-tr:last-child .us-td { border-bottom: none; }
                .us-user-info { display: flex; align-items: center; gap: 12px; }
                .us-avatar { width: 36px; height: 36px; border-radius: 10px; background: rgba(124, 58, 237, 0.15); color: #a78bfa; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; }
                .us-role-badge { padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; display: inline-block; }
                .role-admin { background: rgba(74, 222, 128, 0.1); color: #4ade80; }
                .role-user { background: rgba(255, 255, 255, 0.05); color: rgba(255, 255, 255, 0.5); }
                .us-action-btn { background: none; border: none; cursor: pointer; padding: 6px 10px; border-radius: 6px; transition: all 0.2s; font-size: 16px; }
                .btn-admin { color: #7c3aed; background: rgba(124, 58, 237, 0.1); margin-right: 8px; }
                .btn-admin:hover { background: #7c3aed; color: #fff; }
                .btn-delete { color: #f87171; background: rgba(248, 113, 113, 0.1); }
                .btn-delete:hover { background: #f87171; color: #fff; }
                .admin-crown { color: #fbbf24; margin-right: 8px; }
            `}</style>

            <div>
                {/* =========================================
                                ADMIN SECTION 
                ========================================= */}
                <div className="us-container" style={{ borderColor: 'rgba(124, 58, 237, 0.3)', boxShadow: '0 4px 20px rgba(124, 58, 237, 0.05)' }}>
                    <div className="us-header">
                        <div>
                            <div className="us-title"><i className="ti ti-crown admin-crown"></i>Super Admins</div>
                            <div className="us-subtitle">{admins.length} admins managing the dashboard</div>
                        </div>
                    </div>

                    <div className="us-table-wrapper">
                        <table className="us-table">
                            <thead>
                                <tr>
                                    <th className="us-th">Admin</th>
                                    <th className="us-th">Email</th>
                                    <th className="us-th">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.map((admin) => (
                                    <tr key={admin._id} className="us-tr">
                                        <td className="us-td">
                                            <div className="us-user-info">
                                                <div className="us-avatar" style={{ background: 'rgba(74, 222, 128, 0.15)', color: '#4ade80' }}>
                                                    {admin?.name?.[0]?.toUpperCase() || admin?.email?.[0]?.toUpperCase() || 'A'}
                                                </div>
                                                <span style={{ fontWeight: 500, color: '#fff' }}>
                                                    {admin?.name || "No Name"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="us-td">{admin?.email}</td>
                                        <td className="us-td">
                                            <span className="us-role-badge role-admin">Super Admin</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* =========================================
                                USER SECTION 
                ========================================= */}
                <div className="us-container">
                    <div className="us-header">
                        <div>
                            <div className="us-title">Regular Users</div>
                            <div className="us-subtitle">Total {regularUsers.length} users registered</div>
                        </div>
                    </div>

                    <div className="us-table-wrapper">
                        <table className="us-table">
                            <thead>
                                <tr>
                                    <th className="us-th">User</th>
                                    <th className="us-th">Email</th>
                                    <th className="us-th">Role</th>
                                    <th className="us-th" style={{ textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {regularUsers.map((user) => (
                                    <tr key={user._id} className="us-tr">
                                        <td className="us-td">
                                            <div className="us-user-info">
                                                <div className="us-avatar">
                                                    {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                                                </div>
                                                <span style={{ fontWeight: 500, color: '#fff' }}>
                                                    {user?.name || "No Name"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="us-td">{user?.email}</td>
                                        <td className="us-td">
                                            <span className="us-role-badge role-user">User</span>
                                        </td>
                                        <td className="us-td" style={{ textAlign: 'right' }}>
                                            <button 
                                                onClick={() => handleMakeAdmin(user)} 
                                                className="us-action-btn btn-admin"
                                                title="Make Admin"
                                            >
                                                <i className="ti ti-user-check"></i>
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(user)} 
                                                className="us-action-btn btn-delete"
                                                title="Delete User"
                                            >
                                                <i className="ti ti-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {regularUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="us-td" style={{ textAlign: 'center', padding: '30px' }}>
                                            No regular users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Users;