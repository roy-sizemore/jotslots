const fs = require('fs');
const uuidv1 = require('uuid/v1');

class Note {
  read() {
    return fs.readFile('db/db.json', (err) => {
      if (err) {
        console.error(err);
      };
    });
  };

  write(note) {
    return fs.writeFile('db/db.json', JSON.stringify(note), (err) => {
      if (err) {
        console.error(err);
      };
    });
  };

  readNotes() {
    return this.read().then((notes) => {
      let seeNotes = [];

      // If notes isn't an array or can't be turned into one, send back a new empty array
      try {
        seeNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        seeNotes = [];
      }

      return seeNotes;
    });
  };

  addNote(note) {
    const { title, text } = note;

    // Add a unique id to the note using uuid package
    const newNote = { title, text, id: uuidv1() };

    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.readNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  };

  deleteNote(id) {
    // Get all notes, remove the note with the given id, write the filtered notes
    return this.readNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  };
};

module.exports = new Note;