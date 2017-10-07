import socketio from 'socket.io';

export default (server) => {
    const io  = socketio(server);

    io.on('connection', (socket) => {
        console.log('connected');

        socket.on('joined', (data) => {
            console.log('joined');

            const { cabId } = data;
        socket.join(cabId);
      });
        
      socket.on('pickUp', (data) => {
          console.log('pickUp');

          const { location, cabId } = data;
        socket.to(cabId).emit('updateLocation', location );
      })
      
    });
}
