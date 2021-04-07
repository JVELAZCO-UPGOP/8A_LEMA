const listaMascotas = document.getElementById('lista-mascota');
const tipo = document.getElementById('tipo');
const nombre = document.getElementById('nombre');
const dueno = document.getElementById('dueno');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const Title = document.getElementById('exampleModalLongTitle');

let mascotas = [
    {
    tipo: "Gato",
    nombre: "manchas",
    dueno: "Luis"
    },
    {
      tipo: "Perro",
      nombre: "iggy",
      dueno: "Ricardo"
      }
];

function listarMascotas() {
    const htmlMascotas = mascotas.map((mascota, index)=>`<tr>
    <th scope="row">${index}</th>
    <td>${mascota.tipo}</td>
    <td>${mascota.nombre}</td>
    <td>${mascota.dueno}</td>
    <td>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
        <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
      </div>
    </td>
  </tr>`).join(""); 

  listaMascotas.innerHTML = htmlMascotas;
  Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
  Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));

}

function enviarDatos(evento) {
  evento.preventDefault();
  const datos = {
  tipo: tipo.value,
  nombre: nombre.value,
  dueno: dueno.value
  };
  const accion = btnGuardar.innerHTML;
  switch(accion){
    case 'Editar':
      mascotas[indice.value] = datos;
      break;
      default:
      mascotas.push(datos);
      break;
  }
    listarMascotas();
    restModal();
}

function editar(index)
{  
return function cuandoCliqueo() {
  btnGuardar.innerHTML = 'Editar'
  Title.innerHTML = 'Editar Mascota'
  $('#exampleModalCenter').modal('toggle',{
    escapeClose: false,
    clickClose: false});
  const mascota = mascotas[index];
  nombre.value = mascota.nombre;
  dueno.value = mascota.dueno;
  tipo.value = mascota.tipo;
  indice.value = index;
  }
}

function restModal(){
  nombre.value = '';
  dueno.value = 'Dueño';
  tipo.value = 'Tipo de animal';
  indice.value = '';
  btnGuardar.innerHTML = 'Guardar'
}

function eliminar(index){
  return function clickEnEliminar()
  {
  mascotas = mascotas.filter((mascota, indiceMascota)=>indiceMascota !== index);
  listarMascotas();
  }
}

listarMascotas();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;