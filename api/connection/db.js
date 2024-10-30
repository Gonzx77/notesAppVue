const { MongoClient } = require('mongodb');

const uri = 'mongodb://mongo:TVrGoUhUyjtlXVjVDSMliWWvlOxVZaMU@autorack.proxy.rlwy.net:38519';
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
