import React, { useState, useEffect } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    date: '',
    location: '',
    eventType: ''
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const query = new URLSearchParams(filters).toString(); // Convert filters to query string
        const res = await API.get(`/events?${query}`); // Send query parameters to the backend
        if (res.status === 200) {
          setEvents(res.data);
        } else {
          console.error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, [filters]);

  // Handle input change for filters
  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission to apply filters
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    // The useEffect hook will automatically trigger when filters change
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>

      {/* Filter Form */}
      <form onSubmit={handleFilterSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700">Date:</label>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Location:</label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleInputChange}
              placeholder="Enter location"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Event Type:</label>
            <input
              type="text"
              name="eventType"
              value={filters.eventType}
              onChange={handleInputChange}
              placeholder="Enter event type"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </form>

      {/* Events List */}
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white p-6 shadow-md rounded-md">
              {event.image && (
                <img
                  src={`http://localhost:5000/${event.image}`}
                  alt={event.title}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
              )}
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p className="text-gray-700 mb-2">{event.description}</p>
              <p className="text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-600">Location: {event.location}</p>
              <p className="text-gray-600">Event Type: {event.eventType}</p>
              <Link
                to={`/events/${event._id}`}
                className="inline-block mt-4 text-blue-600 hover:text-blue-700"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No events found</p>
      )}
    </div>
  );
};

export default EventList;
