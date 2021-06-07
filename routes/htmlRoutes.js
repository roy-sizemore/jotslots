const path = require('path');
const router = require('express').Router();

// GET route for /notes. Will show all notes
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Wildcard GET route. Will respond w/default index.html
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
