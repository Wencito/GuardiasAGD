const listausuarios = document.getElementById("lista-veterinarias");
const legajo = document.getElementById("legajo");
const email = document.getElementById("email");
const contacto = document.getElementById("contacto");
const grupo = document.getElementById("grupo");
const agregar = document.getElementById("btn-agregar");
const form = document.getElementById("form");
const indice = document.getElementById("indice");
const btnguardar = document.getElementById("btn-guardar");
const url = "http://localhost:4000/Contactos";

let contactos = [];

async function listarcontactos() {
    try {
        const respuesta = await fetch(url);
        const contactosDelServer = await respuesta.json();
        if (Array.isArray(contactosDelServer)) {
            contactos = contactosDelServer;
        }
        if (contactos.length > 0) {
            const htmlcontactos = contactos.map((contacto, index) => 
                `<tr>
                    <th scope="row">${index}</th>
                    <td>${contacto.documento}</td>
                    <td>${contacto.nombre}</td>
                    <td>${contacto.apellido}</td>
                    <td>${contacto.email}</td>
                    <td>${contacto.contacto}</td>
                    <td>${contacto.grupo}</td>
                    <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#exampleModalCenter"><i class="bi bi-pencil-square"></i></button>
                            <button type="button" class="btn btn-danger eliminar"><i class="bi bi-trash"></i></button>
                        </div>
                    </td>
                </tr>`).join("");
            listausuarios.innerHTML = htmlcontactos;
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
            contactos[indice.value] = datos;
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
            listarcontactos();
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
        const contacto = contactos[index];
        legajo.value = contacto.legajo;
        nombre.value = contacto.nombre;
        apellido.value = contacto.apellido;
        email.value = contacto.email;
        contacto.value = contacto.contacto;
        grupo.value = contacto.grupo;
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
                listarcontactos();
                resetModal();
            }
        } catch (error) {
            console.log({ error });
            $(".alert").show();
        }
    }
}

listarcontactos();

form.onsubmit = enviarDatos;
btnguardar.onclick = enviarDatos;
