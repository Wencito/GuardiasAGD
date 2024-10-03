module.exports = function guardiasHandler({contactos, guardias, usuarios}){
    return {
        get: (data, callback) => {
            if(typeof data.indice !== "undefined"){
                console.log("handler guardias", { data });
                if(guardias[data.indice]){
                    return callback(200, guardias[data.indice]);
                }
                return callback(404, {mensaje: `guardia con indice ${data.indice} no encontrado`});
            }
            /* Relación de guardias con usuarios y contactos*/
            const guardiasConRelaciones = guardias.map((guardia) =>(
                {...guardia, 
                    contacto: { ...contactos[guardia.contacto], id: guardia.contacto},
                    usuario: { 
                        ...usuarios[guardia.usuario], 
                        id: guardia.usuario,
                    },
                }
            ));
            callback(200, guardiasConRelaciones);
        },
        post: (data, callback) => {
            let nuevaguardia = data.payload;
            guardias = [...guardias, nuevaguardia];
            callback(201, nuevaguardia);
        },
        put: (data, callback) => {
            if (typeof data.indice !== "undefined") {
              if (guardias[data.indice]) {
                const { fechaCreacion } = guardias[data.indice];
                guardias[data.indice] = {
                  ...data.payload,
                };
                return callback(200, guardias[data.indice]);
              }
              return callback(404, {
                mensaje: `guardia con indice ${data.indice} no encontrado`,
              });
            }
            callback(400, { mensaje: "indice no enviado" });
          },
        delete: (data, callback) => {
            if(typeof data.indice !== "undefined"){
                if(guardias[data.indice]){
                    guardias = guardias.filter(
                        (_guardia, indice) => indice!= data.indice
                 );
                    return callback(204, {
                        mensaje: `elemento con indice ${data.indice} eliminado`,
                    });
                }
                return callback(404, {
                    mensaje: `Guardia con indice ${data.indice} no encontrado`,
                });
            }
            callback(400, {mensaje: 'indice no enviado'});
        },
    }
}




