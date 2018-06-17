
module.exports = function (app, io) {
    io.on('connection', function (socket) {
        //console.log("Connection : " +socket.id);             
        socket.on('message', function (msg) {
            //console.log('message  :'+msg);
            io.emit('message', msg);
        });

    });
}