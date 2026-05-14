const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        
        const newUser = { name, email, role: "student" };

        createUser(email, password)
            .then(() => {
                // ১. আগে SweetAlert দেখাবো, কারণ Firebase-এ একাউন্ট খোলা সফল!
                Swal.fire({
                    title: 'Success!',
                    text: 'Your account has been created successfully ✅',
                    icon: 'success',
                    background: '#111827',
                    color: '#fff',
                    confirmButtonColor: '#4F46E5',
                    confirmButtonText: 'Continue to Home'
                }).then((result) => {
                    if (result.isConfirmed) {
                        form.reset();
                        navigate('/'); // রেজিস্ট্রেশন শেষে সরাসরি হোমে নিয়ে যাবে
                    }
                });

                // ২. ডাটাবেসে পাঠানোর কাজটা পেছনে চলতে থাকবে, পপ-আপ আটকাবে না
                fetch('https://shafiq-portfolio-server.vercel.app/users', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(newUser)
                })
                .then(res => res.json())
                .then(data => console.log("DB save success:", data))
                .catch(error => console.error("DB save error:", error));

            })
            .catch(error => {
                // কোনো ভুল হলে (যেমন ইমেইল ডুপ্লিকেট) এই লাল পপ-আপটি আসবে
                Swal.fire({
                    title: 'Registration Failed',
                    text: error.message,
                    icon: 'error',
                    background: '#111827',
                    color: '#fff',
                    confirmButtonColor: '#EF4444'
                });
            });
    };import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; 

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        
        // আপনার যে ইমেইলটিকে অ্যাডমিন বানাতে চান, সেটি নিচের "your.email@gmail.com" এর জায়গায় লিখুন
let userRole = "user";
if (email === "shafiqsuzon1@gmail.com") {
    userRole = "admin";
}

const newUser = { name, email, role: userRole };

        createUser(email, password)
            .then(() => {
                // ১. আগে SweetAlert দেখাবো, কারণ Firebase-এ একাউন্ট খোলা সফল!
                Swal.fire({
                    title: 'Success!',
                    text: 'Your account has been created successfully ✅',
                    icon: 'success',
                    background: '#111827',
                    color: '#fff',
                    confirmButtonColor: '#4F46E5',
                    confirmButtonText: 'Continue to Login'
                }).then((result) => {
                    if (result.isConfirmed) {
                        form.reset();
                        navigate('/login'); 
                    }
                });

                // ২. ডাটাবেসে পাঠানোর কাজটা পেছনে চলতে থাকবে, পপ-আপ আটকাবে না
                fetch('https://shafiq-portfolio-server.vercel.app/users', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(newUser)
                })
                .then(res => res.json())
                .then(data => console.log("DB save success:", data))
                .catch(error => console.error("DB save error:", error));

            })
            .catch(error => {
                // কোনো ভুল হলে এই লাল পপ-আপটি আসবে
                Swal.fire({
                    title: 'Registration Failed',
                    text: error.message,
                    icon: 'error',
                    background: '#111827',
                    color: '#fff',
                    confirmButtonColor: '#EF4444'
                });
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4 font-sans">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl w-full max-w-md">
                <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Join Us
                </h2>
                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-300 ml-1">Full Name</label>
                        <input name="name" type="text" placeholder="Enter your name" required className="w-full px-5 py-3 bg-gray-800/40 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-300 ml-1">Email Address</label>
                        <input name="email" type="email" placeholder="name@company.com" required className="w-full px-5 py-3 bg-gray-800/40 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-300 ml-1">Password</label>
                        <input name="password" type="password" placeholder="••••••••" required className="w-full px-5 py-3 bg-gray-800/40 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300" />
                    </div>
                    <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-500/25">
                        Create Account
                    </button>
                </form>
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-400">
                        Already have an account? 
                        <button onClick={() => navigate('/login')} className="ml-2 text-blue-400 hover:text-blue-300 font-bold underline-offset-4 hover:underline transition-all">
                            Log in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;