import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', formData);
      if (res.status === 200 && res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('name', res.data.name); // Store the user's name
        navigate('/');
      } else {
        console.error('Failed to log in');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 max-w-md w-full space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </div>

        <p className="text-center text-gray-500">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
