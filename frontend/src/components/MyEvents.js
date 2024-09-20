import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

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
        console.error(
          "Failed to fetch events:",
          error.response ? error.response.data : error.message
        );
      }
    };
    fetchMyEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`/api/events/${eventId}/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEvents(events.filter((event) => event._id !== eventId)); // Remove deleted event from UI
    } catch (error) {
      console.error(
        "Error deleting event:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-4xl font-bold text-center mb-10 text-indigo-600">
        My Events
      </h2>

      {/* Navigation Links */}
      <div className="mb-8 text-center">
        <ul className="inline-flex space-x-6">
          <li>
            <a href="/" className="text-blue-500 hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/logout" className="text-blue-500 hover:underline">
              Logout
            </a>
          </li>
          <li>
            <a href="/create" className="text-blue-500 hover:underline">
              Create Event
            </a>
          </li>
        </ul>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.length ? (
          events.map((event) => (
            <div
              key={event._id}
              className="bg-white border p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-2xl font-semibold text-indigo-600 mb-2">
                {event.title}
              </h3>
              <p className="text-gray-700 mb-2">{event.description}</p>
              <p className="text-gray-600">
                Date: {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600">Location: {event.location}</p>
              <p className="text-gray-600">
                Max Attendees: {event.maxAttendees}
              </p>
              <p className="text-gray-600">
                Attendees: {event.attendees.length}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(`/edit-event/${event._id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">
            No events found. Create a new event.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
