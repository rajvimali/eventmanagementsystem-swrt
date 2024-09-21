import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MyEvents from './pages/MyEvents'; // Import the new page
import CreateEventPage from './pages/CreateEventPage';
import Login from './components/Login';
import Register from './components/Register';
import EventDetail from './components/EventDetail';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/my-events" element={<MyEvents />} /> {/* New route for My Events */}
        <Route path="/events/:id" element={<EventDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
