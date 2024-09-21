const Event = require('../models/Event');

// Create Event
exports.createEvent = async (req, res) => {
  const { title, description, date, location, maxAttendees, eventType } = req.body;

  try {
    // Check if the file was uploaded
    const imagePath = req.file ? req.file.path : null; // Save the file path if the file is uploaded

    // Create a new event object
    const event = new Event({
      title,
      description,
      date,
      location,
      maxAttendees,
      eventType,
      creator: req.user.id, // Use the logged-in user ID as the event creator
      image: imagePath, // Store the image path in the database
    });

    // Save the event to the database
    await event.save();

    // Respond with the created event
    res.status(200).json({ message: 'Event created successfully', event });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get All Events with Filtering
exports.getAllEvents = async (req, res) => {
  try {
    const { date, location, eventType } = req.query;
    let query = {};

    // Add filters to the query if they are provided
    if (date) {
      query.date = { $gte: new Date(date) }; // Get events on or after the specified date
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' }; // Case-insensitive search for location
    }
    if (eventType) {
      query.eventType = { $regex: eventType, $options: 'i' }; // Case-insensitive search for event type
    }

    const events = await Event.find(query);
    res.status(200).json(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get a Specific Event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get Events Created by Logged-in User
exports.getEventsByUser = async (req, res) => {
  try {
    // Fetch events created by the logged-in user
    const events = await Event.find({ creator: req.user.id });
    res.status(200).json(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Update Event
exports.updateEvent = async (req, res) => {
  const { title, description, date, location, maxAttendees, eventType } = req.body;

  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Only the creator can update the event
    if (event.creator.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Update the event fields
    event.title = title;
    event.description = description;
    event.date = date;
    event.location = location;
    event.maxAttendees = maxAttendees;
    event.eventType = eventType;

    // Check if there's a new image file uploaded
    if (req.file) {
      event.image = req.file.path;
    }

    // Save the updated event
    await event.save();

    res.status(200).json({ message: 'Event updated successfully', event });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Only the creator can delete the event
    if (event.creator.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Delete the event
    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// RSVP to an Event
exports.rsvpToEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the user is already an attendee
    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({ message: 'You have already RSVP’d for this event' });
    }

    // Check if max attendees limit is reached
    if (event.attendees.length >= event.maxAttendees) {
      return res.status(400).json({ message: 'Max attendees limit reached' });
    }

    // Add the user to the attendees list
    event.attendees.push(req.user.id);
    await event.save();

    res.status(200).json({ message: 'RSVP successful', event });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
