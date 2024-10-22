const { MongoClient } = require('mongodb');

const uri = 'mongodb://root:campus2023@localhost:27017';
const client = new MongoClient(uri);

const connectDB = async () => {
    try {
        await client.connect();
        return client.db('notesapp');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error;
    }
};

const closeDB = async () => {
    await client.close();
};

module.exports = {
    connectDB,
    closeDB,
};
