const Event = require("../models/Event");
const multer = require("multer");
const path = require("path");
const admin = require("../firebaseAdmin");

// Update Event and Notify Users
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.events.findOne({
      _id: req.params.id,
      creator: req.user._id,
    });
    if (!event) return res.status(404).send({ error: "Event not found" });

    Object.assign(event, req.body);
    await event.save();

    // Notify all users who have RSVP'd to the event
    const registrationTokens = event.attendees.map((user) => user.fcmToken);
    if (registrationTokens.length > 0) {
      const message = {
        notification: {
          title: "Event Updated",
          body: `The event "${event.title}" has been updated.`,
        },
        tokens: registrationTokens,
      };
      await admin.messaging().sendMulticast(message);
    }

    res.status(200).send(event);
  } catch (error) {
    res.status(400).send({ error: "Failed to update event" });
  }
};

// Notify when Event is Approaching
exports.notifyUpcomingEvents = async () => {
  const events = await Event.find({
    date: {
      $gte: new Date(),
      $lte: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
  });

  events.forEach(async (event) => {
    const registrationTokens = event.attendees.map((user) => user.fcmToken);
    if (registrationTokens.length > 0) {
      const message = {
        notification: {
          title: "Event Reminder",
          body: `The event "${event.title}" is happening soon!`,
        },
        tokens: registrationTokens,
      };
      await admin.messaging().sendMulticast(message);
    }
  });
};

// RSVP to an Event
exports.rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    // Check if the event is full
    if (event.attendees.length >= event.maxAttendees) {
      return res.status(400).send({ error: "Event is full" });
    }

    // Check if the user has already RSVP'd
    if (event.attendees.includes(req.user._id)) {
      return res
        .status(400)
        .send({ error: "You have already RSVP'd for this event" });
    }

    // Add user to attendees list
    event.attendees.push(req.user._id);
    await event.save();

    res.status(200).send({ message: "RSVP successful", event });
  } catch (error) {
    res.status(400).send({ error: "Failed to RSVP" });
  }
};

// Get RSVP Status for a User
exports.getRsvpStatus = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const isAttending = event.attendees.includes(req.user._id);
    res.status(200).send({ attending: isAttending });
  } catch (error) {
    res.status(400).send({ error: "Failed to get RSVP status" });
  }
};

// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory to store images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the image
  },
});

// File Filter to check file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location, maxAttendees } = req.body;
    const event = new Event({
      title,
      description,
      date,
      location,
      maxAttendees,
      imageUrl: req.file ? req.file.path : null, // Store image path
      creator: req.user._id,
    });

    await event.save();
    res.json(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.updateEvent = async (req, res) => {
  const { title, description, date, location, maxAttendees } = req.body;

  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.creator.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    event.title = title;
    event.description = description;
    event.date = date;
    event.location = location;
    event.maxAttendees = maxAttendees;

    await event.save();
    res.json(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get Events Created by the User
exports.getUserEvents = async (req, res) => {
  try {
    const events = await Event.find({ creator: req.user._id });
    if (!events.length) {
      return res
        .status(404)
        .json({ message: "No events found for this user." });
    }
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Error fetching events." });
  }
};

// Edit Event
exports.editEvent = async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.params.id,
      creator: req.user._id,
    });
    if (!event)
      return res
        .status(404)
        .send({ error: "Event not found or you are not authorized" });

    Object.assign(event, req.body); // Update event fields
    await event.save();
    res.status(200).send(event);
  } catch (error) {
    res.status(400).send({ error: "Error editing event" });
  }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      creator: req.user._id,
    });
    if (!event)
      return res
        .status(404)
        .send({ error: "Event not found or you are not authorized" });

    res.status(200).send({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(400).send({ error: "Error deleting event" });
  }
};
