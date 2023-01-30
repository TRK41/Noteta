const express = require('express');
const noteData = require('./db/db.json');
const PORT = 3001;
const path = require('path');
const uuid = require('./helpers/uuid');
const fs = require('fs');

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

//Get request
app.get('/', (req, res) => {//'/' will be directed to 'public/index.html page'
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) => { //'/notes' will be directed to 'public/notes.html page'
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => res.json(noteData));//'/api/notes' will be directed to ./db/notes.json 

app.get('*', (req, res) => { //anything will be directed to 'public/index.html'
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


const createNewNote = () =>{}


// Post request
app.post('/api/notes', (req, res) => {
  console.log('method:', req.method);
  console.log('body:', req.body);
  res.send('POST note')
  const { title, text } = req.body;

  if (title && text) {

    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    const noteString = JSON.stringify(newNote);

    fs.writeFile('./db/notes.json', noteString, (err) =>
      err
        ? console.error(err)
        : console.log(
          `New note has been added to the JSON file`
        )
    );
    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
  
});
//Put request
app.put('/api/notes/:id', (req, res) => res.json(noteData));

// Delete request
app.delete('/api/notes/:id', (req, res) => res.json(noteData));

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});