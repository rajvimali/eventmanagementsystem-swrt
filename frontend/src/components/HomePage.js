import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [events, setEvents] = useState([]);

  // Fetch events when component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events"); // Change to your backend URL
        setEvents(res.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array means this runs once when component mounts

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {events.length ? (
          events.map((event) => (
            <div key={event._id} className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                {event.title}
              </h3>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              <p>{event.description}</p>
              <p>{event.location}</p>
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

export default HomePage;
