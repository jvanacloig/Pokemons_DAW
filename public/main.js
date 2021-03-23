var socket = io.connect('http://172.24.3.178:25001', { 'forceNew': true });

socket.on('PokemonsRandom', function(data) {
    console.log(data);

})

socket.on('EnviarDades', function(data) {
    socket.emit('RetornarDades', data);
})