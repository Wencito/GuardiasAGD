const url = require('node:url');
const StringDecoder = require('string_decoder').StringDecoder;
const enrutador = require("./enrutador");

//forma de llamar un callback
module.exports = ((req, res) => { 
    // 1. Obtener url desde el objeto request (req)
    const urlAcual = req.url;
    const urlParseada = url.parse(urlAcual, true);

    // 2. Obtener la ruta
    const ruta = urlParseada.pathname;
    
    // 3. Quitar slash
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, '');

    // 3.1 Obtener el metodo HTTP
    const metodo = req.method.toLowerCase();

    // 3.1.1 Dar permisos de CORS escribiendo los headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader(
        'Access-Control-Request-Methods', 
        'OPTIONS,GET,PUT,DELETE,POST'
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'OPTIONS,GET,PUT,DELETE,POST'
    );

    //3.1.2 Dar respuesta inmediata cuando el método sea options 
    if(metodo === 'options'){
        res.writeHead(200);
        res.end();
        return;
    }

    // 3.2 Obtener las variables del query url
    const { query = {} } = urlParseada;

    // 3.3 Obtener headers
    const { headers ={} } = req; 

    // 3.4 Obtener payload, en el caso de habe uno
    const decoder = new StringDecoder('utf-8');
    let buffer = '';

    // 3.4.1 Acumulando la data cuando el request reciba un payload
    req.on('data', (data)=>{
        buffer += decoder.write(data);
    });

    // 3.4.2 Terminar de acumular datos y decirle al deocder que finalice
    req.on('end', ()=>{
        buffer += decoder.end();


    if (headers["content-type"] === 'application/json'){
        buffer = JSON.parse(buffer);
    }

    // 3.4.3 revisa si tiene subrutas en este caso es el indice del array
    if(rutaLimpia.indexOf("/")>= -1){
        //separar rutas 
        var [rutaPrincipal, indice] = rutaLimpia.split("/");
    };

    // 3.5 Ordenar la data del request
    const data = {
        indice,
        ruta: rutaPrincipal || rutaLimpia,
        query,
        metodo,
        headers,
        payload: buffer
    };

    console.log({ data });

    // 3.6 Elegir el manejador dependiendo de la ruta y asignarle función que el enrutador tiene 
    let handler;
    if(data.ruta && enrutador[data.ruta] && enrutador[data.ruta][metodo]){
        handler = enrutador[data.ruta][metodo];
    }else{
        handler = enrutador.noEncontrado;
    } 
    
    // 4. Ejecutar handler (manejador) para enviar la respuesta
    if(typeof handler === 'function'){
        handler(data, (statusCode = 200, mensaje)=>{
            const respuesta = JSON.stringify(mensaje);
            res.setHeader('Content-Type', 'aplication/json');
            res.writeHead(statusCode);
            // Linea donde realmente ya estamos responiendo a la aplicación cliente
            res.end(respuesta);
        });
    }
  });
 });