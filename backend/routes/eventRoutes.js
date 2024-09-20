const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Event = require("../models/Event");
// const { upload } = require("../controllers/eventController");
const {
  rsvpEvent,
  getRsvpStatus,
  getUserEvents,
} = require("../controllers/eventController");
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const multer = require("multer");

// router.post("/", authMiddleware, createEvent);
// router.post("/create", authMiddleware, upload.single("image"), createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

// Multer setup to handle file uploads (images)
const storage = multer.memoryStorage(); // You can set up disk storage if needed
const upload = multer({ storage: storage });

// Create Event Route
router.post(
  "/create",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, description, date, location, maxAttendees } = req.body;
      const event = new Event({
        title,
        description,
        date,
        location,
        maxAttendees,
        creator: req.user._id, // Get user from token
        imageUrl: req.file ? req.file.path : "", // You can also upload the image to a cloud storage service
      });
      await event.save();
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to create event." });
    }
  }
);

// Fetch Events Created by User (My Events)
router.get("/my-events", authMiddleware, async (req, res) => {
  try {
    const events = await Event.find({ creator: req.user._id });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

// Delete Event
router.delete("/:id/delete", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      creator: req.user._id,
    });
    if (!event) return res.status(404).json({ error: "Event not found." });
    res.status(200).json({ message: "Event deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event." });
  }
});

// RSVP to event
router.post("/:id/rsvp", authMiddleware, rsvpEvent);

// Get RSVP status for an event
router.get("/:id/rsvp-status", authMiddleware, getRsvpStatus);

// Route to get all events created by the current user
// router.get("/my-events", authMiddleware, getUserEvents);

// Edit event
router.patch("/:id/edit", authMiddleware, editEvent);

// Delete event
// router.delete("/:id/delete", authMiddleware, deleteEvent);

module.exports = router;
