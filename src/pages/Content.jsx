import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2"; // SweetAlert ইমপোর্ট করা হলো

const Content = () => {
    // ফর্ম দেখানোর জন্য State
    const [showForm, setShowForm] = useState(false);

    // ডাটাবেস থেকে সব প্রজেক্ট নিয়ে আসার API কল
    const { data: projects = [], refetch, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/projects');
            return res.json();
        }
    });

    // নতুন প্রজেক্ট অ্যাড করার ফাংশন
    const handleAddProject = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const liveLink = form.liveLink.value;
        const githubLink = form.githubLink.value;
        const image = form.image.value;

        const newProject = { title, description, liveLink, githubLink, image };

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newProject)
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                // সাধারণ অ্যালার্টের বদলে SweetAlert
                Swal.fire({
                    title: 'Success!',
                    text: 'Project Added Successfully! 🚀',
                    icon: 'success',
                    background: '#13131e',
                    color: '#fff',
                    confirmButtonColor: '#7c3aed'
                });
                form.reset();
                setShowForm(false);
                refetch(); // ডাটা আপডেট হওয়ার পর প্রজেক্ট লিস্ট রিফ্রেশ করবে
            }
        });
    };

    // প্রজেক্ট ডিলিট করার ফাংশন
    const handleDelete = (id) => {
        // সাধারণ কনফার্মের বদলে SweetAlert কনফার্মেশন
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            background: '#13131e',
            color: '#fff',
            confirmButtonColor: '#f87171',
            cancelButtonColor: '#7c3aed',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/projects/${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your project has been deleted.',
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

    if (isLoading) {
        return <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>Loading Projects...</div>;
    }

    return (
        <>
            <style>{`
                .cp-container { margin-top: 10px; }
                .cp-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; background: #13131e; padding: 20px 24px; border-radius: 14px; border: 1px solid rgba(255, 255, 255, 0.06); }
                .cp-title { font-size: 18px; font-weight: 700; color: #fff; }
                .cp-subtitle { font-size: 13px; color: rgba(255, 255, 255, 0.4); margin-top: 4px; }
                
                .cp-add-btn { background: #7c3aed; color: white; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.3s; }
                .cp-add-btn:hover { background: #6d28d9; }
                .cp-cancel-btn { background: rgba(248, 113, 113, 0.1); color: #f87171; border: 1px solid rgba(248, 113, 113, 0.2); padding: 10px 18px; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.3s; }
                .cp-cancel-btn:hover { background: rgba(248, 113, 113, 0.2); }

                /* Form Styles */
                .cp-form-box { background: #13131e; padding: 24px; border-radius: 14px; border: 1px solid rgba(124, 58, 237, 0.3); margin-bottom: 24px; animation: slideDown 0.3s ease; }
                @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
                .cp-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
                .cp-input-group { display: flex; flex-direction: column; gap: 8px; }
                .cp-input-group.full { grid-column: 1 / -1; }
                .cp-label { font-size: 12px; color: rgba(255, 255, 255, 0.6); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
                .cp-input { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); padding: 12px 16px; border-radius: 8px; color: white; font-family: inherit; outline: none; transition: 0.3s; }
                .cp-input:focus { border-color: #7c3aed; background: rgba(255, 255, 255, 0.05); }
                textarea.cp-input { resize: vertical; min-height: 80px; }
                .cp-submit-btn { background: #7c3aed; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer; width: 100%; transition: 0.3s; margin-top: 10px; }
                .cp-submit-btn:hover { background: #6d28d9; }

                /* Projects Grid */
                .cp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
                .cp-card { background: #13131e; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 14px; overflow: hidden; position: relative; transition: 0.3s; }
                .cp-card:hover { border-color: rgba(124, 58, 237, 0.4); transform: translateY(-3px); }
                .cp-card-img { width: 100%; height: 160px; object-fit: cover; border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
                .cp-card-body { padding: 20px; }
                .cp-card-title { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 8px; }
                .cp-card-desc { font-size: 13px; color: rgba(255, 255, 255, 0.5); line-height: 1.5; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
                .cp-card-links { display: flex; gap: 10px; }
                .cp-link-btn { flex: 1; text-align: center; padding: 8px; border-radius: 6px; font-size: 12px; font-weight: 600; text-decoration: none; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 6px; }
                .cp-link-live { background: rgba(74, 222, 128, 0.1); color: #4ade80; }
                .cp-link-live:hover { background: rgba(74, 222, 128, 0.2); }
                .cp-link-git { background: rgba(255, 255, 255, 0.05); color: #fff; }
                .cp-link-git:hover { background: rgba(255, 255, 255, 0.1); }
                
                .cp-delete-btn { position: absolute; top: 12px; right: 12px; background: rgba(0, 0, 0, 0.6); color: #f87171; border: none; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s; backdrop-filter: blur(4px); }
                .cp-delete-btn:hover { background: #f87171; color: white; }
                
                @media (max-width: 600px) {
                    .cp-form-grid { grid-template-columns: 1fr; }
                }
            `}</style>

            <div className="cp-container">
                {/* Header Section */}
                <div className="cp-header">
                    <div>
                        <div className="cp-title">Project Management</div>
                        <div className="cp-subtitle">Manage your portfolio projects ({projects.length} Total)</div>
                    </div>
                    <button 
                        className={showForm ? "cp-cancel-btn" : "cp-add-btn"} 
                        onClick={() => setShowForm(!showForm)}
                    >
                        <i className={`ti ${showForm ? "ti-x" : "ti-plus"}`}></i> 
                        {showForm ? "Cancel" : "Add Project"}
                    </button>
                </div>

                {/* Add Project Form */}
                {showForm && (
                    <div className="cp-form-box">
                        <form onSubmit={handleAddProject}>
                            <div className="cp-form-grid">
                                <div className="cp-input-group">
                                    <label className="cp-label">Project Title</label>
                                    <input type="text" name="title" className="cp-input" placeholder="e.g. E-commerce Website" required />
                                </div>
                                <div className="cp-input-group">
                                    <label className="cp-label">Image URL</label>
                                    <input type="url" name="image" className="cp-input" placeholder="https://..." required />
                                </div>
                                <div className="cp-input-group">
                                    <label className="cp-label">Live Link</label>
                                    <input type="url" name="liveLink" className="cp-input" placeholder="https://..." required />
                                </div>
                                <div className="cp-input-group">
                                    <label className="cp-label">GitHub Link</label>
                                    <input type="url" name="githubLink" className="cp-input" placeholder="https://github.com/..." required />
                                </div>
                                <div className="cp-input-group full">
                                    <label className="cp-label">Short Description</label>
                                    <textarea name="description" className="cp-input" placeholder="What is this project about?" required></textarea>
                                </div>
                            </div>
                            <button type="submit" className="cp-submit-btn">Save Project</button>
                        </form>
                    </div>
                )}

                {/* Projects Grid */}
                <div className="cp-grid">
                    {projects.map((project) => (
                        <div key={project._id} className="cp-card">
                            <button onClick={() => handleDelete(project._id)} className="cp-delete-btn" title="Delete Project">
                                <i className="ti ti-trash"></i>
                            </button>
                            <img src={project.image} alt={project.title} className="cp-card-img" />
                            <div className="cp-card-body">
                                <div className="cp-card-title">{project.title}</div>
                                <div className="cp-card-desc">{project.description}</div>
                                <div className="cp-card-links">
                                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="cp-link-btn cp-link-live">
                                        <i className="ti ti-external-link"></i> Live Demo
                                    </a>
                                    <a href={project.githubLink} target="_blank" rel="noreferrer" className="cp-link-btn cp-link-git">
                                        <i className="ti ti-brand-github"></i> GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* যদি কোনো প্রজেক্ট না থাকে */}
                    {projects.length === 0 && !isLoading && (
                        <div style={{ color: "rgba(255,255,255,0.4)", gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
                            <i className="ti ti-folder-off" style={{ fontSize: "40px", marginBottom: "10px", display: "block" }}></i>
                            No projects found. Add your first project!
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Content;