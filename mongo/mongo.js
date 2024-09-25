const mongoose = require('mongoose');

// const url = 'mongodb://localhost:27017';

// mongoose.connect(url)
//    .then(() => {
//        console.log('Connected to MongoDB');
//    })
//    .catch((error) => {
//        console.error('Error connecting to MongoDB:', error);
//    });


// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// module.exports = db;

mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));