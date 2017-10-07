'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (server) {
    var io = (0, _socket2.default)(server);

    io.on('connection', function (socket) {
        console.log('connected');

        socket.on('joined', function (data) {
            console.log('joined');

            var cabId = data.cabId;

            socket.join(cabId);
        });

        socket.on('pickUp', function (data) {
            console.log('pickUp', data);

            var location = data.location,
                cabId = data.cabId;

            socket.to(cabId).emit('updateLocation', location);
        });
    });
};