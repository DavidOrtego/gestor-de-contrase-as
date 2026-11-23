const listaCategorias = document.getElementById("lista-categorias");
const modalCategoria = document.getElementById("modal-categoria");
const formCategoria = document.getElementById("form-categoria");
const inputNombre = document.getElementById("nombre-categoria");
const botonAbrirModal = document.getElementById("boton-añadir-categoria");
const botonCancelar = document.getElementById("boton-cancelar-cat");
const tablaLugares = document.getElementById("lugares");
const botonAñadirSitio = document.getElementById("boton-añadir-sitio");

let categoriaSeleccionadaId = null;

//ejecuta las funcion al cargar
document.addEventListener("DOMContentLoaded", () => {
  cargarCategorias();

  //mostar el modal
  botonAbrirModal.addEventListener("click", () => {
    inputNombre.value = "";
    modalCategoria.showModal();
  });
  //cerrar el modal
  botonCancelar.addEventListener("click", () => {
    modalCategoria.close();
  });
  //guardad
  formCategoria.addEventListener("submit", crearCategoria);

  //boton del formulario
  const botonAñadirSitio = document.getElementById("boton-añadir-sitio");
  botonAñadirSitio.addEventListener("click", () => {
    if (!categoriaSeleccionadaId) {
      alert("Selecciona primero una categoría.");
      return;
    }
    window.location.href = `formulario.html?categoryId=${categoriaSeleccionadaId}`;
  });
});

async function cargarCategorias() {
  //llama a la funcion y la guarda en const
  const categorias = await api.getCategories();
  listaCategorias.innerHTML = "";
  // Crea la lista
  categorias.forEach((categoria) => {
    const li = document.createElement("li");
    const nombre = document.createElement("span");
    nombre.textContent = categoria.name;

    const botonEli = document.createElement("button");
    botonEli.textContent = "❌";

    // evento que elimina categoria
    botonEli.addEventListener("click", async (evento) => {
      evento.stopPropagation();
      await api.deleteCategory(categoria.id);
      cargarCategorias();
      cargarSitios();
    });

    //mostar sitos al pulsar categoria
    li.addEventListener("click", async () => {
      categoriaSeleccionadaId = categoria.id;
      document.querySelectorAll("#lista-categorias li").forEach((item) => {
        item.classList.remove("seleccionada");
      });
      li.classList.add("seleccionada");
      cargarSitios(categoria.id);
    })
    li.appendChild(nombre);
    li.appendChild(botonEli);
    listaCategorias.appendChild(li);
  });
}

async function crearCategoria(evento) {
  evento.preventDefault();

  //quitar espacios vacios y valida que no sea vacio
  const nombre = inputNombre.value.trim();
  if (!nombre) {
    alert("Nombre obligatorio");
    return;
  }
  await api.createCategory(nombre);

  modalCategoria.close();
  cargarCategorias();
}

async function cargarSitios(catId) {
  const sitios = await api.getSitesByCategory(catId);
  tablaLugares.innerHTML = "";

  sitios.forEach((sitio) => {
    const tr = document.createElement("tr");

    const sites = document.createElement("td");
    sites.textContent = sitio.name;

    const user = document.createElement("td");
    user.textContent = sitio.user;

    const password = document.createElement("td");
    password.textContent = "*********"; //ocultar contraseña
    password.style.cursor = "pointer";

    let visible = false; // cuando haces click muestra la contraseña
    password.addEventListener("click", () => {
      visible = !visible;
      password.textContent = visible ? sitio.password : "*********";
    });

    const acciones = document.createElement("td");

    const botonUrl = document.createElement("button");
    botonUrl.textContent = "🔗";
    botonUrl.title = "Ir al sitio";
    botonUrl.addEventListener("click", () => {
      window.open(sitio.url, "_blank");
    });

    const botonEditar = document.createElement("button");
    botonEditar.textContent = "✏️";
    botonEditar.title = "Modificar sitio";
    botonEditar.addEventListener("click", () => {
      window.location.href = `formulario.html?categoryId=${catId}&siteId=${sitio.id}`;
    });

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "🗑️";
    botonEliminar.title = "Eliminar sitio";
    botonEliminar.addEventListener("click", async () => {
      if (confirm(`¿Seguro que deseas eliminar "${sitio.name}"?`)) {
        await api.deleteSite(sitio.id);
        cargarSitios(catId);
      }
    });
    acciones.appendChild(botonUrl);
    acciones.appendChild(botonEditar);
    acciones.appendChild(botonEliminar);

    tr.appendChild(sites);
    tr.appendChild(user);
    tr.appendChild(password);
    tr.appendChild(acciones);
    tablaLugares.appendChild(tr);
  });
  
}