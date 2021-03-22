var socket = io.connect('http://172.24.3.178:25002', { 'forceNew': true, transports: ['websocket'] });

socket.on('PokemonsRandom', function(data) {
    console.log(data);
})


window.onload = function() {
    cargarinici();
}