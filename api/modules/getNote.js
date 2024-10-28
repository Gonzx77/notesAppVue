const { connectDB, closeDB } = require('../connection/db');
const { ObjectId } = require('mongodb');

const getNote = async (id) => {
    let db;
    try {
        db = await connectDB();
        const collection = db.collection('notes');
        
        const notas = await collection.find({_id: new ObjectId(`${id}`)}).toArray();
        return notas;
    } catch (error) {
        console.error('Error al obtener las notas:', error);
        return { error: 'Error de base de datos', details: error.message };
    } finally {
        if (db) {
            await closeDB();
        }
    }
};

module.exports = getNote;
