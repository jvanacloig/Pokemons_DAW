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
    vida: "340",
    nombre: "Snorlax",
    tipo1: "normal",
    tipo2: "",
    src_front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/143.png",
    src_back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/143.png"
}, {
    id: "1",
    vida: "280",
    nombre: "Golem",
    tipo1: "rock",
    tipo2: "",
    src_front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/76.png",
    src_back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/76.png"
}, {
    id: "2",
    vida: "230",
    nombre: "articuno",
    tipo1: "ice",
    tipo2: "",
    src_front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/144.png",
    src_back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/144.png"
}, {
    id: "3",
    vida: "300",
    nombre: "dragonite",
    tipo1: "dragon",
    tipo2: "",
    src_front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png",
    src_back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/149.png"
}, {
    id: "4",
    vida: "130",
    nombre: "Hitmonlee",
    tipo1: "fight",
    tipo2: "",
    src_front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/106.png",
    src_back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/106.png"
}, {
    id: "5",
    vida: "120",
    nombre: "Gengar",
    tipo1: "ghost",
    tipo2: "",
    src_front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/94.png",
    src_back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/94.png"
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
    let widthpo = document.getElementById("pokemonseleccionat_1").style.width;
    console.log(pred);
    document.getElementById("pokemonseleccionat_1").style.position = "relative";

    document.getElementById("text_combat").textContent = "has utilizado " + habilidades[idSkill].nombre;
    setTimeout(function() {
        document.getElementById("pokemonseleccionat_1").style.width = "450px";
        document.getElementById("pokemonseleccionat_1").style.zIndex = "1";
        document.getElementById("pokemonseleccionat_1").style.left = "30%";
        document.getElementById("pokemonseleccionat_1").style.top = "-5%";
        enemigodañado();
        setTimeout(function() {
            document.getElementById("pokemonseleccionat_1").style.left = pred;
            document.getElementById("pokemonseleccionat_1").style.top = pred3;
            document.getElementById("pokemonseleccionat_1").style.zIndex = pred2;
            document.getElementById("pokemonseleccionat_1").style.width = widthpo;

        }, 200);
    }, 200);
    setTimeout(function() {
        document.getElementById("skillsbars").style.display = "block";
        document.getElementById("text_combat").style.display = "none";
    }, 1000);

}

function enemigodañado() {
    document.getElementById("pokemonseleccionat_2").style.position = "relative";
    let pred3 = document.getElementById("pokemonseleccionat_2").style.top;
    let widthpo = document.getElementById("pokemonseleccionat_2").style.width;
    setTimeout(function() {
        document.getElementById("pokemonseleccionat_2").style.width = "300px";

        document.getElementById("pokemonseleccionat_2").style.filter = "invert(100%)";
        setTimeout(function() {
            document.getElementById("pokemonseleccionat_2").style.top = pred3;
            document.getElementById("pokemonseleccionat_2").style.width = widthpo;
            document.getElementById("pokemonseleccionat_2").style.filter = "invert(0%)";
        }, 100);
    }, 100);
}

function nextpokemon() {
    var e = pokemons_randoms.length;
    for (let i = 0; 1 <= pokemons_randoms.length + 1; i++) {
        e = e - 1;
        if (e <= 0) {
            console.log("hola");
            finjuego();
            break;
        } else {
            if (pokemons_randoms[i].src_back == document.getElementById("pokemonseleccionat_1").src) {
                document.getElementById("tu_vida").textContent = pokemons_randoms[i + 1].vida;
                document.getElementById("nom_pokemonseleccionat_teu").textContent = pokemons_randoms[i + 1].nombre;
                document.getElementById("pokemonseleccionat_1").src = pokemons_randoms[i + 1].src_back;
                let t = document.getElementById("conten_" + pokemons_randoms[i].id);
                t.style.border = "0px white solid";
                t.style.opacity = "0.5";
                document.getElementById("pokemonseleccionat_1").style.opacity = "1";
                t = document.getElementById("conten_" + pokemons_randoms[i + 1].id);

                t.style.border = "3px white solid";

                console.log(e);
                break;
            }
        }
    }

}

function morision() {
    document.getElementById("pokemonseleccionat_1").style = ".grayscale { filter: grayscale(100%); }";
    setTimeout(function() {
        document.getElementById("pokemonseleccionat_1").style.opacity = "0.8";

        setTimeout(function() {
            document.getElementById("pokemonseleccionat_1").style.opacity = "0.6";
            setTimeout(function() {
                document.getElementById("pokemonseleccionat_1").style.opacity = "0.4";
                setTimeout(function() {
                    document.getElementById("pokemonseleccionat_1").style.opacity = "0.2";
                    setTimeout(function() {
                        document.getElementById("pokemonseleccionat_1").style.opacity = "0";
                        nextpokemon();
                    }, 100);
                }, 100);
            }, 100);
        }, 100);
    }, 100);
}

function finjuego() {

    location.reload();
}