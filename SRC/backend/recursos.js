const contactos = require("./rutas/contactos");
const guardias = require("./rutas/guardias");
const usuario = require("./rutas/usuario");

module.exports = {
    usuario: [
        {legajo: "", nombre: "Agustin", apellido: "Arbol", email: "Agustin@example", contacto:"2112551", grupo:"ASA"},
        {legajo: "", nombre: "Alfonso", apellido: "Diaz", email: "Alfonso@example", contacto:"125515", grupo:"ATI"},
        {legajo: "", nombre: "Ruben", apellido: "Sanchez", email: "Ruben@example", contacto:"7144124", grupo:"CAU"},
        {legajo: "", nombre: "Nicolas", apellido: "Palacios", email: "Nicolas@example", contacto:"1245215", grupo:"PMZ"},
    ],
    contactos: [
        {nombre: "Alejandro", apellido: "Martinez", email: "alejandro@exmple.com", contacto: "1237645124", interno:"4330"},
        {nombre: "Fernando", apellido: "Dominguez", email: "fernando@example.com", contacto: "67867185", interno:"4021"},
        {nombre: "Alex", apellido: "Perez", email: "alex@example.com", contacto: "857891279", interno:"2134"},
        {nombre: "Oscar", apellido: "Lugones", email: "oscar@example.com", contacto: "1257812", interno:"2356"},
    ],
    guardias: [
        {
            legajo: 0, 
            grupo: 0,
            contacto: "Diagnostco1",
            horaguardia:"historia1"
        },
    ],
}

