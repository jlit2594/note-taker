const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const notesArray = [];

function findById(id) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

// creates note and pushes it to an array
function createNote(note) {
    note.id = uuidv4();
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return note;
};

// ensures that the note created is in the proper format
function validateNote(note) {
    if(!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
};

function deleteNote(id) {
    const result = notesArray.filter(note => note.id === id)
    notesArray.splice(result)
}

module.exports = {
    findById,
    createNote,
    validateNote,
    deleteNote
}