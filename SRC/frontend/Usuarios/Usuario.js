const listausuarios = document.getElementById("lista-veterinarias");
const legajo = document.getElementById("legajo");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const email = document.getElementById("email");
const contacto = document.getElementById("contacto");
const grupo = document.getElementById("grupo");
const agregar = document.getElementById("btn-agregar");

const form = document.getElementById("form");
const indice = document.getElementById("indice");
const btnguardar = document.getElementById("btn-guardar");
const url = "http://localhost:4000/Usuarios";

let usuarios = [];

async function listarusuarios() {
    try {
        const respuesta = await fetch(url);
        const usuariosDelServer = await respuesta.json();
        if (Array.isArray(usuariosDelServer)) {
            usuarios = usuariosDelServer;
        }
        if (usuarios.length > 0) {
            const htmlusuarios = usuarios.map((usuario, index) => 
                `<tr>
                    <th scope="row">${index}</th>
                    <td>${usuario.documento}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellido}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.contacto}</td>
                    <td>${usuario.grupo}</td>
                    <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#exampleModalCenter"><i class="bi bi-pencil-square"></i></button>
                            <button type="button" class="btn btn-danger eliminar"><i class="bi bi-trash"></i></button>
                        </div>
                    </td>
                </tr>`).join("");
            listausuarios.innerHTML = htmlusuarios;
            Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index) => botonEditar.onclick = editar(index));
            Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index) => botonEliminar.onclick = eliminar(index));
            return;
        }
        listausuarios.innerHTML = `<tr>
                <td class="TabNo" colspan="8">No hay usuarios</td>
            </tr>`;
    } catch (error) {
        console.log({ error });
        $(".alert").show();
    }
};

async function enviarDatos(evento) {
    evento.preventDefault();
    try {
        const datos = {
            legajo: legajo.value,
            nombre: nombre.value,
            apellido: apellido.value,
            email: email.value,
            contacto: contacto.value,
            grupo: grupo.value
        };
        let method = "POST";
        let urlEnvio = url;
        const accion = btnguardar.innerHTML;
        if (accion === 'Editar') {
            // Editar
            method = "PUT";
            usuarios[indice.value] = datos;
            urlEnvio = `${url}/${indice.value}`;
        }
        const respuesta = await fetch(urlEnvio, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });
        if (respuesta.ok) {
            listarusuarios();
            resetModal();
        }
    } catch (error) {
        console.log({ error });
        $(".alert").show();
    }
};

function editar(index) {
    return function cuandoCliqueo() {
        btnguardar.innerHTML = 'Editar';
        $('#exampleModalCenter').modal('toggle');
        const usuario = usuarios[index];
        legajo.value = usuario.legajo;
        nombre.value = usuario.nombre;
        apellido.value = usuario.apellido;
        email.value = usuario.email;
        contacto.value = usuario.contacto;
        grupo.value = usuario.grupo;
        indice.value = index;
    }
};

function resetModal() {
    legajo.value = '';
    nombre.value = '';
    apellido.value = '';
    email.value = '';
    contacto.value = '';
    grupo.value = '';
    indice.value = '';
    btnguardar.innerHTML = 'Crear';
}

function eliminar(index) {
    const urlEnvio = `${url}/${index}`;
    return async function clickEliminar() {
        try {
            const respuesta = await fetch(urlEnvio, {
                method: "DELETE",
            });
            if (respuesta.ok) {
                listarusuarios();
                resetModal();
            }
        } catch (error) {
            console.log({ error });
            $(".alert").show();
        }
    }
}

listarusuarios();

form.onsubmit = enviarDatos;
btnguardar.onclick = enviarDatos;
