import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-6 font-sans">
            <div className="text-center max-w-lg">

                {/* Big Animated 404 Text */}
                <h1 className="text-9xl font-black text-primary mb-2 drop-shadow-xl animate-bounce">
                    404
                </h1>

                {/* Error Message */}
                <h2 className="text-4xl lg:text-5xl font-extrabold text-base-content mb-6 tracking-tight">
                    Oops! Page Not Found.
                </h2>

                <p className="text-lg text-base-content/70 mb-10 leading-relaxed">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                    {/* React Router Link to go back to Home */}
                    <Link
                        to="/"
                        className="btn btn-primary px-10 btn-lg text-white text-lg rounded-full shadow-md hover:scale-105 transition-transform"
                    >
                        Go Back Home
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ErrorPage;