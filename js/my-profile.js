//Funcion que se encarga de validar los campos del formulario de perfil
(function () {
    'use strict';
    window.addEventListener('load', function () {
        var form = document.getElementsByClassName('needs-validation'); //obtengo clase necesita validar
        var validation = Array.prototype.filter.call(form, function (form) {  
            form.addEventListener('submit', function (event) { //obtengo el evento submit
                if (form.checkValidity() === false) { 
                    event.preventDefault(); 
                    event.stopPropagation(); 
                }
                form.classList.add('was-validated'); //agrego clase was-validated
            }, false);
        });
    }, false);
})();




//Evento que se encarga de guardar los datos del usuario en el localStorage
document.getElementById('user-data').addEventListener('submit', function (e) {
    e.preventDefault(); //evita que se recargue la pagina
    let urlImg = document.getElementById('url-image').value;
    let name = document.getElementById('name').value;
    let lastname = document.getElementById('lastname').value;
    let age = document.getElementById('age').value;
    let username = document.getElementById('username').value;
    let cellphone = document.getElementById('cellphone').value;
    
    let usuario = { //objeto usuario
        urlImg: urlImg,
        name: name,
        lastname: lastname,
        age: age,
        username: username,
        cellphone: cellphone,
    }
    
    localStorage.setItem('usuario.email', JSON.stringify(usuario)); //
});

//___________________________________________________________________________________________


document.addEventListener("DOMContentLoaded", function (e) {

    usuario = JSON.parse(localStorage.getItem('userLogged')); //convierte el string usuario en un objeto
    let usuarioGuardado = localStorage.getItem('usuario.email');//usuario guardado en local storage

    if (usuarioGuardado) {
        usuarioGuardado = JSON.parse(usuarioGuardado); //json de usuario guardado en local storage
        let urlImg = document.getElementById('url-image').value = usuarioGuardado.urlImg; 
        document.getElementById('image').src = urlImg;
        document.getElementById('name').value = usuarioGuardado.name;
        document.getElementById('lastname').value = usuarioGuardado.lastname;
        document.getElementById('age').value = usuarioGuardado.age;
        document.getElementById('username').value = usuarioGuardado.username;
        document.getElementById('cellphone').value = usuarioGuardado.cellphone;

    }
});

//Función que se encarga de cargar la imagen mediante una url externa 

document.getElementById('url-image').addEventListener('change', function () {
    let urlImg = document.getElementById('url-image').value;
    document.getElementById('image').src = urlImg;
});


