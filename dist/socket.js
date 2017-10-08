'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (server) {
    var io = (0, _socket2.default)(server);

    // var nsp = io.of('/my-namespace');
    // nsp.on('connection', function(socket){
    //     console.log('someone connected');
    //
    //     socket.on('joined', (data) => {
    //         console.log('joined', data);
    //
    //         const {cabId} = data;
    //         socket.join(cabId);
    //     });
    //
    //     socket.on('pickUp', (data) => {
    //         console.log('pickUp', data);
    //
    //         const {location, cabId, sender} = data;
    //
    //         console.log("================", data);
    //         socket.to(cabId).emit('updateLocation', location);
    //
    //         io.sockets.in(cabId).emit('updateLocation', JSON.stringify({name : "Rajesh"}));
    //
    //
    //     })
    //
    //     nsp.emit('hi', 'everyone wewe !')
    //
    // });

    // nsp.on('joined', (data) => {
    //     console.log('joined', data);
    //
    // });


    var cabId = "59d90d73734d1d18c95c8ef8";

    io.on('connection', function (socket) {
        console.log('connected');

        // socket.join(cabId);

        socket.on('joined', function (data) {
            console.log('joined', data);

            var _data$data = data.data,
                cabId = _data$data.cabId,
                sender = _data$data.sender;


            console.log('sender 1', cabId, sender);

            socket.join(cabId);

            console.log('sender 2', cabId, sender);

            if (sender) {
                console.log("======================", data.sender, cabId, sender);
                io.sockets.in(cabId).emit('updateLocation', { data: { cabId: cabId, sender: sender } });
            }
        });

        socket.on('pickUp', function (data) {
            console.log('pickUp', data.data);

            var _data$data2 = data.data,
                latitude = _data$data2.latitude,
                longitude = _data$data2.longitude,
                cabId = _data$data2.cabId,
                sender = _data$data2.sender;


            console.log("================", io.sockets.adapter.rooms[cabId]);
            console.log("====socket.rooms============", socket.rooms);
            //
            io.sockets.in(cabId).emit('updateLocation', { data: { latitude: latitude, longitude: longitude, cabId: cabId, sender: sender } });
        });

        socket.on('message', function (data) {
            console.log('pickUp', data);

            var location = data.location,
                cabId = data.cabId;

            io.sockets.in(cabId).emit('updateLocation', "You are in room no. ");
        });
    });
};