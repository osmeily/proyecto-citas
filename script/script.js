let form = document.getElementById("formulario")
let citas = []
let listarCitas = document.getElementById("listarCitas")
let buscar = document.getElementById("btnBuscar")
let busqueda = document.getElementById("busqueda")
let barra = document.getElementById("barra")


if (localStorage.getItem('citas')) {
    citas = JSON.parse(localStorage.getItem('citas'));
}

const capturarDatos = () => {
    let nombre = document.getElementById("nombre").value
    let fecha = document.getElementById("fecha").value
    let hora = document.getElementById("hora").value
    let sintomas = document.getElementById("sintomas").value
    let id;

    if(citas.length){
        id = citas.length
    } else {
        id = 0
    }

    let registro = {
        id,
        nombre,
        fecha,
        hora,
        sintomas
    }

    swal.fire({
        title: '¿Quieres agendar la cita?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `No guardar`,
    }).then((result) => {
        if (result.isConfirmed) {
        swal.fire('Agenda guardada!', '', 'success')
        citas.unshift(registro)
        localStorage.setItem("citas", JSON.stringify(citas)) 
        pintarDatos()
        } else if (result.isDenied) {
        swal.fire('La agenda no fue guardada', '', 'info')
        }
    })

    form.reset()
}
var isLogged = Number(localStorage.getItem("isLogged"))

if(isLogged){
    barra.innerHTML += `
    <div class="datos">
        <ul class="navbar-nav">
            <li class="nav-item">Hola de nuevo, ${localStorage.getItem("nombre")}!</li>
        </ul>
    </div>
`
}

form.addEventListener("submit", e => {
    e.preventDefault()
    capturarDatos()
})

const pintarDatos = () => {
    listarCitas.innerHTML = ""
    let citasLocalStorage = JSON.parse(localStorage.getItem("citas"))
    console.log(citasLocalStorage);

    citasLocalStorage.map(cita =>{
        const {nombre, fecha, hora, sintomas} = cita;
        listarCitas.innerHTML += `
            <tr>
                <td>${nombre}</td>
                <td>${fecha}</td>
                <td>${hora}</td>
                <td>${sintomas}</td>
            </tr>
        `
    })
}

document.addEventListener("DOMContentLoaded", pintarDatos())

buscar.addEventListener("click", e =>{
    e.preventDefault()
    let input = document.getElementById("inputBuscar").value
    let data = JSON.parse(localStorage.getItem("citas"))
    let filtro = data.filter(cita => cita.nombre.toLowerCase() === input.toLowerCase())
    console.log(filtro)

    filtro.length === 0 
    ? busqueda.innerHTML = `
    <div>El nombre ${input} no existe</div>
    `
    :
    filtro.map((cita)=> {
        const {nombre, fecha, hora, sintomas, id} = cita
        busqueda.innerHTML =`
        <div style="color: white">${nombre}</div>
        <div style="color: white">${fecha}</div>
        <div style="color: white">${hora}</div>
        <div style="color: white">${sintomas}
        <button id="${id}">Borrar</button>
        </div>
        `

        document.getElementById(id).addEventListener("click", e =>{
            e.preventDefault();
            for(let i=0; i < citas.length; i++){
                if(citas[i].id == id){
                    citas.splice(i,1)
                    busqueda.innerHTML=""
                    citasLocalStorage =localStorage.setItem("citas", JSON.stringify(citas)) 
                    pintarDatos()
                }
            }
            
        })
    })
})


/*
Buscar y borrar el elemento en el array por el id que encontramos
Decirle al localStorage que el elemento citas ahora vale lo que contiene nuestro array citas pero stringyficado
Limpiar el innerhtml que antes habíamos pintado
*/
