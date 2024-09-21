import React, { useState, useEffect } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isRSVPed, setIsRSVPed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Check if the user is logged in
  const navigate = useNavigate(); // Navigate to login page if not logged in

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/events/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    fetchEvent();
  }, [id]);

  // Check if the user is logged in by checking the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // Set logged-in state
    } else {
      setIsLoggedIn(false); // Not logged in
    }
  }, []);

  const handleRSVP = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.post(
        `/events/${id}/rsvp`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        setIsRSVPed(true); // Mark RSVP as successful
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to RSVP");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to login page if not logged in
  };

  if (!event) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          {event.title}
        </h2>

        <p className="text-gray-700 text-lg mb-4">{event.description}</p>

        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="mb-2 md:mb-0">
            <p className="text-gray-600">
              <span className="font-bold">Date:</span>{" "}
              {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <span className="font-bold">Location:</span> {event.location}
            </p>
          </div>
        </div>

        <div className="text-center mb-4">
          <p className="text-gray-600">
            <span className="font-bold">Max Attendees:</span>{" "}
            {event.maxAttendees}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Current Attendees:</span>{" "}
            {event.attendees ? event.attendees.length : 0}
          </p>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        <div className="text-center">
          {isLoggedIn ? (
            // Show RSVP button only if the user is logged in
            !isRSVPed && event.attendees?.length < event.maxAttendees ? (
              <button
                onClick={handleRSVP}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
              >
                Book your Spots!
              </button>
            ) : (
              <p className="text-gray-500">
                You have RSVP’d for this event or it's full.
              </p>
            )
          ) : (
            // Show login button if the user is not logged in
            <button
              onClick={handleLoginRedirect}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Login to APP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
