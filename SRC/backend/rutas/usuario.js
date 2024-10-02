module.exports = function usuariosHandler(usuarios){
    return {
        get: (data, callback) => {
            if(typeof data.indice !== "undefined"){
                if(usuarios[data.indice]){
                    return callback(200, usuarios[data.indice]);
                }
                return callback(404, {mensaje: `usuario con indice ${data.indice} no encontrada`});
            }
            callback(200, usuarios);
        },
        post: (data, callback) => {
            usuarios.push(data.payload);
            callback(201, data.payload);
        },
        put: (data, callback) => {
            if(typeof data.indice !== "undefined"){
                if(usuarios[data.indice]){
                    usuarios[data.indice] = data.payload;
                    return callback(200, usuarios[data.indice]);
                }
                return callback(404, {
                    mensaje: `usuario con indice ${data.indice} no encontrada`,
                });
            }
            callback(400, {mensaje: 'indice no enviado'});
        },
        delete: (data, callback) => {
            if(typeof data.indice !== "undefined"){
                if(usuarios[data.indice]){
                    usuarios = usuarios.filter(
                        (_usuario, indice) => indice!= data.indice
                 );
                    return callback(204, {
                        mensaje: `elemento con indice ${data.indice} eliminado`,
                    });
                }
                return callback(404, {
                    mensaje: `usuario con indice ${data.indice} no encontrada`,
                });
            }
            callback(400, {mensaje: 'indice no enviado'});
        },
    }
}




