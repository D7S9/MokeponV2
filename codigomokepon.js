
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMokeponJugador = document.getElementById('boton-mokepon')

const botonReinicio = document.getElementById('boton-reiniciar')

const sectionSeleccionarMokepon = document.getElementById("seleccionar-mokepon")

const spanMokeponJugador = document.getElementById("mascota-jugador")

const spanMokeponEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidasJugador")
const spanVidasEnemigo = document.getElementById("vidasEnemigo")

const msnresultado = document.getElementById("Resultado")
const msnataquesDelJugador = document.getElementById("ataquesDelJugador")
const msnataquesDelEnemigo = document.getElementById("ataquesDelEnemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")


// const botonArriba  = document.getElementById("arriba")
// const botonAbajo = document.getElementById("abajo")
// const botonDerecha   = document.getElementById("derecha")
// const botonizquierda   = document.getElementById("izquierda")


let jugadorId = null
let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputSprinkler 
let inputTerranova
let inputFireball
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego  
let botonTierra 
let botonAgua
// let botones = []
let direcciones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let jugador
let jugadorObjeto
let enemigo
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './mokemap.jpg'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if(anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,
        )
    }
}

let sprinkler = new Mokepon ('Sprinkler','./mokeponAgua.png', 3, './mokeponAgua.png')
let terranova = new Mokepon ('Terranova','./Bulbasaur.png', 3, './Bulbasaur.png')
let fireball = new Mokepon ('Fireball','./mokeponFuego.png', 3, './mokeponFuego.png')

let sprinklerEnemigo = new Mokepon ('Sprinkler','./mokeponAgua.png', 3, './mokeponAgua.png')
let terranovaEnemigo = new Mokepon ('Terranova','./Bulbasaur.png', 3, './Bulbasaur.png')
let fireballEnemigo = new Mokepon ('Fireball','./mokeponFuego.png', 3, './mokeponFuego.png')

sprinkler.ataques.push(
    { nombre:"💧", id:"boton-agua"},
    { nombre:"💧", id:"boton-agua"},
    { nombre:"💧", id:"boton-agua"},
    { nombre:"🔥", id:"boton-fuego"},
    { nombre:"☘️", id:"boton-tierra"},
)
sprinklerEnemigo.ataques.push(
    { nombre:"💧", id:"boton-agua"},
    { nombre:"💧", id:"boton-agua"},
    { nombre:"💧", id:"boton-agua"},
    { nombre:"🔥", id:"boton-fuego"},
    { nombre:"☘️", id:"boton-tierra"},
)
terranova.ataques.push(
    { nombre:"☘️", id:"boton-tierra"},
    { nombre:"☘️", id:"boton-tierra"},
    { nombre:"☘️", id:"boton-tierra"},
    { nombre:"💧", id:"boton-agua"},
    { nombre:"🔥", id:"boton-fuego"},
)
terranovaEnemigo.ataques.push(
    { nombre:"☘️", id:"boton-tierra"},
    { nombre:"☘️", id:"boton-tierra"},
    { nombre:"☘️", id:"boton-tierra"},
    { nombre:"💧", id:"boton-agua"},
    { nombre:"🔥", id:"boton-fuego"},
)
fireball.ataques.push(
    { nombre:"🔥", id:"boton-fuego"},
    { nombre:"🔥", id:"boton-fuego"},
    { nombre:"🔥", id:"boton-fuego"},
    { nombre:"💧", id:"boton-agua"},
    { nombre:"☘️", id:"boton-tierra"},
)
fireballEnemigo.ataques.push(
    { nombre:"🔥", id:"boton-fuego"},
    { nombre:"🔥", id:"boton-fuego"},
    { nombre:"🔥", id:"boton-fuego"},
    { nombre:"💧", id:"boton-agua"},
    { nombre:"☘️", id:"boton-tierra"},
)

mokepones.push(sprinkler,terranova,fireball)
// direcciones.push(botonArriba, botonAbajo, botonDerecha, botonizquierda)

function IniciarJuego() {

    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"

    mokepones.forEach((mokepon) => {
        
        opcionDeMokepones = `
        <input type="radio" name="mokepones" id=${mokepon.nombre} />
        <label class="tarjetaMokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto}  width="100" height="100">
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputSprinkler = document.getElementById('Sprinkler')
        inputTerranova = document.getElementById('Terranova')
        inputFireball  = document.getElementById('Fireball')
    })

    sectionReiniciar.style.display = "none"
    botonMokeponJugador.addEventListener('click', seleccionarMokeponJugador)

    botonReinicio.addEventListener('click',reiniciarJuego)

    unirseAlJuego()

}

function unirseAlJuego () {
    fetch("http://localhost:8080/unirse")
        .then(function(res) {
            if (res.ok) {
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
    
}



function seleccionarMokeponJugador() {

    sectionSeleccionarMokepon.style.display = "none"
    sectionVerMapa.style.display = "flex"


        if (inputSprinkler.checked ) {
            spanMokeponJugador.innerHTML = inputSprinkler.id
            jugador = inputSprinkler.id
        } else if (inputTerranova.checked ){
            spanMokeponJugador.innerHTML = inputTerranova.id
            jugador = inputTerranova.id
        } else if (inputFireball.checked ){
            spanMokeponJugador.innerHTML = inputFireball.id
            jugador = inputFireball.id
        } else {
            alert("ERROR EN LA SELECCION... TIENES QUE SELECCIONAR UN MOKEPON!")   
            reiniciarJuego() 
        }
        seleccionarMokepon (jugador)   
        extraerAtaques(jugador)
        iniciarMapa()
}

function seleccionarMokepon (jugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}` , {
        method: "post",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: jugador
        })    
    })
}

function extraerAtaques(jugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (jugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach(ataque => { 
        
        ataquesMokepon= `
        <button id=${ataque.id} class="botonAtaque">${ataque.nombre} </button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    }); 

    botonFuego  = document.getElementById("boton-fuego")
    botonTierra = document.getElementById("boton-tierra")
    botonAgua   = document.getElementById("boton-agua")
    botones = document.querySelectorAll(".botonAtaque")


}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === "☘️ ") {
                ataqueJugador.push("TIERRA☘️")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent === "💧 "){
                ataqueJugador.push("AGUA💧")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else {
                ataqueJugador.push("FUEGO🔥")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            ataquePC()
        })
    })
}

// function igualdad(){
//     if(enemigo == jugador){
//         eleccionMokeponEnemigo()
//     }
// }

function aleatorio(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let pc

function eleccionMokeponEnemigo(enemigo){
    
    spanMokeponEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    enemigoNombre = enemigo.nombre
    secuenciaAtaque()

    // igualdad()
}

let spanataqueJugador
let spanataqueEnemigo
let spanResultado


function ataquePC(){

    pc = aleatorio(0, ataquesMokeponEnemigo.length -1)

 if (pc == 0 || pc == 1) {
    ataqueEnemigo.push("FUEGO🔥")
 } else if (pc == 2 || pc == 3) {
    ataqueEnemigo.push("TIERRA☘️")
 } else {
    ataqueEnemigo.push("AGUA💧")
 }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){

    for (let index = 0; index < ataqueJugador.length; index++) {
        
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearmensaje("EMPATE")
        } else if ((ataqueJugador[index] === "AGUA💧" && ataqueEnemigo[index]  === "FUEGO🔥") || (ataqueJugador[index] === "FUEGO🔥" && ataqueEnemigo[index] === "TIERRA☘️") || (ataqueJugador[index] === "TIERRA☘️" && ataqueEnemigo[index] === "AGUA💧")){
            indexAmbosOponentes(index, index)
            crearmensaje("GANA " + jugador +"!!")
            victoriasJugador++ 
            spanVidasJugador.innerHTML = victoriasJugador 
        } else {
            indexAmbosOponentes(index, index)
            crearmensaje("GANA " + enemigo + "!!")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo  
        }
    }
eleccionGanador()
}

function eleccionGanador(){

    if ( victoriasJugador === victoriasEnemigo ){
        alert("EMPATE")
    crearmensaje2("FIN DEL JUEGO!!" + "EMPATE")
    } else if (victoriasJugador > victoriasEnemigo){
        alert("GANASTE!!")
    crearmensaje2("FIN DEL JUEGO!! GANA " + jugador + "!!")
    } else {
        alert("PERDISTE :(")
    crearmensaje2("FIN DEL JUEGO!! GANA " + enemigoNombre + "!!")
    }
}

function crearmensaje(resultado) {

    let parrafoAtaquesDelJugador= document.createElement("p")
    let parrafoAtaquesDelEnenemigo= document.createElement("p")
    
    msnresultado.innerHTML = resultado 
    parrafoAtaquesDelJugador.innerHTML = indexAtaqueJugador 
    parrafoAtaquesDelEnenemigo.innerHTML = indexAtaqueEnemigo 
 
    msnataquesDelJugador.appendChild(parrafoAtaquesDelJugador)
    msnataquesDelEnemigo.appendChild(parrafoAtaquesDelEnenemigo)

}

function crearmensaje2(veredicto) {

    sectionReiniciar.style.display = "block"
    msnresultado.innerHTML = veredicto 

}

function reiniciarJuego() {
    location.reload()
}

function pintarCanvas() {
    jugadorObjeto.x = jugadorObjeto.x + jugadorObjeto.velocidadX
    jugadorObjeto.y = jugadorObjeto.y + jugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height,

    )
    jugadorObjeto.pintarMokepon()

    enviarPosicion(jugadorObjeto.x, jugadorObjeto.y)

    sprinklerEnemigo.pintarMokepon()
    terranovaEnemigo.pintarMokepon() 
    fireballEnemigo.pintarMokepon()
    if(jugadorObjeto.velocidadX != 0 || jugadorObjeto.velocidadY != 0 ) {
        revisarColision(sprinklerEnemigo)
        revisarColision(terranovaEnemigo)
        revisarColision(fireballEnemigo)
    }
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x, 
            y
        })
    })
}

function MovimientoArriba() {
    jugadorObjeto.velocidadY = -5
}
function MovimientoAbajo() {
    jugadorObjeto.velocidadY = +5
}
function MovimientoDerecha() {
    jugadorObjeto.velocidadX = +5
}
function MovimientoIzquierda() {
    jugadorObjeto.velocidadX = -5 
}

// function MovimientoMokepon() {
//     direcciones.forEach((direccion) => {
//         direccion.addEventListener('mousedown', (e) => {
//             if (e.target.textContent === "Up") {
//                 terranova.velocidadY = -5
//             } else if (e.target.textContent === "Down"){
//                 terranova.velocidadY = +5
//             } else if (e.target.textContent === "Right"){
//                 terranova.velocidadX = +5
//             }else {
//                 terranova.velocidadX = -5  
//             }
//         })
//     })
// }


function detenerMovimiento() {
    jugadorObjeto.velocidadX = 0
    jugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            MovimientoArriba()
            break;
        case 'ArrowDown':
            MovimientoAbajo()
            break;
        case 'ArrowRight':
            MovimientoDerecha()
            break;
        case 'ArrowLeft':
            MovimientoIzquierda()
            break;
        default:
            break;
    }
}

function iniciarMapa() {

    jugadorObjeto = obtenerObjetoMascota(jugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup',detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (jugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    } 
}

function revisarColision(enemigo) {

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x
    
    const arribaMokepon = jugadorObjeto.y
    const abajoMokepon = jugadorObjeto.y + jugadorObjeto.alto
    const derechaMokepon = jugadorObjeto.x + jugadorObjeto.ancho
    const izquierdaMokepon = jugadorObjeto.x

    if(
        abajoMokepon < arribaEnemigo ||
        arribaMokepon > abajoEnemigo ||
        derechaMokepon < izquierdaEnemigo ||
        izquierdaMokepon > derechaEnemigo
    ) {
        return 
    }
    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    eleccionMokeponEnemigo(enemigo)
}

window.addEventListener("load", IniciarJuego)
