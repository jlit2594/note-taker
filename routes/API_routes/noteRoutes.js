const router = require('express').Router();
const notes  = require('../../db/db.json');
const { findById, validateNote, createNote, deleteNote } = require('../../lib/notes');

// get request for all notes in the database
router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results)
});

router.get('/notes:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404)
    }
});

// sends new notes to the database
router.post('/notes', (req, res) => {
    if (!validateNote(req.body)) {
        res.status(400).send('Yikes! An error occurred. Sorry!');
    } else {
        const note = createNote(req.body, notes);
        res.json(note);
    }
});

router.delete('/notes:id', (req, res) => {
    const result = deleteNote(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404)
    }
})

module.exports = router;