// frontend/src/components/EventList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function EventList() {
  //   const [events, setEvents] = useState([]);

  //   useEffect(() => {
  //     const fetchEvents = async () => {
  //       const res = await axios.get("/api/events");
  //       setEvents(res.data);
  //     };
  //     fetchEvents();
  //   }, []);

  return (
    <div>
      <h2>Upcoming Events</h2>
      {/* <ul>
        {events.map((event) => (
          <li key={event._id}>
            <Link to={`/event/${event._id}`}>{event.title}</Link>
            <p>{new Date(event.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default EventList;
