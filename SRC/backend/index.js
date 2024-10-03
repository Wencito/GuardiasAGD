const http = require('node:http'); //Node va a requerir un paquete en este caso http
const requestHandler = require('./request-handler');
const server = http.createServer(requestHandler);

server.listen(4000, ()=>{
    console.log('El servidor esta escuchando peticiones en http://localhost:4000/')
});