var socket = io.connect('http://192.168.18.5:25001', { 'forceNew': true });

socket.on('PokemonsRandom', function(data) {
    console.log(data);

})