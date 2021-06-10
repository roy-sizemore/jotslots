// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

const publicPath = path.join(__dirname, 'public');
const dbPath = path.join(__dirname, 'db');

// Sets up the Express app to handle data parsing
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// Basic routes
app.get('/', (req, res) => res.sendFile(path.join(publicPath, 'index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(publicPath, 'notes.html')));

// Displays all notes
let noteArray = JSON.parse(fs.readFileSync(path.resolve(dbPath, 'db.json')));
let iterator = 0;
noteArray.forEach(i => {i.id = iterator; iterator += 1; console.log(noteArray)});
app.get('/api/notes', (req, res) => res.send(noteArray));

// Create new note
app.post('/api/notes', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  let newNote = req.body;
  newNote.id = iterator;
  iterator += 1;
  noteArray.push(newNote);
  res.send(noteArray)
  fs.writeFile(path.join(dbPath, 'db.json'), JSON.stringify(noteArray), () => console.log("Added new item!"));
  });

app.delete('/api/notes/:id', (req, res) => {
  id = req.id;
  noteArray.splice(id, 1)
  fs.writeFile(path.join(dbPath, 'db.json'), JSON.stringify(noteArray), () => console.log(`Item has been deleted.`));
  res.send(noteArray)
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
