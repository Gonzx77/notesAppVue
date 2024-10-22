const { connectDB, closeDB } = require('../connection/db');

const getNotes = async () => {
    let db;
    try {
        db = await connectDB();
        const collection = db.collection('notes');
        
        const notas = await collection.find().toArray();
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

module.exports = getNotes;
