'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (server) {
    var io = (0, _socket2.default)(server);
    var users = {};
    var sockets = {};
    var nsp = io.of('channel-name');
    nsp.on('connection', function (socket) {
        console.log('someone connected');
    });
    nsp.emit('hi', 'everyone!');

    io.on('connection', function (socket) {
        console.log(">>>>>>>>>>>>>>>>>.Connection Established");
        socket.on('disconnect', function () {});

        socket.on('new user', function (user, cb) {
            users[user.email] = socket.id;
            socket.userName = user.name;
            sockets[socket.id] = { username: user._id, socket: socket };
            cb(true);
        });
        socket.on('message', function (to, msg) {
            console.log(msg, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.");
            sockets[users[to.email]].socket.emit('push message', {
                message: msg,
                id: to._id,
                from: sockets[socket.id].username
            });
        });
    });
};