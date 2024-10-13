// Import the required modules
const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes'); // Ensure this path is correct

// Create an instance of Express
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection string (make sure to replace this with your actual connection string)
//const mongoURI = 'mongodb://localhost:27017/comp3123_assigment1';

// MongoDB connection
mongoose.connect('mongodb+srv://101412123:trisha%401601@cluster0.0hugn.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));



// Use the note routes
app.use('/api', noteRoutes); // Prefix your routes

// Start the server
const PORT = process.env.PORT || 5000; // Use the environment port or default to 5000
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});