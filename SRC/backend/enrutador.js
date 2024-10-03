const recursos = require("./recursos");
const guardias = require("./rutas/guardias");
const contactos = require("./rutas/contactos");
const usuarios = require("./rutas/usuarios");

module.exports = {
    ruta: (data, callback) => {
        callback(200, { mensaje: 'Esta es /ruta' });
    },
    guardias: guardias(recursos),
    contactos: contactos(recursos.contactos),
    usuarios: usuarios(recursos.usuarios),
    noEncontrado: (data, callback) => {
        callback(404, { mensaje: 'No encontrado' });
    },
};
