const mongoose = require('mongoose');

// Create Note Schema
const NoteSchema = new mongoose.Schema({
    noteTitle: {
        type: String,
        required: true // The title is mandatory
    },
    noteDescription: {
        type: String,
        required: true // The description is mandatory
    },
    priority: {
        type: String,
        enum: ['HIGH', 'MEDIUM', 'LOW'], // Values can only be HIGH, MEDIUM, or LOW
        default: 'MEDIUM' // Default priority is MEDIUM
    },
    dateAdded: {
        type: Date,
        default: Date.now // Automatically set the current date and time when a note is created
    },
    dateUpdated: {
        type: Date
    }
});

// Before saving, update dateUpdated to the current date
NoteSchema.pre('save', function(next) {
    this.dateUpdated = Date.now(); // Update the dateUpdated field every time the note is saved/updated
    next();
});

// Export the Note model
module.exports = mongoose.model('Note', NoteSchema);