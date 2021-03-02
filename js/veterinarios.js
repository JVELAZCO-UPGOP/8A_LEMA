const tipo = document.getElementById('pais');
const nombre = document.getElementById('nombre');
const indentificacion = document.getElementById('identificacion');
const apellido = document.getElementById('apellido');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const listaVeterinarias = document.getElementById('lista-veterinarias');
const Title = document.getElementById('exampleModalLongTitle');
let veterinarias = [
    {
    nombre: "Naryie",
    apellido: "Vasquez",
    pais: "Colombia",
    indentificacion: "1234567890"
    },
    {
        nombre: "luis",
        apellido: "Vasquez",
        pais: "Colombia",
        indentificacion: "1234567891"
      }
];

function listarVeterinarias() {
    const htmlVeterinarias = veterinarias.map((veterinaria, index)=>`<tr>
    <th scope="row">${index}</th>
    <td>${veterinaria.indentificacion}</td>
    <td>${veterinaria.pais}</td>
    <td>${veterinaria.nombre}</td>
    <td>${veterinaria.apellido}</td>
    <td>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-info editar" ><i class="fas fa-edit"></i></button>
        <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
      </div>
    </td>
  </tr>`).join(""); 

  listaVeterinarias.innerHTML = htmlVeterinarias;
  Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
  Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));

}

function enviarDatos(evento) {
  evento.preventDefault();
  const datos = {
  nombre: nombre.value,
  apellido: apellido.value,
  pais: pais.value,
  indentificacion: indentificacion.value,
  };
  const accion = btnGuardar.innerHTML;
  switch(accion){
    case 'Editar':
      veterinarias[indice.value] = datos;
      break;
      default:
        veterinarias.push(datos);
        break;
  }
    listarVeterinarias();
    restModal();
}

function editar(index)
{  
return function cuandoCliqueo() {
  btnGuardar.innerHTML = 'Editar'
  Title.innerHTML = 'Editar Veterinaria'
  $('#exampleModalCenter').modal('toggle',{backdrop: 'static',keyboard: false });
  $('#exampleModalCenter').modal({backdrop: 'static',keyboard: false });
  indice.value = index;
  const veterinaria = veterinarias[index];
  nombre.value = veterinaria.nombre;
  apellido.value = veterinaria.apellido;
  pais.value = veterinaria.pais;
  indentificacion.value = veterinaria.indentificacion;
  }
}

function restModal(){
    indice.value='';
    nombre.value ='';
    apellido.value='';
    pais.value='País';
    indentificacion.value='';
  btnGuardar.innerHTML = 'Crear'
}

function eliminar(index){
  return function clickEnEliminar()
  {
  veterinarias = veterinarias.filter((veterinaria, indiceVeterinaria)=>indiceVeterinaria !== index);
  listarVeterinarias();
  }
}

listarVeterinarias();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;