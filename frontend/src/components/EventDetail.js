import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [rsvpStatus, setRsvpStatus] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await axios.get(`http://localhost:5000/api/events/${id}`);
      setEvent(res.data);
    };

    const fetchRsvpStatus = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/events/${id}/rsvp-status`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setRsvpStatus(res.data.attending);
    };

    fetchEvent();
    fetchRsvpStatus();
  }, [id]);

  const handleRsvp = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/events/${id}/rsvp`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMessage("RSVP Successful!");
      setRsvpStatus(true);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-bold text-indigo-600 mb-6">{event.title}</h2>
      <div className="space-y-4">
        <p className="text-gray-700 text-lg">{event.description}</p>
        <p className="text-gray-600">
          <span className="font-semibold">Date:</span>{" "}
          {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Location:</span> {event.location}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Max Attendees:</span>{" "}
          {event.maxAttendees}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Current Attendees:</span>{" "}
          {event.attendees ? event.attendees.length : 0}
        </p>

        {!rsvpStatus ? (
          <button
            onClick={handleRsvp}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            RSVP to this event
          </button>
        ) : (
          <p className="text-green-600 font-semibold">
            You have already RSVP'd!
          </p>
        )}

        {message && <p className="text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default EventDetail;
