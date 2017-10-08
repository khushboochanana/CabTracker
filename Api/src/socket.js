import socketio from 'socket.io';

export default (server) => {
    const io = socketio(server);

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


    var cabId = "59d90d73734d1d18c95c8ef8"


    io.on('connection', (socket) => {
        console.log('connected');

        // socket.join(cabId);

        socket.on('joined', (data) => {
            console.log('joined', data);

            const {cabId, sender} = data.data;

            console.log('sender 1', cabId, sender);


            socket.join(cabId);


            console.log('sender 2', cabId, sender);

            if (sender) {
                console.log("======================", data.sender, cabId, sender)
                io.sockets.in(cabId).emit('updateLocation', {data: {cabId, sender}});
            }
        });

        socket.on('pickUp', (data) => {
            console.log('pickUp', data.data);

            const {latitude, longitude, cabId, sender} = data.data;

            console.log("================", io.sockets.adapter.rooms[cabId]);
            console.log("====socket.rooms============", socket.rooms);
            //
            io.sockets.in(cabId).emit('updateLocation', {data: {latitude, longitude, cabId, sender}});
        })

        socket.on('message', (data) => {
            console.log('pickUp', data);

            const {location, cabId} = data;
            io.sockets.in(cabId).emit('updateLocation', "You are in room no. ");
        })


    });
}
