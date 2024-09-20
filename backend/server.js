const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Import routes
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
require("./scheduler");

// Serving static files for uploaded images
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
