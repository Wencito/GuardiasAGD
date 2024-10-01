const listaduenos = document.getElementById("lista-duenos");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const documento = document.getElementById("documento");
const form = document.getElementById("form");
const indice = document.getElementById("indice");
const btnguardar = document.getElementById("btn-guardar");
const url = "http://localhost:4000/Usuarios";

let duenos = [];

async function listarduenos () {
    try {
        const respuesta = await fetch(url);
        const duenosDelServer = await respuesta.json();
    if(Array.isArray(duenosDelServer)){
        duenos = duenosDelServer;
    }
    if (duenos.length > 0){
        const htmlduenos = duenos.map((dueno, index)=> 
            `<tr>
                <th scope="row">${index}</th>
                <td>${dueno.documento}</td>
                <td>${dueno.nombre}</td>
                <td>${dueno.apellido}</td>
                <td>
                  <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#exampleModalCenter"><i class="bi bi-pencil-square"></i></button>
                      <button type="button" class="btn btn-danger eliminar"><i class="bi bi-trash"></i></button>
                  </div>
                </td>
            </tr>`).join("");
            listaduenos.innerHTML = htmlduenos;
            Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
            Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
        return;
        }
        listaduenos.innerHTML = `<tr>
                <td class="TabNo" colspan="5">No hay dueñ@s</td>
            </tr>`;
    } catch (error) {
        console.log({error});
        $(".alert").show();
    }
};

async function enviarDatos(evento){
    evento.preventDefault();
    try {
        const datos = {
            nombre: nombre.value,
            apellido: apellido.value,
            documento: documento.value
        };
        let method = "POST";
        let urlEnvio = url;
        const accion = btnguardar.innerHTML;
        if(accion === 'Editar') {
            //Editar
            method = "PUT";
            duenos[indice.value] = datos;
            urlEnvio = `${url}/${indice.value}`;
        };
        const respuesta = await fetch(urlEnvio, {
            method, 
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });
        if(respuesta.ok){
            listarduenos();
            resetModal();
        };
    } catch (error) {
        console.log({error});
        $(".alert").show();
    };
};

function editar(index) {
    return function cuandoCliqueo(){
       btnguardar.innerHTML = 'Editar';
       $('#exampleModalCenter').modal('toggle')
       const dueno = duenos[index];
       nombre.value = dueno.nombre;
       apellido.value = dueno.apellido;
       documento.value = dueno.documento;
       indice.value = index;
    }
};

function resetModal (){
    nombre.value = '';
    apellido.value = '';
    documento.value = '';
    indice.value = '';
    btnguardar.innerHTML = 'Crear';
}

function eliminar(index){
    const urlEnvio = `${url}/${index}`
    return async function clickEliminar(){
        try {
            const respuesta = await fetch(urlEnvio, {
                method: "DELETE", 
            });
            if(respuesta.ok){
                listarduenos();
                resetModal();
            };
        } catch (error) {
            console.log({error});
            $(".alert").show();
        }
    }
}

listarduenos();

form.onsubmit=enviarDatos;
btnguardar.onclick = enviarDatos;