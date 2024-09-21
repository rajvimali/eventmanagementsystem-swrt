import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Check if the user is logged in and get the user's name
  const isLoggedIn = !!localStorage.getItem('token');

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('name');  // Remove name from localStorage
    navigate('/login'); // Navigate to login page
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Event Management</h1>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
          {isLoggedIn && (
            <>
              <li><Link to="/create-event" className="text-white hover:text-gray-300">Create Event</Link></li>
              <li><Link to="/my-events" className="text-white hover:text-gray-300">My Events</Link></li>
            </>
          )}
          {!isLoggedIn ? (
            <>
              <li><Link to="/login" className="text-white hover:text-gray-300">Login</Link></li>
              <li><Link to="/register" className="text-white hover:text-gray-300">Register</Link></li>
            </>
          ) : (
            <>
              
              <li><button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
