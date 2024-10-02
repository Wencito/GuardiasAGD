const recursos = require("./recursos");
const inicio = require("./rutas/guardias");
const inicio = require("./rutas/contactos");
const inicio = require("./rutas/usuarios");

module.exports = { //handler
    ruta: (data, callback) => {
        callback(200, {mensaje: 'Esta es /ruta'});
    },
    mascotas: mascotas(recursos.mascotas),
    veterinarias: veterinarias(recursos.veterinarias),
    duenos: duenos(recursos.duenos),
    consultas: consultas(recursos),
    noEncontrado: (data, callback) => {
        callback(404, {mensaje: 'No encontrado'});
    },
};