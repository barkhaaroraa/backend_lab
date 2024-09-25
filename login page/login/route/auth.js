const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User"); // Assume you have a User model defined
const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  res.send("User registered successfully!");
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).send("Invalid username or password.");
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    req.session.user = { username }; // Store user information in the session
    res.redirect("/dashboard"); // Redirect to the dashboard page after successful login
  } else {
    res.status(401).send("Invalid username or password.");
  }
});

module.exports = router;
