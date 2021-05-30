const Primus = require('primus');

let go = (server) => {
    let primus = new Primus(server, {transformer: 'websockets'});
    primus.on('connection', (spark) => {
        console.log("Received Connection!", spark.query.token);
    })
    global.primus = primus;
}

module.exports.go = go;