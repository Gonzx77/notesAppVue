const express = require('express');
const { join } = require('path');
const cors = require('cors');

const app = express();
const port = 5000;
const router = require('./router/router');

app.use(express.json());
app.use(cors());

let dir = __dirname;
dir = dir.slice(0, -3);

app.use('/notes', router);
app.get('/', (req, res) => {
    res.send('Servidor montado');
});



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
