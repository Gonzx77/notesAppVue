const express = require('express');
const getNotes = require('../modules/getNotes');
const updateNote = require('../modules/updateNote');
const createNote = require('../modules/createNote');
const deleteNote = require('../modules/deleteNote');
const searchNotes = require('../modules/searchNotes');
const getNote = require('../modules/getNote');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await getNotes();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error al consultar las notas' });
    }
});

router.get('/note', async (req, res) => {
    const { id } = req.query;
    try {
        const data = await getNote(id);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error al consultar la nota' });
    }
});

router.get('/search', async (req, res) => {
    const { text } = req.query;
    try {
        const data = await searchNotes(text ? text.trim() : '');
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error al consultar las notas' });
    }
});

router.delete('/delete', async (req, res) => {
    const data = req.body;
    try {
        await deleteNote(data);
        res.status(200).json({ message: 'Nota eliminada con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar la nota' });
    }
});

router.post('/update', async (req, res) => {
    const data = req.body;
    try {
        if (data.id === null) {
            await createNote(data);
            res.status(200).json({ message: 'Nota creada con éxito' });
        } else {
            await updateNote(data);
            res.status(200).json({ message: 'Nota actualizada con éxito' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar la nota' });
    }
});

module.exports = router;
