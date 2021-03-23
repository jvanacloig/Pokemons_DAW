var express = require('express');
const { stat } = require('fs');
//const Player = require('./DataTypes/Player');
//const pokemon = require("./DataTypes/Pokemon");
const room = require("./DataTypes/Room");
//const stats = require("./DataTypes/Stats");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const fetch = require('node-fetch');
var Pokedex = require('pokedex-promise-v2');
const { decode } = require('querystring');
var options = {
    versionPath: '/api/v2/',
    cacheLimit: 100 * 1000, // 100s
    timeout: 5 * 1000 // 5s
}
var P = new Pokedex(options);

const Player = {
    name: "",
    pokemons: [],
    socket: "",

    Player: function(name, pokemons, socket) {
        this.name = name;
        this.pokemons = pokemons;
        this.socket = socket;
    },


    // ToJson: function() {
    //     let out = [{
    //         Name: this.name,
    //         Pokemons: []
    //     }];
    //     for (let i = 0; i < this.pokemons.length; i++) {
    //         out[0].Pokemons[i] = this.pokemons[i].ToJson();
    //         //console.log(this.pokemons[i].ToJson());
    //     }
    //     return out;
    // }
};

const Pokemon = {
    Nombre: "",
    Tipo1: "",
    Tipo2: "",
    Habilidades: "",
    url: "",
    stats: "",

    Pokemon: function(Nombre, Tipo1, Tipo2, Habilidades, url, stats) {
        this.Nombre = Nombre;
        this.Tipo1 = Tipo1;
        this.Tipo2 = Tipo2;
        this.Habilidades = Habilidades;
        this.url = url;
        this.stats = stats;
    },

    ToJson: function() {
        return [{
            Name: this.Name,
            Tipo1: this.Tipo1,
            Tipo2: this.Tipo2,
            Habilidades: this.Habilidades,
            Url: this.url,
            Stats: this.stats
        }];
    }
}

const Stats = {
    hp: "",
    attack: "",
    defense: "",
    special_attack: "",
    special_defense: "",
    speed: "",

    Stats: function(hp, attack, defense, special_attack, special_defense, speed) {
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.special_attack = special_attack;
        this.special_defense = special_defense;
        this.speed = speed;
    },

    ToJson: function() {
        return [{
            Hp: this.hp,
            Attack: this.attack,
            Defense: this.defense,
            Special_Attack: this.special_attack,
            Special_Defense: this.special_defense,
            Speed: this.speed
        }]
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

    socket.on('RetornarDades', function(dades) {
        if (players[0].socket.id == socket.id) {
            players[0].pokemons.push(dades);
            if (players[0].pokemons.length >= 6) {
                Enviar('PokemonsRandom', players[0].pokemons, socket);
            }
        } else if (players[1].socket.id == socket.id) {
            players[1].pokemons.push(dades);
            if (players[1].pokemons.length >= 6) {
                Enviar('PokemonsRandom', players[1].pokemons, socket);
            }
        }
    });

    console.log('Client connected');


    //console.log(pokemons);
    let player = Object.create(Player);
    //player.Player(Player1, pokemons, socket);
    player.socket = socket;
    players.push(player);
    let pokemons = GetRandomPokemons(socket);
    //console.log(player.ToJson());


    socket.on('PokemonsRandomOK', function() {
        Console.log('PokemonsRandomOK')
        Enviar('Sales', rooms);
    });

    socket.on('SalesOk', function() {
        Enviar('Sales', rooms);
    });
    console.log(players);
});

function afegirPokemonPlayer() {

};

server.listen(25001, function() {
    console.log("Servidor corriendo en http://172.24.3.178:25001");
});


function Enviar(key, content, socket) {
    socket.emit(key, content);
};

function GetRandomPokemons(socket) {
    var numPokemons = [];
    var pokemons = [];
    for (let i = 0; i < 6; i++) {
        numPokemons[i] = GetRandomPokemon(numPokemons);
    }
    // let apiData = decode(GetApiData('https://pokeapi.co/api/v2/generation/1/'));
    // apiData = apiData.pokemon_species;
    for (let i = 0; i < numPokemons.length; i++) {
        var dadesApi = "";
        var text;
        // let pokemonData = GetApiData(numPokemons[i]);

        // console.log(text);
        decode(dadesApi = P.getPokemonByName(numPokemons[i], function(response, error) { // with callback
            if (!error) {
                dadesApi = response;
                return dadesApi;
            } else {
                console.log(error)
            }
        }));
        dadesApi.then(function() {
            socket.emit('EnviarDades', dadesApi);
            return dadesApi;
        });
        //console.log(dadesApi);
        //console.log(pokemonData);
        // if (pokemonData.types.length > 1) {
        //     pokemons[i] = Object.create(Pokemon);
        //     let stats = Object.create(Stats)
        //     stats.Stats(pokemonData.stats[0].base_stat,
        //         pokemonData.stats[1].base_stat,
        //         pokemonData.stats[2].base_stat,
        //         pokemonData.stats[3].base_stat,
        //         pokemonData.stats[4].base_stat,
        //         pokemonData.stats[5].base_stat)
        //     pokemons[i].Pokemon(
        //         pokemonData.name,
        //         pokemonData.types[0],
        //         pokemonData.types[1],
        //         pokemonData.moves,
        //         url,
        //         stats.ToJson()
        //     )
        // } else {
        //     pokemons[i] = Object.create(Pokemon);
        //     let stats = Object.create(Stats)
        //     stats.Stats(pokemonData.stats[0].base_stat,
        //         pokemonData.stats[1].base_stat,
        //         pokemonData.stats[2].base_stat,
        //         pokemonData.stats[3].base_stat,
        //         pokemonData.stats[4].base_stat,
        //         pokemonData.stats[5].base_stat)
        //     pokemons[i].Pokemon(
        //         pokemonData.name,
        //         pokemonData.types[0],
        //         pokemonData.types[0],
        //         pokemonData.moves,
        //         url,
        //         stats.ToJson()
        //     )
        // }
    }
    pokemons_enviar = [];
    // pokemons.forEach(pokemon => {
    //     pokemon.P
    // });
    return pokemons_enviar;
};

function GetRandomPokemon(numPokemons) {
    let find = false;
    let num;
    while (!find) {
        num = Math.floor(Math.random() * maxPokemons);
        if (!(numPokemons[numPokemons.indexOf(num)] == num)) {
            find = true;
        }
    }
    return num;
};

async function GetApiData(num) {
    // let retorn;
    // console.log(url);
    // fetch(url)
    //     .then(
    //         function(response) {
    //             if (response.status !== 200) {
    //                 console.log('Looks like there was a problem. Status Code: ' +
    //                     response.status);
    //                 return;
    //             }

    //             // Examine the text in the response
    //             response.json().then(function(data) {
    //                 console.log(data);
    //                 retorn = data;
    //             });
    //         }
    //     )
    //     .catch(function(err) {
    //         console.log('Fetch Error :-S', err);
    //     });
    // console.log(retorn);
    // return retorn;

    // P.getPokemonByName('eevee') // with Promise
    //     .then(function(response) {
    //         console.log(response);
    //     })
    //     .catch(function(error) {
    //         console.log('There was an ERROR: ', error);
    //     });

    P.getPokemonByName(num, function(response, error) { // with callback
        if (!error) {
            console.log(response)
        } else {
            console.log(error)
        }
    });


    // P.resource([url])
    //     .then(function(response) {
    //         return response; // resource function accepts singles or arrays of URLs/paths
    //     });
}