//FUNCTION CARGAR JUEGOS
document.addEventListener("DOMContentLoaded", () =>{

let paginaActual = 0;
const btn = document.getElementById("btn-aplicar-filtros");

btn.addEventListener("click", aplicarFiltros);
let juegosActuales = [];


let ordenActual = "";
let juegoEditandoId = null; //null=estamos creando, numero = estamos editando.

//Carga los juegos
function cargarJuegos(urlPersonalizada) { 

    let url = urlPersonalizada ?? `http://localhost:8080/juegos?page=${paginaActual}&size=3`;

    if(ordenActual){
        switch (ordenActual) {
            case "nombre":
                url += "&sort=nombre,asc";
                break;
            case "genero":
                url += "&sort=genero,asc";
                break;
            case "estado":
                url += "&sort=estado,asc";
                break;
            case "mas-duracion":
                url += "&sort=duracion,desc";
                break;
            case "menor-duracion":
                url += "&sort=duracion,asc";
                break;
        }
    }

    fetch(url,{cache:"no-store"})
    .then(response => response.json())
    .then(data => {
        const juegos = data.content ?? data;
        juegosActuales = juegos;


        document.getElementById("info-pagina").innerText = `Pagina ${paginaActual + 1} de ${data.totalPages}`;
        document.getElementById("anterior").disabled = data.first;
        document.getElementById("siguiente").disabled = data.last;

        ocultarFiltros(data.totalElements);
        
        mostrarJuegos(juegos);
    });
}

//Ocultar filtros y demas
function ocultarFiltros(totalElementos){
     const btnFiltros = document.getElementById("btn-aplicar-filtros");
    const estado = document.getElementById("filtro-estado");
    const genero = document.getElementById("filtro-genero");
    const ordenar = document.getElementById("orden-tipo");

    const deshabilitar = totalElementos === 0;

    btnFiltros.disabled = deshabilitar;
    ordenar.disabled = deshabilitar;
    estado.disabled = deshabilitar;
    genero.disabled = deshabilitar;
        }




//Mostrar Juegos
function mostrarJuegos(juegos){
     const contenedor = document.getElementById("lista-juegos");
    contenedor.innerHTML = "";


    if(juegos.length === 0){
        const mensaje = document.createElement("p");
        mensaje.classList.add("estado-vacio");
        mensaje.textContent = "No hay juegos para mostrar";
        contenedor.appendChild(mensaje);
        return;
    }

    juegos.forEach(juego => {
        const div = document.createElement("div");
        const texto = document.createElement("span");

        texto.innerText =
        "Nombre: " + juego.nombre +
        " | Género: " + juego.genero +
        " | Estado: " + juego.estado +
        " | Duración: " + juego.duracion;

        const botonBorrar = document.createElement("button");
        botonBorrar.innerText = "Borrar";

        botonBorrar.classList.add("borrar")
        
        botonBorrar.addEventListener("click",function(){
            borrarJuego(juego.id);});

        const botonEditar = document.createElement("button");
        botonEditar.innerText = "Editar";

        botonEditar.addEventListener("click", function(){
            cargarFormularioParaEditar(juego);});


        

        div.appendChild(texto);
        div.appendChild(botonEditar);
        div.appendChild(botonBorrar);
        
        
        contenedor.appendChild(div);
    });
}

//Funcion de filtro
function aplicarFiltros(){
    paginaActual = 0;

    const genero = document.getElementById("filtro-genero").value;
    const estado = document.getElementById("filtro-estado").value;

    let url = "http://localhost:8080/juegos?";

    if (genero){
        url += "genero=" + genero + "&";
    }

    if(estado){
        url += "estado=" + estado + "&";
    }

    url += "page=0&size=3";

    console.log("URL final:", url);

    cargarJuegos(url);
}

//Funcion ordenar

const selectOrden = document.getElementById("orden-tipo");

selectOrden.addEventListener("change", () => {
    ordenActual = selectOrden.value;
    paginaActual = 0;
    cargarJuegos();
})

cargarJuegos();

//PAGINACION
document.getElementById("anterior").onclick = () => {
    if(paginaActual > 0){
        paginaActual--;
        cargarJuegos();
    }
};

document.getElementById("siguiente").onclick = () => {
    paginaActual++;
    cargarJuegos();
}


//FUNCTION BORRAR JUEGO
function borrarJuego(id) {
    const confirmado = confirm("Seguro que quiere borrar este juego?");
    
    if(!confirmado){
        return;
    }

    fetch("http://localhost:8080/juegos/" + id, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {       
            throw new Error("Error al borrar");
        }
        return response.text();
    })
    .then(() => {
        if(juegoEditandoId === id){
            terminarEdicion();
        }
        if(juegosActuales.length === 1 && paginaActual > 0){
            paginaActual--;
        }
        mostrarMensaje("Juego borrado con exito!");
        cargarJuegos(); // refresca la lista
    })
    .catch(error => {
        console.error(error);
        mostrarMensaje("Error al borrar el juego", "error");
    });
}

//FUNCTION CARGAR FORMULARIO
function cargarFormularioParaEditar(juego){
    document.getElementById("nombre").value = juego.nombre;
    document.getElementById("genero").value = juego.genero;
    document.getElementById("estado").value = juego.estado;
    document.getElementById("duracion").value = juego.duracion;
    juegoEditandoId = juego.id;
    botonCrear.textContent = "Guardar";//Intento cambiar nombre de boton crear
    document.getElementById("cancelar").style.display = "inline";
}

//FUNCION TERMINAR EDICION
function terminarEdicion(){
    juegoEditandoId = null;
    botonCrear.textContent = "Crear Juego";//Intento cambiar nombre de boton crear
    document.getElementById("cancelar").style.display = "none";
        
    document.getElementById("nombre").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("duracion").value = "";
}

document.getElementById("cancelar").addEventListener("click", () => {
    terminarEdicion();
})

//Funcion que muestra mensajes varios
function mostrarMensaje(texto, tipo = "exito", contenedor = "mensaje-juegos"){
    const div = document.getElementById(contenedor);
    if(!div) return;

    div.textContent = texto;
    div.classList.remove("exito","error");
    div.classList.add("mens","visible",tipo);
    /*div.className = "mens visible " + tipo;
    div.style.display = "block";*/

    setTimeout(() =>{
        div.classList.remove("visible");
    }, 3000);
}


//Funcion que muestra los Errores
function mostrarError(idCampo, mensaje){
    const campo = document.getElementById(idCampo);
    campo.classList.add("error");
    campo.querySelector(".error-text").textContent = mensaje;
}

//Limpia Errores
function limpiarErrores(){
    document.querySelectorAll(".campo").forEach(campo => {
        campo.classList.remove("error");
        const small = campo.querySelector(".error-text");
        if(small) small.textContent = "";
    });
}


//CREAR
const botonCrear = document.getElementById("crear");

botonCrear.addEventListener("click", function (event) {
    event.preventDefault(); // evita que el form recargue la página
    limpiarErrores();
    let hayError = false;

    const nombre = document.getElementById("nombre").value;
    const genero = document.getElementById("genero").value;
    const estado = document.getElementById("estado").value;
    const duracion = document.getElementById("duracion").value;


    if (!nombre) {
        mostrarError("campo-nombre", "El nombre es obligatorio");
        hayError = true;
    }

    if(!genero){
        mostrarError("campo-genero", "Seleccione un genero");
        hayError = true;
    }

    if(!estado){
        mostrarError("campo-estado","Seleccione un estado");
        hayError = true;
    }

    if (isNaN(duracion) || duracion <= 0) {
        mostrarError("campo-duracion","La duracion debe ser un numero valido");
        hayError = true;
    }

    if(hayError) return;

    const juego = {
        nombre: nombre,
        genero: genero,
        estado: estado,
        duracion: parseInt(duracion)
    };
    
    let url = "http://localhost:8080/juegos";
    let method = "POST";
    
    if (juegoEditandoId !== null) {
        url += "/" + juegoEditandoId;
        method = "PUT";
         mostrarMensaje("Juego editado correctamente","exito","mensaje-form");
    } else {
        mostrarMensaje("Juego creado correctamente","exito","mensaje-form");
    }

   fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(juego)
    })

    .then(response => {
        if (!response.ok) {
            throw new Error("Error al crear el juego");
        }
        return response.text(); // o json si devolvés objeto
    })
    .then(data => {
        console.log(data);
        cargarJuegos();

        juegoEditandoId = null;
        botonCrear.textContent = "Crear Juego";//Intento cambiar nombre de boton crear
        document.getElementById("cancelar").style.display = "none";
        
        document.getElementById("nombre").value = "";
        document.getElementById("genero").value = "";
        document.getElementById("estado").value = "";
        document.getElementById("duracion").value = "";

    })
    .catch(error => {
        console.error(error);
    });
});
});

