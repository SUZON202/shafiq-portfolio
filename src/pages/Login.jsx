import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2'; 

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/dashboard";

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        // Firebase Login Function Call
        signIn(email, password)
            .then((result) => {
                const user = result.user;
                console.log("Logged In Successfully:", user);
                
                // সফল লগইনের জন্য SweetAlert
                Swal.fire({
                    title: 'Welcome Back!',
                    text: 'Login Successful!',
                    icon: 'success',
                    background: '#1f2937', 
                    color: '#ffffff', 
                    confirmButtonColor: '#2563eb', 
                    confirmButtonText: 'Go to Dashboard'
                }).then((result) => {
                    if (result.isConfirmed || result.isDismissed) {
                        navigate(from, { replace: true });
                    }
                });
            })
            .catch((error) => {
                console.error("Login Error:", error.message);
                
                // এরর মেসেজের জন্য SweetAlert
                Swal.fire({
                    title: 'Login Failed!',
                    text: error.message,
                    icon: 'error',
                    background: '#1f2937',
                    color: '#ffffff',
                    confirmButtonColor: '#dc2626',
                    confirmButtonText: 'Try Again'
                });
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">Welcome Back</h2>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            placeholder="example@email.com" 
                            className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-white placeholder-gray-400 transition-all"
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">Password</label>
                        <input 
                            type="password" 
                            name="password"
                            placeholder="••••••••" 
                            className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-white placeholder-gray-400 transition-all"
                            required 
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 transition duration-300 rounded-lg text-white font-semibold shadow-lg tracking-wide"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-300">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-400 hover:text-blue-300 hover:underline font-medium transition-colors">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;