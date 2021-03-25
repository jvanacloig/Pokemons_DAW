var express = require('express');
const { stat } = require('fs');

const room = require("./DataTypes/Room");
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
var danyAtac = 20;


const Player = {
    name: "",
    pokemons: [],
    socket: "",
    ready: false,
    hp: 100,
    pokPosition: 0,

    Player: function(name, pokemons, socket) {
        this.name = name;
        this.pokemons = pokemons;
        this.socket = socket;
        this.ready = false;
    },


    ToJson: function() {
        let out = [{
            Name: this.name,
            Pokemons: []
        }];
        for (let i = 0; i < this.pokemons.length; i++) {
            out[0].Pokemons[i] = this.pokemons[i].ToJson();
        }
        return out;
    }
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


var rooms = [];
var players = [];
var maxPokemons = 151;

app.use(express.static('public'));

app.get('/hello', function(req, res) {
    res.status(200).send("Hello World!");
});

io.on('connection', function(socket) {

    socket.on("disconnect", () => {
        if (players[0].socket.id = socket.id) {
            players.splice(0);
        } else {
            players.splice(1);
        }
    });
    socket.on('RetornarDades', function(dades) {
        if (players[0].socket.client.id == socket.client.id) {
            players[0].pokemons.push(dades);
            if (players[0].pokemons.length >= 6) {
                socket.emit('PokemonsRandom', players[0].pokemons);
            }
        } else if (players[1].socket.client.id == socket.client.id) {
            players[1].pokemons.push(dades);
            if (players[1].pokemons.length >= 6) {
                socket.emit('PokemonsRandom', players[1].pokemons);
            }
        }
    });

    console.log('Client connected');


    let player = Object.create(Player);
    player.socket = socket;
    player.pokemons = [];
    players.push(player);
    let pokemons = GetRandomPokemons(socket);



    socket.on('PokemonsRandomOK', function(data) {
        if (players[0].socket.id == socket.id) {
            players[0].ready = true;
            players[0].hp = players[0].pokemons[data].stats[0].base_stat;
            players[0].pokPosition = data;
        } else {
            players[1].ready = true;
            players[1].hp = players[1].pokemons[data].stats[0].base_stat;
            players[1].pokPosition = data;
        }
        if (players[0].ready & players[1] != null) {
            if (players[1].ready) {
                Enviar('PokemonRival', players[0].pokemons[players[0].pokPosition], players[1].socket);
                Enviar('PokemonRival', players[1].pokemons[players[1].pokPosition], players[0].socket);
                if (players[0].socket.id == socket.id) {
                    if (players[0].pokemons[players[0].pokPosition].stats[5].base_stat > players[1].pokemons[players[1].pokPosition].stats[5].base_stat) {
                        Enviar('IniciCombat', true, socket);
                        Enviar('IniciCombat', false, players[1].socket);
                    } else {
                        Enviar('IniciCombat', false, socket);
                        Enviar('IniciCombat', true, players[1].socket);
                    }
                } else {
                    if (players[1].pokemons[players[1].pokPosition].stats[5].base_stat > players[0].pokemons[players[0].pokPosition].stats[5].base_stat) {
                        Enviar('IniciCombat', true, socket);
                        Enviar('IniciCombat', false, players[0].socket);
                    } else {
                        Enviar('IniciCombat', false, socket);
                        Enviar('IniciCombat', true, players[0].socket);
                    }
                }
            }
        }
    });

    socket.on('RebreAtac', function() {
        if (players[0].socket.id == socket.id) {
            players[1].hp -= 20;
            if (players[1].hp <= 0) {
                Enviar('FinalCombat', true, socket);
                Enviar('FinalCombat', false, players[1].socket)
            } else {
                Enviar('Atac', false, socket);
                Enviar('Atac', true, players[1].socket);
            }
        } else {
            players[0].hp -= 20;
            if (players[0].hp <= 0) {
                Enviar('FinalCombat', true, socket);
                Enviar('FinalCombat', false, players[0].socket)
            } else {
                Enviar('Atac', false, socket);
                Enviar('Atac', true, players[0].socket);
            }
        }
    });


    socket.on('NomAtac', function(dades, i) {
        var dadesTipus = "";
        decode(dadesTipus = P.getMoveByName(dades, function(response, error) {
            if (!error) {
                dadesTipus = response;
                return dadesTipus;
            } else {
                console.log(error)
            }
        }));
        dadesTipus.then(function() {
            socket.emit('tipusAtac', dadesTipus, i);
            return dadesTipus;
        });
    });
});

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
  
    for (let i = 0; i < numPokemons.length; i++) {
        var dadesApi = "";
        var text;


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
        
    }
    pokemons_enviar = [];

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
   

    P.getPokemonByName(num, function(response, error) { // with callback
        if (!error) {
            console.log(response)
        } else {
            console.log(error)
        }
    });

}
