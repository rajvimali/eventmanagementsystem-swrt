const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const { createEvent, getEventsByUser, getEventById, getAllEvents, updateEvent, deleteEvent } = require('../controllers/eventController');
const Event = require('../models/Event');
const multer = require('multer');

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Upload directory
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

// Initialize Multer upload
const upload = multer({ storage: storage });

// Route to get events created by the logged-in user (this must come before any dynamic routes like '/:id')
router.get('/my-events', authMiddleware, getEventsByUser);

// Route for creating event with file upload (use upload.single for single file upload)
router.post('/', authMiddleware, upload.single('eventImage'), createEvent);

// Route to get all events
router.get('/', getAllEvents);

// Route to get a specific event by ID
router.get('/:id', getEventById);

// Route to update an event
router.put('/:id', authMiddleware, updateEvent);

// Route to delete an event
router.delete('/:id', authMiddleware, deleteEvent);

// RSVP route
router.post('/:id/rsvp', authMiddleware, async (req, res) => {
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

    res.status(200).json({ message: 'RSVP successful' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
