const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const authMiddleware = require('./authMiddleware');
const errorHandlingMiddleware = require('./errorHandlingMiddleware');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection setup
mongoose.connect('mongodb://127.0.0.1:27017/first', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define user schema and model
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Secret key for JWT
const secretKey = 'your-secret-key';

// Serve the login page at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Register route
app.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            password: hashedPassword,
        });

        await newUser.save();
        res.send('User registered successfully!');
    } catch (err) {
        next(err); // Pass error to error-handling middleware
    }
});

// Login route
// Login route
app.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Find the user in the database
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(400).send('Invalid username or password.');
        }

        // Compare password with hashed password in database
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            // Generate a JWT token for authenticated session
            const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '1h' });
            
            // Set the Authorization token in the header
            res.header('Authorization', token);
            
            // Redirect to the weather page after successful login
            res.redirect('/weather.html');
        } else {
            res.status(400).send('Invalid username or password.');
        }
    } catch (err) {
        next(err); // Pass error to error-handling middleware
    }
});


// Protected route (requires authorization)
app.get('/protected', authMiddleware, (req, res) => {
    res.send('This is a protected route. User is authenticated.');
});

// Error handling middleware should be the last middleware
app.use(errorHandlingMiddleware);

// Server listening
app.listen(4000, () => {
    console.log('Server started on http://localhost:4000');
});

