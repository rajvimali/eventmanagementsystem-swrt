import React, { useState, useEffect } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    maxAttendees: 0,
  });

  const navigate = useNavigate();

  // Fetch events created by the logged-in user
  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/events/my-events', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(res.data);
      } catch (error) {
        console.error('Error fetching user events:', error);
      }
    };

    fetchMyEvents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: new Date(event.date).toISOString().split('T')[0],
      location: event.location,
      maxAttendees: event.maxAttendees,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await API.put(`/events/${editingEvent._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents((prevEvents) =>
        prevEvents.map((ev) => (ev._id === res.data._id ? res.data : ev))
      );
      setEditingEvent(null);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const token = localStorage.getItem('token');
        await API.delete(`/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents((prevEvents) => prevEvents.filter((ev) => ev._id !== id));
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">My Created Events</h2>
      {editingEvent ? (
        <form onSubmit={handleUpdate} className="space-y-4 bg-white p-6 shadow-md rounded-md">
          <h3 className="text-xl font-bold mb-4">Edit Event</h3>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            name="maxAttendees"
            placeholder="Max Attendees"
            value={formData.maxAttendees}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Update Event
          </button>
          <button
            type="button"
            onClick={() => setEditingEvent(null)}
            className="w-full bg-gray-500 text-white py-2 mt-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event._id} className="bg-white p-6 shadow-md rounded-md">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-700 mb-2">{event.description}</p>
                  <p className="text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p className="text-gray-600">Location: {event.location}</p>
                  <button
                    onClick={() => handleEdit(event)}
                    className="text-blue-600 hover:text-blue-700 mt-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="text-red-600 hover:text-red-700 mt-4 ml-4"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>You have not created any events yet.</p>
          )}
        </>
      )}
    </div>
  );
};

export default MyEvents;
