import { Server } from 'socket.io';
const messages = [];
export default function configureSocket(httpServer) {
  const io = new Server(httpServer);
  io.on('connection', (socket) => {
    console.log('new connection:', socket.id);
    socket.on('message', (data) => {
      console.log('message', data);
      messages.push(data);
      console.log({ messages });
      io.emit('messageLogs', messages);
    });
    socket.on('new_user', (data) => {
      console.log('new user:', data);
      socket.emit('messageLogs', messages);
      socket.broadcast.emit('user_connected', data);
    });
  });
}
