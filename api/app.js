const express = require('express');
const { join } = require('path');
const cors = require('cors');
const getNotes = require('./modules/getNotes');
const updateNote = require('./modules/updateNote');
const createNote = require('./modules/createNote');
const deleteNote = require('./modules/deleteNote');
const searchNotes = require('./modules/searchNotes');
const getNote = require('./modules/getNote');

const app = express();
const port = 5000;
const router = require('./router/router');

app.use(express.json());
app.use(cors());

let dir = __dirname;
dir = dir.slice(0, -3);

app.use('/notes', router);


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
