import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Content = () => {
    // ডাটাবেস থেকে রিয়েল প্রজেক্ট ডাটা নিয়ে আসা হচ্ছে
    const { data: projects = [], refetch, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const res = await fetch('https://shafiq-portfolio-server.vercel.app/projects');
            return res.json();
        }
    });

    // প্রজেক্ট ডিলিট করার ফাংশন
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete Project?',
            text: "Are you sure you want to delete this project? This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            background: '#13131e',
            color: '#fff',
            confirmButtonColor: '#f87171',
            cancelButtonColor: '#7c3aed',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://shafiq-portfolio-server.vercel.app/projects/${id}`, {
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
                            text: 'Your project has been deleted successfully.',
                            icon: 'success',
                            background: '#13131e',
                            color: '#fff',
                            confirmButtonColor: '#7c3aed',
                            timer: 2000,
                            showConfirmButton: false
                        });
                        refetch(); // ডাটা আপডেট করার জন্য রিফ্রেশ
                    }
                });
            }
        });
    };

    if (isLoading) {
        return <div className="text-white text-center mt-10"><span className="loading loading-spinner text-primary"></span> Loading Projects...</div>;
    }

    return (
        <>
            <style>{`
                .cnt-container { padding: 10px 0; }
                .cnt-header { margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
                .cnt-title { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 4px; }
                .cnt-sub { font-size: 13px; color: rgba(255,255,255,0.4); }
                
                .cnt-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
                .cnt-card { background: #13131e; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; overflow: hidden; transition: all 0.3s ease; display: flex; flex-direction: column; }
                .cnt-card:hover { transform: translateY(-5px); border-color: rgba(124, 58, 237, 0.4); box-shadow: 0 10px 30px rgba(124, 58, 237, 0.1); }
                
                .cnt-img-box { height: 160px; background: rgba(255,255,255,0.02); position: relative; overflow: hidden; }
                .cnt-img { width: 100%; height: 100%; object-fit: cover; }
                .cnt-img-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.2); font-size: 40px; background: linear-gradient(45deg, #13131e, #1e1e2e); }
                
                .cnt-body { padding: 20px; flex-grow: 1; display: flex; flex-direction: column; }
                .cnt-card-title { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 8px; }
                .cnt-card-desc { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.5; margin-bottom: 16px; flex-grow: 1; }
                
                .cnt-actions { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.06); }
                .cnt-btn { padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px; }
                .cnt-btn-view { background: rgba(124, 58, 237, 0.1); color: #a78bfa; border: none; }
                .cnt-btn-view:hover { background: #7c3aed; color: #fff; }
                .cnt-btn-del { background: rgba(248, 113, 113, 0.1); color: #f87171; border: none; }
                .cnt-btn-del:hover { background: #f87171; color: #fff; }
            `}</style>

            <div className="cnt-container">
                <div className="cnt-header">
                    <div>
                        <h2 className="cnt-title">Manage Projects</h2>
                        <p className="cnt-sub">View and delete your portfolio projects ({projects.length} Total)</p>
                    </div>
                </div>

                {projects.length > 0 ? (
                    <div className="cnt-grid">
                        {projects.map((project) => (
                            <div key={project._id} className="cnt-card">
                                <div className="cnt-img-box">
                                    {project.image ? (
                                        <img src={project.image} alt={project.title} className="cnt-img" />
                                    ) : (
                                        <div className="cnt-img-placeholder"><i className="ti ti-photo"></i></div>
                                    )}
                                </div>
                                <div className="cnt-body">
                                    <h3 className="cnt-card-title">{project.title || "Untitled Project"}</h3>
                                    <p className="cnt-card-desc">
                                        {project.description 
                                            ? project.description.length > 80 
                                                ? project.description.substring(0, 80) + '...' 
                                                : project.description 
                                            : "No description provided for this project."}
                                    </p>
                                    <div className="cnt-actions">
                                        <a href={project.liveLink || "#"} target="_blank" rel="noreferrer" className="cnt-btn cnt-btn-view">
                                            <i className="ti ti-external-link"></i> Live View
                                        </a>
                                        <button onClick={() => handleDelete(project._id)} className="cnt-btn cnt-btn-del">
                                            <i className="ti ti-trash"></i> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-[#13131e] rounded-xl border border-white/5 mt-5">
                        <i className="ti ti-briefcase text-4xl text-gray-500 mb-3 block"></i>
                        <h3 className="text-white text-lg font-semibold">No Projects Found</h3>
                        <p className="text-gray-400 text-sm mt-2">You haven't added any projects to your portfolio yet.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Content;