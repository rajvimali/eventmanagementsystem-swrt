import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    maxAttendees: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/api/events/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setEvent(res.data);
      } catch (error) {
        console.error(
          "Failed to load event:",
          error.response ? error.response.data : error.message
        );
      }
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/events/${id}/edit`, event, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      navigate("/my-events"); // Redirect to My Events after successful edit
    } catch (error) {
      console.error(
        "Failed to edit event:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
        Edit Event
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Event Title
          </label>
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleChange}
            placeholder="Event Title"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={event.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Max Attendees
          </label>
          <input
            type="number"
            name="maxAttendees"
            value={event.maxAttendees}
            onChange={handleChange}
            placeholder="Max Attendees"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
