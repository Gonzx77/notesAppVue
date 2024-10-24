const express = require('express');
const { join } = require('path');
const cors = require('cors');
const getNotes = require('./modules/getNotes');
const updateNote = require('./modules/updateNote');
const createNote = require('./modules/createNote');
const deleteNote = require('./modules/deleteNote');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

let dir = __dirname;
dir = dir.slice(0, -3);

app.get('/notes', async (req, res) => {
    try {
        let data = await getNotes();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error al consultar las notas'});
    }
});

app.delete('/deleteNote', async (req, res) => {
    const data = req.body;
    try {
        await deleteNote(data);
        res.status(200);
    } catch (err) {
        res.status(500).json({ error: 'Error al consultar las notas'});
    }
});

app.post('/updateNote', async (req, res) => {
    const data = req.body;
    if (data.id === null) {
        try {
            await createNote(data);
            res.status(200);
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar la nota' });
        }
    } else {
        try {
            await updateNote(data);
            res.status(200);
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar la nota' });
        }
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
