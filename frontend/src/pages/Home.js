import React from 'react';
import EventList from '../components/EventList';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Welcome to Event Management
      </h1>
      <EventList />
    </div>
  );
};

export default Home;
