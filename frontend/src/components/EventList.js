import React, { useEffect, useState } from "react";
import axios from "axios";

function EventList() {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    location: "",
    eventType: "",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get("/api/events");
      setEvents(res.data);
    };
    fetchEvents();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-bold text-center mb-10 text-indigo-600">
        Upcoming Events
      </h2>

      {/* Navigation Links */}
      <div className="mb-8 flex justify-center space-x-6 text-indigo-600">
        <a href="/" className="hover:underline">
          Home
        </a>
        {/* <a href="/register" className="hover:underline">
          Register
        </a> */}
        <a href="/login" className="hover:underline">
          Login
        </a>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            placeholder="Filter by date"
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            placeholder="Filter by location"
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <select
            name="eventType"
            value={filters.eventType}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Event Types</option>
            <option value="conference">Conference</option>
            <option value="workshop">Workshop</option>
            <option value="webinar">Webinar</option>
          </select>
        </div>
      </div>

      {/* Event List */}
      <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {events.map((event) => (
          <li
            key={event._id}
            className="bg-white shadow-md rounded-lg p-6 transition duration-300 hover:shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-indigo-600 mb-2">
              {event.title}
            </h3>
            <p className="text-gray-500">
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700">{event.location}</p>
            <p className="text-gray-600">{event.eventType}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
