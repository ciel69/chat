var log = require('lib/log')(module);
var config = require('config');
var connect = require('connect'); // npm i connect
var async = require('async');
var cookie = require('cookie');   // npm i cookie
var cookieParser = require('cookie-parser');
var sessionStore = require('lib/sessionStore');
var HttpError = require('error').HttpError;
var User = require('models/user').User;
var Message = require('models/user').Message;
// var Message = require('models/message').Message;
const Long = require('mongodb').Long;

function loadSession(sid, callback) {

    // sessionStore callback is not quite async-style!
    sessionStore.load(sid, function(err, session) {
        if (arguments.length == 0) {
            // no arguments => no session
            return callback(null, null);
        } else {
            return callback(null, session);
        }
    });

}

function loadUser(session, callback) {

    if (!session.user) {
        log.debug("Session %s is anonymous", session.id);
        return callback(null, null);
    }

    log.debug("retrieving user ", session.user);

    User.findById(session.user, function(err, user) {
        if (err) return callback(err);

        if (!user) {
            return callback(null, null);
        }
        log.debug("user findbyId result: " + user);
        callback(null, user);
    });

}

module.exports = function (server) {
    var io = require('socket.io').listen(server);
    io.set('origin', 'localhost:*');
    io.set('logger', log);

    io.set('authorization', function(handshakeData, callback) {
        async.waterfall([
            function(callback) {
                // сделать handshakeData.cookies - объектом с cookie
                handshakeData.cookies = cookie.parse(handshakeData.headers.cookie || '');
                var sidCookie = handshakeData.cookies[config.get('session:key')];
                var sid = cookieParser.signedCookie(sidCookie, config.get('session:secret'));
                loadSession(sid, callback);
            },
            function(session, callback) {

                if (!session) {
                    callback(new HttpError(401, "No session"));
                }

                handshakeData.session = session;
                loadUser(session, callback);
            },
            function(user, callback) {
                if (!user) {
                    callback(new HttpError(403, "Anonymous session may not connect"));
                }

                handshakeData.user = user;
                callback(null);
            }

        ], function(err) {
            if (!err) {
                console.log(err);
                return callback(null, true);
            }

            if (err instanceof HttpError) {
                return callback(null, false);
            }

            callback(err);
        });
    });

    io.sockets.on('session:reload', function(sid) {
        var clients = io.sockets.clients();

        clients.forEach(function(client) {
            if (client.handshakeData.session.id != sid) return;

            loadSession(sid, function(err, session) {
                if (err) {
                    client.emit("error", "server error");
                    client.disconnect();
                    return;
                }

                if (!session) {
                    client.emit("logout");
                    client.disconnect();
                    return;
                }

                client.handshakeData.session = session;
            });

        });

    });

    io.sockets.on('connection', function(socket) {
        var handshakeData = socket.request;

        var username = handshakeData.user.username;
        var user_id = handshakeData.user._id;
        socket.broadcast.emit('join', username);

        socket.on('message', function(text, cb) {
            // Message.save({message: text});Long.fromString(text, 10)
            var new_message = new Message({message: text, user_id: user_id});
            // console.log(new_message);
            new_message.save(function(err) {
                if (err) return cb(err);
                cb(null, new_message);
            });
            socket.broadcast.emit('message', username, text);
            cb && cb();
        });

        socket.on('disconnect', function() {
            socket.broadcast.emit('leave', username);
        });

    });

    return io;
};

