var name;
var pokemons = [];
var socket;

function Player(name, pokemons, socket) {
    this.name = name;
    this.pokemons = pokemons;
    this.socket = socket;
}
exports.Player = Player;