import socketio from 'socket.io';
import Cab from '../src/server/models/cab';

export default (server) => {
    const io  = socketio(server);

    io.on('connection', (socket)=> {
      socket.on('joined', (data) => {
        const { cabId } = data;
        socket.join(cabId);
      });
        
      socket.on('pickUp', (data) => {
        const { location, cabId } = data;
        socket.to(cabId).emit('updateLocation', location );
      })
      
    });
}
