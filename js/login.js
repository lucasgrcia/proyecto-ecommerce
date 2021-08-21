//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
function validacion() {
     let usuario = document.getElementById("inputUser");
    let password = document.getElementById("inputPassword");
    if ((usuario.value !== "") && (password.value !=="")) {
        window.location.href = "home.html";
} else {
    alert("Completa los campos de información!")
    }
}


   validacion();
});