import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      console.log("User registered:", res.data);
    } catch (error) {
      console.error("Error during registration:", error.response.data);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-bold text-center text-indigo-600 mb-6">
        Register
      </h2>

      {/* Navigation Links */}
      <div className="mb-6 text-center">
        <ul className="inline-flex space-x-6 text-indigo-600">
          <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/register" className="hover:underline">
              Register
            </a>
          </li>
          {/* <li>
            <a href="/login" className="hover:underline">
              Login
            </a>
          </li> */}
        </ul>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          <a href="/create"> Register</a>
        </button>
      </form>
    </div>
  );
};

export default Register;
