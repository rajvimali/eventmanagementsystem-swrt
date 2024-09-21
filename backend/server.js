const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const uploadRoutes = require('./routes/uploadRoutes');
const path = require('path');
const connectDB = require('./config/db'); 

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Import routes
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

//  Make the "uploads" folder publicly accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware and routes
app.use('/api', uploadRoutes); // Your file upload route

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
