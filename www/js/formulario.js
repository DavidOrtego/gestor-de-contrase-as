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
const btnGenerarPassword = document.getElementById("btn-generar-pass")

btnCancelar.addEventListener("click", () => {
  window.location.href = "index.html";
});

function generarPassword(longitud = 8) {
    const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const minusculas = "abcdefghijklmnopqrstuvwxyz";
    const numeros = "0123456789";
    const simbolos = "!@#$%&*?_-";
    const todos = mayusculas + minusculas + numeros + simbolos;

    let password = [
        mayusculas[Math.floor(Math.random()*mayusculas.length)],
        minusculas[Math.floor(Math.random() * minusculas.length)],
        numeros[Math.floor(Math.random() * numeros.length)],
        simbolos[Math.floor(Math.random() * simbolos.length)],
    ];
    for (let i = password.length; i < longitud; i++){
        password.push(todos[Math.floor(Math.random() * todos.length)])
    }

    return password.sort(() => Math.random() - 0.5).join("");
}

btnGenerarPassword.addEventListener("click", () => {
    inputPassword.value = generarPassword(8);
})
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
