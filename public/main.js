var socket = io.connect('http://172.24.3.170:25001', { 'forceNew': true });
let arrayPokemons;
let numeroPokemon;
var vidaInicial;
var vidaActual;
var vidaInicialRival;
var vidaActualRival;


socket.on('tipusAtac', function(dada, i){
    document.getElementById("d" + i).textContent = arrayMoves[i].move.name + " " + parseInt(dada.power/10);
    document.getElementById("d" + i).className = dada.type.name + " list col boton_ataque"
});

socket.on('PokemonRival', function(data) {
    document.getElementById("pokemonseleccionat_2").src = data.sprites.front_default;
    document.getElementById("su_vida").textContent = data.stats[0].base_stat;
    vidaActualRival = vidaInicialRival = data.stats[0].base_stat;
    document.getElementById("nom_pokemonseleccionat_seu").textContent = data.name;
})

socket.on('PokemonsRandom', function(data) {
    console.log(data);
    document.getElementById("p1").src = data[0].sprites.front_default;
    document.getElementById("c1").className = data[0].types[0].type.name + " col col-lg-2 square pokemon";
    document.getElementById("p2").src = data[1].sprites.front_default;
    document.getElementById("c2").className = data[1].types[0].type.name + " col col-lg-2 square pokemon";
    document.getElementById("p3").src = data[2].sprites.front_default;
    document.getElementById("c3").className = data[2].types[0].type.name + " col col-lg-2 square pokemon";
    document.getElementById("p4").src = data[3].sprites.front_default;
    document.getElementById("c4").className = data[3].types[0].type.name + " col col-lg-2 square pokemon";
    document.getElementById("p5").src = data[4].sprites.front_default;
    document.getElementById("c5").className = data[4].types[0].type.name + " col col-lg-2 square pokemon";
    document.getElementById("p6").src = data[5].sprites.front_default;
    document.getElementById("c6").className = data[5].types[0].type.name + " col col-lg-2 square pokemon";
    arrayPokemons = data;
})

socket.on('IniciCombat', function(data) {
    console.log(data);
    if (!data) {
        document.getElementById("skillsbars").style.display = "none";
        document.getElementById("text_combat").style.display = "block";
        document.getElementById("text_combat").textContent = "Toca iniciar al rival";
        sethabilidades();
    }
    if (data) {
        sethabilidades();
    }
})

socket.on('EnviarDades', function(data) {
    socket.emit('RetornarDades', data);
})

socket.on('Atac', function(data) {
    if (data) {
        document.getElementById("skillsbars").style.display = "block";
        document.getElementById("text_combat").style.display = "none";
        //sethabilidades();
        if (document.getElementById('tu_vida').style.width == '100%') {
            document.getElementById('tu_vida').style.width = '80%';
            vidaActual -= 20;
            document.getElementById("tu_vida").textContent = vidaActual;
            document.getElementById('tu_vida').style.width = '' + (vidaActual * 100) / vidaInicial + '%';
        } else {
            console.log(document.getElementById('tu_vida').style.width);
            vidaActual -= 20;
            document.getElementById("tu_vida").textContent = vidaActual;
            document.getElementById('tu_vida').style.width = '' + (vidaActual * 100) / vidaInicial + '%';

        }
    }
})

socket.on('FinalCombat', function(data) {
    if (data) {
        document.getElementById("skillsbars").style.display = "none";
        document.getElementById("text_combat").style.display = "block";
        document.getElementById("text_combat").textContent = "Has guanyat";
        vidaActual -= 20;
        document.getElementById("su_vida").textContent = vidaActual;
        document.getElementById('su_vida').style.width = 0;
    } else {
        document.getElementById("skillsbars").style.display = "none";
        document.getElementById("text_combat").style.display = "block";
        document.getElementById("text_combat").textContent = "Has perdut";
        vidaActual -= 20;
        document.getElementById("tu_vida").textContent = vidaActual;
        document.getElementById('tu_vida').style.width = 0;
    }
})

function jugar(num) {
    document.getElementById("selec_pokemon").style.display = "none";
    document.getElementById("ingame").style.display = "block";
    numeroPokemon = num;
    colocarpokemons_combat(num);
    socket.emit('PokemonsRandomOK', num);
}

function colocarpokemons_combat(num) {
    /*tu primer pokemon*/
    console.log(arrayPokemons);
    document.getElementById("pokemonseleccionat_1").src = arrayPokemons[num].sprites.back_default;
    document.getElementById("nom_pokemonseleccionat_teu").textContent = arrayPokemons[num].name;
    document.getElementById("tu_vida").textContent = arrayPokemons[num].stats[0].base_stat;
    vidaActual = vidaInicial = arrayPokemons[num].stats[0].base_stat;
    let t = document.getElementById("conten_" + num);
    t.style.border = "3px white solid";
}

function sethabilidades() {
    arrayMoves = arrayPokemons[numeroPokemon].moves;
    arrayNum = [];
    for(let j = 0; j<=3; j++){
        
        find=false;
        while (!find) {
            var num = parseInt(Math.random(0, arrayMoves.lenght));
            if (!(arrayNum[arrayNum.indexOf(num)] == num)) {
                find = true;
                arrayNum[j] = num;
            }
        }
    }
    for (let i = 0; i <= 3; i++) {
        var button = document.createElement("button");
        button.innerHTML = arrayMoves[arrayNum[i]].move.name;
        button.style.background = "rgb(0,0,0,0)";
        button.style.color = "white";
        button.style.border = "0px";

        socket.emit('NomAtac', arrayMoves[i].move.name, i);

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

    document.getElementById("text_combat").textContent = "has atacat esperant resposta del rival";


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
            if (document.getElementById('su_vida').style.width == '') {
                vidaActualRival -= 20;
                document.getElementById("su_vida").textContent = vidaActualRival;
                document.getElementById('su_vida').style.width = '' + (vidaActualRival * 100) / vidaInicialRival + '%';
            } else {
                vidaActualRival -= 20;
                document.getElementById("su_vida").textContent = vidaActualRival;
                document.getElementById('su_vida').style.width = '' + (vidaActualRival * 100) / vidaInicialRival + '%';
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