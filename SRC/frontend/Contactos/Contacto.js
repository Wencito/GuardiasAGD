const listacontactos = document.getElementById("lista-contactos");
const usuario = document.getElementById("usuario");
const email = document.getElementById("email");
const contacto = document.getElementById("contacto");
const interno =  document.getElementById("interno");
const agregar = document.getElementById("btn-agregar");
const form = document.getElementById("form");
const indice = document.getElementById("indice");
const btnguardar = document.getElementById("btn-guardar");
const url = "http://localhost:4000";

let contactos = [];
let usuarios =  [];


async function listarcontactos() {
    const entidad = "contactos";
    try {
        const respuesta = await fetch(`${url}/${entidad}`);
        const contactosDelServer = await respuesta.json();
        if (Array.isArray(contactosDelServer)) {
            contactos = contactosDelServer;
        }
        if (contactos.length > 0) {
            const htmlcontactos = contactos.map((contacto, index) => 
                `<tr>
                    <th scope="row">${index}</th>
                    <td>${contacto.usuario.nombre} ${contacto.usuario.apellido}</td>
                    <td>${contacto.usuario.email}</td>
                    <td>${contacto.usuario.contacto}</td>
                    <td>${contacto.interno}</td>
                    <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#exampleModalCenter"><i class="bi bi-pencil-square"></i></button>
                            <button type="button" class="btn btn-danger eliminar"><i class="bi bi-trash"></i></button>
                        </div>
                    </td>
                </tr>`).join("");
            listacontactos.innerHTML = htmlcontactos;
            Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index) => botonEditar.onclick = editar(index));
            Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index) => botonEliminar.onclick = eliminar(index));
            return;
        }
        listacontactos.innerHTML = `<tr>
                <td class="TabNo" colspan="8">No hay contactos</td>
            </tr>`;
    } catch (error) {
        console.log({ error });
        $(".alert").show();
    }
};

async function listarusuarios() {
    const entidad = "usuarios";
    try {
      const respuesta = await fetch(`${url}/${entidad}`);
      const usuariosDelServidor = await respuesta.json();
      if (Array.isArray(usuariosDelServidor)) {
        usuarios = usuariosDelServidor;
      }
      if (respuesta.ok) {
        usuarios.forEach((_usuario, indice) => {
          const optionActual = document.createElement("option");
          optionActual.innerHTML = `${_usuario.nombre} ${_usuario.apellido} ${_usuario.email} ${_usuario.contacto}`;
          optionActual.value = indice;
          usuario.appendChild(optionActual);
        });
      }
    } catch (error) {
      console.log({ error });
      $(".alert-danger").show();
    }
  }
async function enviarDatos(evento) {
    evento.preventDefault();
    try {
        const datos = {
            legajo: legajo.value,
            nombre: nombre.value,
            apellido: apellido.value,
            interno: interno.value,
            contacto: contacto.value,
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
        interno.value = contacto.interno;
        contacto.value = contacto.contacto;
        indice.value = index;
    }
};

function resetModal() {
    legajo.value = '';
    nombre.value = '';
    apellido.value = '';
    interno.value = '';
    contacto.value = '';
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


form.onsubmit = enviarDatos;
btnguardar.onclick = enviarDatos;
listarcontactos();
listarusuarios();
