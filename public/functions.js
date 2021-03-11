var h1;
var h2;
var h3;
var h4;
var habilidades = [{
    nombre: "snow-cloak",
    tipo1: "ice",
    tipo2: "",
    daño: 10,
}, {
    nombre: "ice-claw",
    tipo1: "ice",
    tipo2: "",
    daño: 32
}, {
    nombre: "fly",
    tipo1: "flying",
    tipo2: "",
    daño: 15,
}, {
    nombre: "peck",
    tipo1: "normal",
    tipo2: "",
    daño: 5
}];
var pokemons_randoms = [{
    id: "0",
    vida: "100",
    nombre: "Snorlax",
    tipo1: "normal",
    tipo2: "",
    src_front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/143.png",
    src_back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/143.png"
}, {
    id: "1",
    vida: "100",
    nombre: "Golem",
    tipo1: "rock",
    tipo2: "",
    src_front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/76.png",
    src_back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/76.png"
}, {
    id: "2",
    vida: "100",
    nombre: "articuno",
    tipo1: "ice",
    tipo2: "",
    src_front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/144.png",
    src_back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/144.png"
}, {
    id: "3",
    vida: "100",
    nombre: "dragonite",
    tipo1: "dragon",
    tipo2: "",
    src_front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png",
    src_back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/149.png"
}, {
    id: "4",
    vida: "100",
    nombre: "Hitmonlee",
    tipo1: "fight",
    tipo2: "",
    src_front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/106.png",
    src_back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/106.png"
}, {
    id: "5",
    vida: "100",
    nombre: "Gengar",
    tipo1: "ghost",
    tipo2: "",
    src_front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/94.png",
    src_back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/back/94.png"
}, ];
window.onload = function() {
    cargarinici();
}

function cargarinici() {
    mostrarpokemons(pokemons_randoms);
}

function mostrarpokemons(pokemons_randoms) {
    for (let i = 1; 1 <= pokemons_randoms.length; i++) {
        document.getElementById("p" + i).src = pokemons_randoms[i - 1].src_front;
        let t = document.getElementById("c" + i);
        t.classList.add(pokemons_randoms[i - 1].tipo1);
    }
}

function sethabilidades() {

    for (let i = 0; i <= habilidades.length - 1; i++) {

        var button = document.createElement("button");
        button.innerHTML = habilidades[i].nombre;
        button.style.background = "rgb(0,0,0,0)";
        button.style.color = "white";
        button.style.border = "0px";
        button.id = "h" + i;
        document.getElementById("d" + i).appendChild(button);
        document.getElementById("d" + i).className = habilidades[i].tipo1 + " list col boton_ataque"

    }
}

function jugar() {
    document.getElementById("selec_pokemon").style.display = "none";
    document.getElementById("ingame").style.display = "block";
    sethabilidades();
    colocarpokemons_combat(pokemons_randoms);
}

function colocarpokemons_combat(pokemons_randoms) {
    /*tu primer pokemon*/
    let pokemonactual = pokemons_randoms[0].id;
    document.getElementById("pokemonseleccionat_1").src = pokemons_randoms[0].src_back;
    document.getElementById("tu_vida").textContent = pokemons_randoms[0].vida;
    document.getElementById("nom_pokemonseleccionat_teu").textContent = pokemons_randoms[0].nombre;
    let t = document.getElementById("conten_" + pokemons_randoms[0].id);
    t.style.border = "3px white solid";
    /*su pokemon */
    document.getElementById("pokemonseleccionat_2").src = pokemons_randoms[0].src_front;
    document.getElementById("su_vida").textContent = pokemons_randoms[0].vida;
    document.getElementById("nom_pokemonseleccionat_seu").textContent = pokemons_randoms[0].nombre;
    /*tus pokemons guardados*/
    for (let i = 1; 1 <= pokemons_randoms.length; i++) {

        document.getElementById("m" + i).src = pokemons_randoms[i - 1].src_front;
        document.getElementById("m" + i).background = "black";
    }
    console.log("x");
}

function esconder_habilidades() {


}

function atacar(event) {

    document.getElementById("skillsbars").style.display = "none";
    document.getElementById("text_combat").style.display = "block";
    let idSkill = event.explicitOriginalTarget.id.substring(1, 2);
    let pred = document.getElementById("pokemonseleccionat_1").style.right
    let pred2 = document.getElementById("pokemonseleccionat_1").style.zIndex;
    let pred3 = document.getElementById("pokemonseleccionat_1").style.top;
    console.log(pred);
    document.getElementById("pokemonseleccionat_1").style.position = "relative";

    document.getElementById("text_combat").textContent = "has utilizado " + habilidades[idSkill].nombre;
    setTimeout(function() {
        document.getElementById("pokemonseleccionat_1").style.zIndex = "1";
        document.getElementById("pokemonseleccionat_1").style.left = "80%";
        document.getElementById("pokemonseleccionat_1").style.top = "-20%";
        setTimeout(function() {
            document.getElementById("pokemonseleccionat_1").style.left = pred;
            document.getElementById("pokemonseleccionat_1").style.top = pred3;
            document.getElementById("pokemonseleccionat_1").style.zIndex = pred2;
        }, 200);
    }, 200);
    setTimeout(function() {
        document.getElementById("skillsbars").style.display = "block";
        document.getElementById("text_combat").style.display = "none";
    }, 1000);
}