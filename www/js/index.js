const listaCategorias = document.getElementById("lista-categorias");


//ejecuta las funcion al cargar
document.addEventListener("DOMContentLoaded", () => {
  cargarCategorias();
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
