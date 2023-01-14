const express = require('express');
const noteData = require('./db/notes.json');
const PORT = 3001;
const path = require('path');

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

  app.get('/notes', (req, res) => {
      res.sendFile(path.join(__dirname, 'public/notes.html'));
    });

  app.get('/api/notes', (req, res) => res.json(noteData));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });