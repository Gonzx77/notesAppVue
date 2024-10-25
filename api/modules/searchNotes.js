const { connectDB, closeDB } = require('../connection/db');

const normalizeText = (text) => {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
};

const searchNotes = async (text) => {
    let db;
    try {
        db = await connectDB();
        const collection = db.collection('notes');

        const normalizedText = normalizeText(text.toLowerCase());

        const notas = await collection.find({
            $or: [
                { titulo: { $regex: normalizedText, $options: 'i' } },
                { contenido: { $regex: normalizedText, $options: 'i' } }
            ]
        }).toArray();

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

module.exports = searchNotes;
