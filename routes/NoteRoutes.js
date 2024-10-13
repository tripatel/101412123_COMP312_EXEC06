const express = require('express');
const bodyParser = require('body-parser');
const Note = require('../models/NotesModel'); // Ensure correct import
const router = express.Router(); // Create a router instance

// Middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Create a new Note
router.post('/notes', (req, res) => {
    if (!req.body.noteTitle || !req.body.noteDescription) {
        return res.status(400).send({
            message: "Note content (title and description) cannot be empty"
        });
    }

    const note = new Note({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority || "MEDIUM",
    });

    note.save()
        .then(data => res.status(201).send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
});

// Retrieve all Notes
router.get('/notes', (req, res) => {
    Note.find()
        .then(notes => res.status(200).send(notes))
        .catch(err => res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        }));
});

// Retrieve a single Note with noteId
router.get('/notes/:noteId', (req, res) => {
    Note.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.status(200).send(note);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        });
});

// Update a Note with noteId
router.put('/notes/:noteId', (req, res) => {
    // Validate request
    if (!req.body.noteTitle || !req.body.noteDescription) {
        return res.status(400).send({
            message: "Note content (title and description) cannot be empty"
        });
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority || "MEDIUM", // Default priority if not provided
    }, { new: true }) // 'new: true' returns the updated document
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.status(200).send(note);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.noteId
            });
        });
});

// Delete a Note with noteId
router.delete('/notes/:noteId', (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.status(200).send({ message: "Note deleted successfully!" });
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.noteId
            });
        });
});

// Export the router
module.exports = router;