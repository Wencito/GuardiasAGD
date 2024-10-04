module.exports = function contactosHandler({contactos, usuarios}){
    return {
        get: (data, callback) => {
            if(typeof data.indice !== "undefined"){
                if(contactos[data.indice]){
                    return callback(200, contactos[data.indice]);
                }
                return callback(404, {mensaje: `Contacto con indice ${data.indice} no encontrado`});
            }
            /* Relación de contactos con usuarios y contactos*/
            const contactosConRelaciones = contactos.map((contacto) =>(
                {...contacto,
                    usuario: { 
                        ...usuarios[contacto.usuario], 
                        id: contacto.usuario,
                    },
                }
            ));
            callback(200, contactosConRelaciones);
        },
        post: (data, callback) => {
            contactos.push(data.payload);
            callback(201, data.payload);
        },
        put: (data, callback) => {
            if(typeof data.indice !== "undefined"){
                if(contactos[data.indice]){
                    contactos[data.indice] = data.payload;
                    return callback(200, contactos[data.indice]);
                }
                return callback(404, {
                    mensaje: `Contacto con indice ${data.indice} no encontrado`,
                });
            }
            callback(400, {mensaje: 'indice no enviado'});
        },
        delete: (data, callback) => {
            if(typeof data.indice !== "undefined"){
                if(contactos[data.indice]){
                    contactos = contactos.filter(
                        (_contacto, indice) => indice!= data.indice
                 );
                    return callback(204, {
                        mensaje: `elemento con indice ${data.indice} eliminado`,
                    });
                }
                return callback(404, {
                    mensaje: `Contacto con indice ${data.indice} no encontrado`,
                });
            }
            callback(400, {mensaje: 'indice no enviado'});
        },
    }
}