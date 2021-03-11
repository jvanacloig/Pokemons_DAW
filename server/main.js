var express = require('express');
const { Pokemon, Pokemon, Pokemon } = require("./DataTypes/Pokemon");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

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

// var rooms = [{
//     Room: room
// }]

app.use(express.static('public'));

io.on('connection', function(socket) {
    console.log('Alguien se ha conectado con Sockets');
    socket.emit('salas', rooms);

    socket.on('Realizar_Ataque', function(data) {
        room.Combat.push(data);
        io.sockets.emit('messages', messages);
    });
});

server.listen(25002, function() {
    console.log("Servidor corriendo en http://172.24.3.178:25002");
});