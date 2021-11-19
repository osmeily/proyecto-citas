let email;
let pass;
let boton =  document.getElementById("login-btn")
var localStorage = window.localStorage;



boton.addEventListener('click', (e) => {
    e.preventDefault();
    email = document.getElementById('email').value;
    pass = document.getElementById('password').value;
    if(email == localStorage.getItem("email") && pass == localStorage.getItem("pass")){
        window.location.href="./index.html"
        console.log("Login exitoso")
        localStorage.setItem("isLogged", "1")
    }else{
        Swal.fire("Falló el inicio de sesión")
    }
})

