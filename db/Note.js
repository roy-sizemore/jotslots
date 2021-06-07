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

  readNote() {
    return this.read().then((notes) => {
      let viewNotes;

      // If notes isn't an array or can't be turned into one, send back a new empty array
      try {
        viewNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        viewNotes = [];
      }

      return viewNotes;
    });
  };

  createNote(note) {
    const { title, text } = note;

    // Add a unique id to the note using uuid package
    const newNote = { title, text, id: uuidv1() };

    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.readNote()
      .then((notes) => [...notes, newNote])
      .then((updateNote) => this.write(updateNote))
      .then(() => newNote);
  };

  deleteNote(id) {
    // Get all notes, remove the note with the given id, write the filtered notes
    return this.readNote()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((delNote) => this.write(delNote));
  };
};

module.exports = new Note;
