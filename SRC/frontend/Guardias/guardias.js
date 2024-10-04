const listaguardias = document.getElementById("lista-guardias");
const usuario = document.getElementById("usuario");
const grupo = document.getElementById("grupo");
const contacto = document.getElementById("contacto");
const horario = document.getElementById("horario");
const indice = document.getElementById("indice");
const btnGuardar = document.getElementById("btn-guardar");


const url = "http://localhost:4000";

let guardias = [];
let usuarios = [];

async function listarguardias() {
  const entidad = "guardias";
  try {
    const respuesta = await fetch(`${url}/${entidad}`);
    const guardiasDelServidor = await respuesta.json();
    if (Array.isArray(guardiasDelServidor)) {
      guardias = guardiasDelServidor;
    }
    if (respuesta.ok) {
      const htmlguardias = guardias
        .map(
          (guardia, indice) =>
            `<tr>
          <th scope="row">${indice}</th>
          <td>${guardia.usuario.nombre} ${guardia.usuario.apellido}</td>
          <td>${guardia.usuario.grupo}</td>
          <td>${guardia.usuario.contacto}</td>
          <td>${guardia.horario}</td>
          <td>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#exampleModalCenter" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg></button>
              </div>
          </td>
        </tr>`
        )
        .join("");
      listaguardias.innerHTML = htmlguardias;
      Array.from(document.getElementsByClassName("editar")).forEach(
        (botonEditar, index) => (botonEditar.onclick = editar(index))
      );
    }
  } catch (error) {
    console.log({ error });
    $(".alert-danger").show();
  }
}


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
        optionActual.innerHTML = `${_usuario.nombre} ${_usuario.apellido} ${_usuario.grupo} ${_usuario.contacto}`;
        optionActual.value = indice;
        usuario.appendChild(optionActual);
      });
    }
  } catch (error) {
    console.log({ error });
    $(".alert-danger").show();
  }
}

function editar(index) {
  return function cuandoCliqueo() {
    btnGuardar.innerHTML = "Editar";
    $("#exampleModalCenter").modal("toggle");
    const guardia = guardias[index];
    indice.value = index;
    contacto.value = guardia.contacto.id;
    usuario.value = guardia.legajo.id;
    horario.value = guardia.horario;
    grupo.value = guardia.grupo;
  };
}

async function enviarDatos(evento) {
  const entidad = "guardias";
  evento.preventDefault();
  try {
    const datos = {
      contacto: contacto.value,
      legajo: legajo.value,
      horario: horario.value,
      grupo: grupo.value,

    };
    if (validar(datos) === true) {
      const accion = btnGuardar.innerHTML;
      let urlEnvio = `${url}/${entidad}`;
      let method = "POST";
      if (accion === "Editar") {
        urlEnvio += `/${indice.value}`;
        method = "PUT";
      }
      const respuesta = await fetch(urlEnvio, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
        mode: "cors",
      });
      if (respuesta.ok) {
        listarguardias();
        resetModal();
      }
      formulario.classList.add("was-validated");
      return;
    }
    $(".alert-warning").show();
  } catch (error) {
    console.log({ error });
    $(".alert-danger").show();
  }
}


function resetModal (){
  btnGuardar.innerHTML = 'Crear';
  [indice,legajo,grupo,contacto,horario].forEach((imputActual)=>{
    imputActual.value = "";
    imputActual.classList.remove("is-invalid");
    imputActual.classList.remove("is-valid");

  }
);
    $(".alert-warning").hide();
    $("#exampleModalCenter").modal("toggle");
}


btnGuardar.onclick = enviarDatos;

listarguardias();
listarusuarios();