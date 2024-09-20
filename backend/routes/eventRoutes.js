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

router.post("/", authMiddleware, createEvent);
// router.post("/create", authMiddleware, upload.single("image"), createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

// RSVP to event
router.post("/:id/rsvp", authMiddleware, rsvpEvent);

// Get RSVP status for an event
router.get("/:id/rsvp-status", authMiddleware, getRsvpStatus);

// Route to get all events created by the current user
router.get("/my-events", authMiddleware, getUserEvents);

// Edit event
router.patch("/:id/edit", authMiddleware, editEvent);

// Delete event
router.delete("/:id/delete", authMiddleware, deleteEvent);

// Get events with filters
router.get("/", async (req, res) => {
  const { date, location, eventType } = req.query;
  // Create a filter object
  let filter = {};
  if (date) filter.date = { $gte: new Date(date) }; // Upcoming events
  if (location) filter.location = location;
  if (eventType) filter.eventType = eventType;

  try {
    const events = await Event.find(filter);
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch events" });
  }
});

module.exports = router;
