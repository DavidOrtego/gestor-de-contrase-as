const params = new URLSearchParams(window.location.search);
const categoryId = params.get("categoryId");

if(!categoryId) {
    alert("No se encontrado categoria");
    window.location.href = "index.html"
}

const formSitio = document.getElementById("form-sitio");
const inputNombre = document.getElementById("sitio-nombre");
const inputUsuario = document.getElementById("sitio-usuario");
const inputPassword = document.getElementById("sitio-password");
const inputUrl = document.getElementById("sitio-url");
const btnCancelar = document.getElementById("btn-cancelar");

btnCancelar.addEventListener("click", () => {
  window.location.href = "index.html";
});

formSitio.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nuevoSitio = {
        name: inputNombre.value.trim(),
        user: inputUsuario.value.trim(),
        password: inputPassword.value.trim(),
        url: inputUrl.value.trim(),
        categoryId: Number(categoryId) || categoryId,
    };

    try {
        await api.createSite(nuevoSitio);
        window.location.href = "index.html";
    }catch(error){
        alert("error al crear el sitio")
        console.error(error);
    }
});