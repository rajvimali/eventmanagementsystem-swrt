import React from 'react';
import CreateEvent from '../components/CreateEvent';

const CreateEventPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Create New Event
      </h1>
      <CreateEvent />
    </div>
  );
};

export default CreateEventPage;
