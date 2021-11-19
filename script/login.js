let nombre;
let email;
let pass;

var localStorage = window.localStorage;
const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    leer();
})


function leer() {
    nombre = document.getElementById('nombre').value;
    email = document.getElementById('email').value;
    pass = document.getElementById('password').value;

    localStorage.setItem('nombre', nombre);
    localStorage.setItem('email', email);
    localStorage.setItem('pass', pass);
    }


function mostrar() {
    let nombreLocal = localStorage.getItem('nombre');
    console.log(nombreLocal)
}