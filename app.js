// app.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'SRC')));

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Bienvenido al servidor de Node.js!');
});

// Inicia el servidor
server.listen(3000, ()=>{
    console.log('El servidor esta escuchando peticiones en http://localhost:3000/')
});