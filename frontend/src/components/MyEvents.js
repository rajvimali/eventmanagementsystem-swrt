import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch the events created by the logged-in user
  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await axios.get("/api/events/my-events", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEvents(res.data);
      } catch (error) {
        console.error("Failed to fetch events:", error.response.data);
      }
    };
    fetchMyEvents();
  }, []);

  // Handle event deletion
  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`/api/events/${eventId}/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Failed to delete event:", error.response.data);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        My Events
      </h2>

      {/* Navigation Links */}
      <div className="mb-8 flex justify-center space-x-6 text-indigo-600">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/create" className="hover:underline">
          Create Event
        </a>
        <a href="/logout" className="hover:underline">
          Logout
        </a>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-2">{event.description}</p>
                <p className="text-gray-500 mb-1">
                  Date: {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-gray-500 mb-2">Location: {event.location}</p>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(`/edit-event/${event._id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-3">
            No events found. Create your first event!
          </p>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
