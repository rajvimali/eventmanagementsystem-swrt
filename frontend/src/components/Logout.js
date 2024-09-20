import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Redirect to login page after 2 seconds
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl font-bold text-indigo-600 mb-4">
        You have been logged out.
      </h2>
      <p className="text-lg text-gray-600">Redirecting to the login page...</p>
      <div className="mt-6 animate-pulse">
        <svg
          className="w-10 h-10 text-indigo-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m-2-1v1m2 0h-2"
          />
        </svg>
      </div>
    </div>
  );
};

export default Logout;
