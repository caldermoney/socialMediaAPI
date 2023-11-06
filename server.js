const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes.js');
const thoughtRoutes = require('./routes/thoughtRoutes.js');

const app = express();

// Middleware to Parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Use the routers with the specified paths
app.use('/routes/users', userRoutes);
app.use('/routes/thoughts', thoughtRoutes);

// Define the port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});