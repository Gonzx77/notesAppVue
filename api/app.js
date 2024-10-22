const express = require('express');
const { join } = require('path');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

let dir = __dirname;
dir = dir.slice(0, -3);

app.get('/notes', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('notesapp');
        const collection = db.collection('notes');
        
        const notas = await collection.find().toArray();
        res.status(200).json(notas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al recuperar notas' });
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
