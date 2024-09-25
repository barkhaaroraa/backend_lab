const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  dob: { type: Date, required: true }, // Storing DOB as a Date type
  subjects: { type: String, required: true } // Store subject as a string
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
