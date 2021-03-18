var socket = io.connect('http://172.24.3.178:25002', { 'forceNew': true });

socket.on('PokemonsRandom', function(data) {
    console.log(data);
    render(data);
})



function addMessage(e) {
    var message = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };

    socket.emit('new-message', message);
    return false;
}


window.onload = function() {
    cargarinici();
}