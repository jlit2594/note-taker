const router = require('express').Router();
const e = require('express');
const { notes } = require('../../db.json');
const { findById, validateNote, createNote } = require('../../lib/notes');

router.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results)
});

router.get('/api/notes:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404)
    }
});

router.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('Yikes! An error occurred. Sorry!');
    } else {
        const note = createNote(req.body, notes);
        res.json(note);
    }
});

module.exports = router;