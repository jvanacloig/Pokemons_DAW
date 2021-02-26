var results = [];

function resultReceiver(event) {
    results.push(parseInt(event.data));
    if (results.length == 2) {
        postMessage(results[0] + results[1]);
    }
}

function errorReceiver(event) {
    throw event.data;
}

onmessage = function(event) {
    var n = parseInt(event.data);
    var r = 0;
    while (n > 0) {
        r += n;
        n--;
    }
    postMessage(r);
};