const inicio = require("./inicio");
const mascotas = require("./rutas/mascotas");
const veterinarias = require("./rutas/veterinarias");
const duenos = require("./rutas/duenos");
const consultas = require("./rutas/consultas");

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