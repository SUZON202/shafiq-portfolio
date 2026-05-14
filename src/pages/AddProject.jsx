import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddProject = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        // প্রজেক্টের ডাটা গুছিয়ে নেওয়া
        const projectItem = {
            title: data.title,
            category: data.category,
            description: data.description,
            image: data.image,
            liveLink: data.liveLink,
            githubLink: data.githubLink,
            technologies: data.tech.split(',').map(item => item.trim()), // কমা দিয়ে আলাদা করা টেকনোলজি
            date: new Date().toLocaleDateString()
        };

        // ব্যাকএন্ডে ডাটা পাঠানো (টোকেনসহ)
        const res = await fetch('https://shafiq-portfolio-server.vercel.app/projects', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('access-token')}`
            },
            body: JSON.stringify(projectItem)
        });

        const result = await res.json();
        if (result.insertedId) {
            reset(); // ফরম খালি করা
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Project added successfully! 🚀",
                showConfirmButton: false,
                timer: 1500,
                background: '#13131e',
                color: '#fff'
            });
        }
    };

    return (
        <div className="add-project-root">
            <style>{`
                .add-project-container { background: #13131e; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 14px; padding: 30px; max-width: 800px; margin: 0 auto; }
                .ap-title { font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 10px; }
                .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 15px; }
                .form-group.full { grid-column: span 2; }
                label { font-size: 13px; color: rgba(255,255,255,0.5); font-weight: 500; }
                input, textarea, select { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 12px; color: #fff; font-size: 14px; outline: none; transition: 0.3s; }
                input:focus, textarea:focus { border-color: #7c3aed; background: rgba(124,58,237,0.05); }
                .ap-btn { background: #7c3aed; color: #fff; border: none; padding: 14px; border-radius: 9px; font-weight: 600; cursor: pointer; margin-top: 10px; transition: 0.3s; }
                .ap-btn:hover { background: #6d28d9; transform: translateY(-2px); }
                @media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } .form-group.full { grid-column: span 1; } }
            `}</style>

            <div className="add-project-container">
                <h2 className="ap-title">Add New Project</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Project Title</label>
                            <input {...register("title", { required: true })} placeholder="e.g. E-commerce Website" />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select {...register("category", { required: true })}>
                                <option value="Web Development">Web Development</option>
                                <option value="MERN Stack">MERN Stack</option>
                                <option value="UI/UX Design">UI/UX Design</option>
                                <option value="Mobile App">Mobile App</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Image URL</label>
                            <input {...register("image", { required: true })} placeholder="Direct link to project image" />
                        </div>
                        <div className="form-group">
                            <label>Technologies (Comma separated)</label>
                            <input {...register("tech", { required: true })} placeholder="React, Node, MongoDB, Tailwind" />
                        </div>
                        <div className="form-group">
                            <label>Live Link</label>
                            <input {...register("liveLink", { required: true })} placeholder="https://..." />
                        </div>
                        <div className="form-group">
                            <label>Github Link</label>
                            <input {...register("githubLink", { required: true })} placeholder="https://github.com/..." />
                        </div>
                        <div className="form-group full">
                            <label>Project Description</label>
                            <textarea {...register("description", { required: true })} rows="4" placeholder="Tell something about the project..."></textarea>
                        </div>
                    </div>
                    <button type="submit" className="ap-btn">Upload Project to Portfolio</button>
                </form>
            </div>
        </div>
    );
};

export default AddProject;