const listaCategorias = document.getElementById("lista-categorias");
const modalCategoria = document.getElementById("modal-categoria");
const formCategoria = document.getElementById("form-categoria");
const inputNombre = document.getElementById("nombre-categoria");
const botonAbrirModal = document.getElementById("boton-añadir-categoria");
const botonCancelar = document.getElementById("boton-cancelar-cat");

//ejecuta las funcion al cargar
document.addEventListener("DOMContentLoaded", () => {
  cargarCategorias();

  //mostar el modal 
  botonAbrirModal.addEventListener("click", () => {
    inputNombre.value="";
    modalCategoria.showModal();
  });
  //cerrar el modal
  botonCancelar.addEventListener("click", () => {
    modalCategoria.close();
  });
  //guardad
  formCategoria.addEventListener("submit", crearCategoria);
});

async function cargarCategorias() {
    //llama a la funcion y la guarda en const
    const categorias = await api.getCategories();
    listaCategorias.innerHTML = "";
    // Crea la lista con los 
    categorias.forEach((categoria) => {
        const li = document.createElement("li");
        li.textContent = categoria.name;
        listaCategorias.appendChild(li);
    }) 
}

async function crearCategoria(evento) {
    evento.preventDefault();
    
    //quitar espacios vacios y valida que no sea vacio
    const nombre = inputNombre.value.trim();
    if(!nombre){
        alert("Nombre obligatorio");
        return;
    }
    await api.createCategory(nombre);

    modalCategoria.close();
    cargarCategorias();
}