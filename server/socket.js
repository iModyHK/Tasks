
const io = require('../index').io;

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('taskUpdated', (task) => {
    socket.broadcast.emit('taskUpdated', task);
  });

  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
