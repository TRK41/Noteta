const express = require('express');
const noteData = require('./db/db.json');
const path = require('path');
const uuid = require('./helpers/uuid');
const fs = require('fs');

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
const PORT = process.env.PORT || 8000;


app.get('/notes', (req, res) => { //'/notes' will be directed to 'public/notes.html page'
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/', (req, res) => { //anything will be directed to 'public/index.html'
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'db/db.json'));
})//'/api/notes' will be directed to ./db/db.json 


// Post request
app.post('/api/notes', (req, res) => {
  let newNote  = req.body;
  let noteList = JSON.parse(fs.readFileSync('./db/db.json'));
  let listLength = (noteList.length).toString();

  newNote.id = listLength;
  noteList.push(newNote);
    

    const noteString = JSON.stringify(noteList);

    fs.writeFileSync('./db/db.json', noteString,);
     console.log( `New note has been added to the JSON file`);
      res.json(noteList)
      return
    
});
//Put request
app.put('/api/notes/:id', (req, res) => res.json(noteData));



// Delete request
app.delete('/api/notes/:Id', (req, res) => {
let noteList = JSON.parse(fs.readFileSync('./db/db.json'));
let noteId = (req.params.Id).toString(); 

noteList = noteList.filter(selected => {
  return selected.id != noteId
})

const noteString = JSON.stringify(noteList);

fs.writeFileSync('./db/db.json', noteString,);
     console.log( `Note has been deleted from JSON file`);
      res.json(noteList)
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});