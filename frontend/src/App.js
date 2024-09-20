import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import EventList from "./components/EventList";
import CreateEvent from "./components/CreateEvent";
import EventDetail from "./components/EventDetail";
import Logout from "./components/Logout";
import MyEvents from "./components/MyEvents";
import EditEvent from "./components/EditEvent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
        <Route path="/event/:id" element={<EventDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
