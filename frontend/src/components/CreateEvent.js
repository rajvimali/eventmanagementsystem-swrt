import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    maxAttendees: 0,
  });

  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file (event image)
  const navigate = useNavigate();

  // Handle form data change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Get the selected file
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const eventData = new FormData(); // Create a FormData object to handle file and text data
    eventData.append('title', formData.title);
    eventData.append('description', formData.description);
    eventData.append('date', formData.date);
    eventData.append('location', formData.location);
    eventData.append('maxAttendees', formData.maxAttendees);
    if (selectedFile) {
      eventData.append('eventImage', selectedFile); // Append the selected file to the FormData
    }

    try {
      const token = localStorage.getItem('token'); // Get token from localStorage

      const res = await API.post('/events', eventData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for sending files
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      });

      if (res.status === 200) {
        navigate('/'); // Redirect to home after successful event creation
      } else {
        console.error('Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">Create New Event</h2>

      <div>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
        />
      </div>

      <div>
        <input
          type="text"
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
        />
      </div>

      <div>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
        />
      </div>

      <div>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
        />
      </div>

      <div>
        <input
          type="number"
          name="maxAttendees"
          placeholder="Max Attendees"
          value={formData.maxAttendees}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
        />
      </div>

      {/* File Input for Event Image */}
      <div>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Event
        </button>
      </div>
    </form>
  );
};

export default CreateEvent;
