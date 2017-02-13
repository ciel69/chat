var log = require('lib/log')(module);
module.exports = function (server) {
    var io = require('socket.io')(server);
    io.set('origin', 'localhost:*');
    io.set('logger', log);

    io.on('connection', function (socket) {
        socket.on('message', function (text, cb) {
            socket.broadcast.emit('message', text);
            cb();
        });
    });
};

