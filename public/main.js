var socket = io.connect('http://172.24.3.170:25001', { 'forceNew': true });

socket.on('PokemonsRandom', function(data) {
    console.log(data);

})