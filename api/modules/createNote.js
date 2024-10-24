const { ObjectId } = require('mongodb');
const { connectDB, closeDB } = require('../connection/db');

const createNote = async (param) => {
    let db;
    try {
        db = await connectDB();
        const collection = db.collection('notes');
        
        await collection.insertOne({'titulo': param.titulo, 'contenido': param.contenido});
    } catch (error) {
        console.error('Error al obtener las notas:', error);
        return { error: 'Error de base de datos', details: error.message };
    } finally {
        if (db) {
            await closeDB();
        }
    }
};

module.exports = createNote;
