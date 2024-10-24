const { ObjectId } = require('mongodb');
const { connectDB, closeDB } = require('../connection/db');

const deleteNote = async (param) => {
    let db;
    try {
        db = await connectDB();
        const collection = db.collection('notes');
        
        await collection.deleteOne({'_id': new ObjectId(`${param.id}`)});
    } catch (error) {
        console.error('Error al obtener las notas:', error);
        return { error: 'Error de base de datos', details: error.message };
    } finally {
        if (db) {
            await closeDB();
        }
    }
};

module.exports = deleteNote;
