const port = 5000;
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const UserModel = require('./models/user');  // Importing the user model

// MongoDB connection string
const connectionUrl = "mongodb://127.0.0.1:27017/new_data";

// Express app initialization
const app = express();

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

// Serve the form HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// MongoDB connection using async/await
async function connectDB() {
  try {
    await mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the app if there's a connection error
  }
}

connectDB(); // Call the function to connect to the database

// Handle form submission
app.post('/submit', async (req, res) => {
  const { name, location, dob, subjects } = req.body;

  // Create a new user using the UserModel
  const newUser = new UserModel({
    name: name,
    location: location,
    dob: new Date(dob), // Convert string date to Date object
    subjects: subjects
  });

  // Save the new user to MongoDB
  try {
    await newUser.save();
    console.log('User saved to MongoDB successfully');
    res.redirect('/submitted');
  } catch (err) {
    console.error('Error saving user to MongoDB:', err);
    res.status(500).send('Error saving user');
  }
});

// Serve a submitted confirmation page
app.get('/submitted', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'submitted.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
