var socket = io.connect('http://192.168.1.83:25001', { 'forceNew': true });
let arrayPokemons;
var vidaInicial;
var vidaActual;
var vidaInicialRival;
var vidaActualRival;


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


socket.on('PokemonRival', function(data){
    document.getElementById("pokemonseleccionat_2").src = data[0].sprites.front_default;
    document.getElementById("su_vida").textContent = data[0].order;
    vidaActualRival = vidaInicialRival = data[0].order;
    document.getElementById("nom_pokemonseleccionat_seu").textContent = data[0].name;
})

socket.on('PokemonsRandom', function(data) {
    console.log(data);
    document.getElementById("p1").src=data[0].sprites.front_default;
    document.getElementById("p2").src=data[1].sprites.front_default;
    document.getElementById("p3").src=data[2].sprites.front_default;
    document.getElementById("p4").src=data[3].sprites.front_default;
    document.getElementById("p5").src=data[4].sprites.front_default;
    document.getElementById("p6").src=data[5].sprites.front_default;
    arrayPokemons = data;
})

socket.on('IniciCombat', function(data){
    if(!data){
        document.getElementById("skillsbars").style.display = "none";
        document.getElementById("text_combat").style.display = "block";
        document.getElementById("text_combat").textContent = "Toca iniciar al rival";
    }
    if(data){
        sethabilidades();
    }
})

socket.on('EnviarDades', function(data) {
    socket.emit('RetornarDades', data);
})

socket.on('Atac', function(data){
    if(data) {
        document.getElementById("skillsbars").style.display = "block";
        document.getElementById("text_combat").style.display = "none";
        sethabilidades();
        if(document.getElementById('tu_vida').style.width == '100%'){
            document.getElementById('tu_vida').style.width = '80%';
            vidaActual -= 20;
            document.getElementById("tu_vida").textContent = vidaActual;
            document.getElementById('tu_vida').style.width = '' +  (vidaActual * 100)/vidaInicial + '%';
        }
        else{
            console.log(document.getElementById('tu_vida').style.width);
            vidaActual -= 20;
            document.getElementById("tu_vida").textContent = vidaActual;
            document.getElementById('tu_vida').style.width = '' +  (vidaActual * 100)/vidaInicial + '%';
            
        }
    }
})

socket.on('FinalCombat', function(data){
    if(data) {
        document.getElementById("skillsbars").style.display = "none";
        document.getElementById("text_combat").style.display = "block";
        document.getElementById("text_combat").textContent = "Has guanyat";
    }
    else{
        document.getElementById("skillsbars").style.display = "none";
        document.getElementById("text_combat").style.display = "block";
        document.getElementById("text_combat").textContent = "Has perdut";
        vidaActual -= 20;
        document.getElementById("tu_vida").textContent = vidaActual;
        document.getElementById('tu_vida').style.width = '' +  (vidaActual * 100)/vidaInicial + '%';
    }
})

function jugar() {
    document.getElementById("selec_pokemon").style.display = "none";
    document.getElementById("ingame").style.display = "block";
    //sethabilidades();
    colocarpokemons_combat();
    socket.emit('PokemonsRandomOK');
}

function colocarpokemons_combat() {
    /*tu primer pokemon*/
    console.log(arrayPokemons);
    document.getElementById("pokemonseleccionat_1").src = arrayPokemons[0].sprites.back_default;
    document.getElementById("nom_pokemonseleccionat_teu").textContent = arrayPokemons[0].name;
    document.getElementById("tu_vida").textContent = arrayPokemons[0].order;
    vidaActual = vidaInicial = arrayPokemons[0].order;
    let t = document.getElementById("conten_" + 0);
    t.style.border = "3px white solid";
}

function sethabilidades() {

    for (let i = 0; i <= habilidades.length - 1; i++) {
        var button = document.createElement("button");
        button.innerHTML = habilidades[i].nombre;
        button.style.background = "rgb(0,0,0,0)";
        button.style.color = "white";
        button.style.border = "0px";

        document.getElementById("d" + i).textContent = habilidades[i].nombre;
        document.getElementById("d" + i).className = habilidades[i].tipo1 + " list col boton_ataque"
    }
}

function atacar(event) {

    document.getElementById("skillsbars").style.display = "none";
    document.getElementById("text_combat").style.display = "block";
    let idSkill = event.srcElement.id.substring(1, 2);
    let pred = document.getElementById("pokemonseleccionat_1").style.right
    let pred2 = document.getElementById("pokemonseleccionat_1").style.zIndex;
    let pred3 = document.getElementById("pokemonseleccionat_1").style.top;
    let widthpo = document.getElementById("pokemonseleccionat_1").style.width;
    document.getElementById("pokemonseleccionat_1").style.position = "relative";

    document.getElementById("text_combat").textContent = "has utilitzat " + habilidades[idSkill].nombre + " esperant resposta del rival";

   
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
            if(document.getElementById('su_vida').style.width == ''){
                vidaActualRival -= 20;
                document.getElementById("su_vida").textContent = vidaActualRival;
                document.getElementById('su_vida').style.width = '' +  (vidaActualRival * 100)/vidaInicialRival + '%';
            }
            else{
                vidaActualRival -= 20;
                document.getElementById("su_vida").textContent = vidaActualRival;
                document.getElementById('su_vida').style.width = '' +  (vidaActualRival * 100)/vidaInicialRival + '%';
            }
        }, 200);
    }, 200);
    socket.emit('RebreAtac')
    // setTimeout(function() {
    //     document.getElementById("skillsbars").style.display = "block";
    //     document.getElementById("text_combat").style.display = "none";
    // }, 1000);
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
