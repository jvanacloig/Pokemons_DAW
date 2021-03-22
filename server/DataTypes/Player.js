var name;
var pokemons = [];
var socket;

function Player(name, pokemons, socket) {
    this.name = name;
    this.pokemons = pokemons;
    this.socket = socket;
}


function PlayerToJson() {
    return [{
        Name: this.name,
        Pokemons: this.pokemons,
        Socket: this.socket
    }];
}
exports.Player = Player;
exports.PlayerToJson = PlayerToJson;