import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageProjects = () => {
    // ডাটাবেস থেকে সব প্রজেক্ট নিয়ে আসা
    const { data: projects = [], refetch } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/projects');
            return res.json();
        }
    });

    // প্রজেক্ট ডিলিট করার ফাংশন
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#7c3aed",
            cancelButtonColor: "#f87171",
            confirmButtonText: "Yes, delete it!",
            background: '#13131e',
            color: '#fff'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch(`http://localhost:5000/projects/${id}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('access-token')}`
                    }
                });
                const data = await res.json();
                if (data.deletedCount > 0) {
                    refetch(); // লিস্ট আপডেট করা
                    Swal.fire({
                        title: "Deleted!",
                        text: "Project has been deleted.",
                        icon: "success",
                        background: '#13131e',
                        color: '#fff'
                    });
                }
            }
        });
    };

    return (
        <div className="manage-projects-root">
            <style>{`
                .mp-container { background: #13131e; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 14px; padding: 25px; }
                .mp-title { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 20px; }
                .mp-table { width: 100%; border-collapse: collapse; color: rgba(255,255,255,0.7); }
                .mp-table th { text-align: left; padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13px; color: rgba(255,255,255,0.3); text-transform: uppercase; }
                .mp-table td { padding: 15px 12px; border-bottom: 1px solid rgba(255,255,255,0.03); font-size: 14px; }
                .mp-img { width: 45px; height: 45px; border-radius: 8px; object-fit: cover; background: #222; }
                .del-btn { background: rgba(248, 113, 113, 0.1); color: #f87171; border: 1px solid rgba(248, 113, 113, 0.2); padding: 6px 12px; border-radius: 6px; cursor: pointer; transition: 0.3s; }
                .del-btn:hover { background: #f87171; color: #fff; }
            `}</style>

            <div className="mp-container">
                <h2 className="mp-title">Manage Your Projects ({projects.length})</h2>
                <div style={{ overflowX: 'auto' }}>
                    <table className="mp-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project._id}>
                                    <td><img src={project.image} alt="" className="mp-img" /></td>
                                    <td style={{ color: '#fff', fontWeight: '500' }}>{project.title}</td>
                                    <td>{project.category}</td>
                                    <td>
                                        <button onClick={() => handleDelete(project._id)} className="del-btn">
                                            <i className="ti ti-trash"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageProjects;