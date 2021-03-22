var express = require('express');
//const Player = require('./DataTypes/Player');
const pokemon = require("./DataTypes/Pokemon");
const room = require("./DataTypes/Room");
const stats = require("./DataTypes/Stats");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const Player = {
    name: "",
    pokemons: [],
    socket: "",

    Player: function(name, pokemons, socket) {
        this.name = name;
        this.pokemons = pokemons;
        this.socket = socket;
    },


    PlayerToJson: function() {
        return [{
            Name: this.name,
            Pokemons: this.pokemons
        }];
    }
};

const Pokemon = {
    Nombre: "",
    Tipo1: "",
    Tipo2: "",
    Hablilidades: "",
    url: "",
    stats: "",

    Pokemon: function(Nombre, Tipo1, Tipo2, Hablilidades, url, stats) {
        this.Nombre = Nombre;
        this.Tipo1 = Tipo1;
        this.Tipo2 = Tipo2;
        this.Hablilidades = Hablilidades;
        this.url = url;
        this.stats = stats;
    },

    PokemonToJson: function() {

    }
}


// var Pokemon = [{
//     Nombre: String,
//     Tipo1: String,
//     Tipo2: String,
//     Habilidades: [{
//         Nombre: String,
//         Tipo1: String,
//         Tipo2: String,
//     }]
// }];

// var room = [{
//     Id: Number,
//     Jugador1: {
//         Nombre: String,
//         Pokemon: Pokemon
//     },
//     Jugador2: {
//         Nombre: String,
//         Pokemon: Pokemon
//     },
//     Combat: [{
//         Atac: {
//             Numero: Number,
//             Jugador: String,
//             Ataque: String
//         }
//     }]
// }];

var rooms = [];
var players = [];
var maxPokemons = 151;

app.use(express.static('public'));

app.get('/hello', function(req, res) {
    res.status(200).send("Hello World!");
});

io.on('connection', function(socket) {

    console.log('Client connected');
    let pokemons = GetRandomPokemons();
    let player = Object.create(Player);
    player.Player("a", pokemons, socket);
    console.log(player.PlayerToJson());
    Enviar('PokemonsRandom', player.PlayerToJson(), socket);

    socket.on('PokemonsRandomOK', function() {
        Console.log('PokemonsRandomOK')
        Enviar('Sales', rooms);
    });

    socket.on('SalesOk', function() {
        Enviar('Sales', rooms);
    });

});

server.listen(25001, function() {
    console.log("Servidor corriendo en http://172.24.3.178:25001");
});


function Enviar(key, content, socket) {
    socket.emit(key, content);
};

function GetRandomPokemons() {
    let numPokemons = [];
    let pokemons = [];
    for (let i = 0; i < 6; i++) {
        numPokemons[i] = GetRandomPokemon(numPokemons);
    }
    let apiData = GetApiData('https://pokeapi.co/api/v2/generation/1/');
    apiData = apiData.pokemon_species;
    for (let i = 0; i < numPokemons.length; i++) {
        let url = 'https://pokeapi.co/api/v2/pokemon/' + apiData[numPokemons[i].name] + '/';
        let pokemonData = GetApiData(url);
        if (pokemonData.types.length > 1) {
            pokemons[i] = new pokemon.Pokemon(
                pokemonData.name,
                pokemonData.types[0],
                pokemonData.types[1],
                pokemonData.moves,
                url,
                new stats(pokemonData.stats[0].base_stat,
                    pokemonData.stats[1].base_stat,
                    pokemonData.stats[2].base_stat,
                    pokemonData.stats[3].base_stat,
                    pokemonData.stats[4].base_stat,
                    pokemonData.stats[5].base_stat)
            )
        } else {
            pokemons[i] = new pokemon.Pokemon(
                pokemonData.name,
                pokemonData.types[0],
                pokemonData.types[0],
                pokemonData.moves,
                url,
                new stats(pokemonData.stats[0].base_stat,
                    pokemonData.stats[1].base_stat,
                    pokemonData.stats[2].base_stat,
                    pokemonData.stats[3].base_stat,
                    pokemonData.stats[4].base_stat,
                    pokemonData.stats[5].base_stat)
            )
        }
    }
    pokemons_enviar = [];
    // pokemons.forEach(pokemon => {
    //     pokemon.P
    // });
    return pokemons_enviar;
};

function GetRandomPokemon(numPokemons) {
    let find = false;
    while (!find) {
        let num = Math.floor(Math.random() * maxPokemons);
        if (!numPokemons[numPokemons.indexOf(num)] == num) {
            trobat = true;
            return num;
        }
    }
};

function GetApiData(url) {
    fetch(url)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(function(data) {
                    console.log(data);
                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
}