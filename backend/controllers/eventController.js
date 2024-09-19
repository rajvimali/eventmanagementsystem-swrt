const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  const { title, description, date, location, maxAttendees } = req.body;

  try {
    const event = new Event({
      title,
      description,
      date,
      location,
      maxAttendees,
      creator: req.user.id,
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

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.creator.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Event.findByIdAndDelete(req.params.id); // Correct deletion method
    res.json({ message: "Event removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
