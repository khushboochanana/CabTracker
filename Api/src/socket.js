import socketio from 'socket.io'
import http from 'http'

export default  (server)=> {
    const io  = socketio(server);
    var users = {};
    var sockets = {};
    var nsp = io.of('channel-name');
    nsp.on('connection', function(socket){
        console.log('someone connected');
    });
    nsp.emit('hi', 'everyone!');

    io.on('connection', (socket)=> {
        console.log(">>>>>>>>>>>>>>>>>.Connection Established")
        socket.on('disconnect',  ()=> {

        });

        socket.on('new user',  (user, cb)=> {
            users[user.email] = socket.id;
            socket.userName = user.name;
            sockets[socket.id] = {username: user._id, socket: socket};
            cb(true)
        });
        socket.on('message',  (to, msg)=> {
console.log(msg,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.")
            sockets[users[to.email]].socket.emit(
                'push message',
                {
                    message: msg,
                    id: to._id,
                    from: sockets[socket.id].username
                }
            );
        });
    });
}
