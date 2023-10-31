module.exports = ({ io, socket, db }) => {
  const userToken = socket.handshake.auth.userID;

  // clean up inactive rooms
  const activeRooms = Array.from(io.sockets.adapter.rooms.keys());
  const toClean = Object.keys(db.value()).filter(room => !activeRooms.includes(room));

  for (const room of toClean) {
    db.get(room).delete(true);
  }

  // remove user from active rooms
  for (const [room, data] of Object.entries(db.value())) {
    data.players = data.players.filter(({ id }) => id !== userToken);

    io.to(room).emit('update-game', {
      ...data,
      word: data.word
        .split('')
        .map(letter => (data.guessed.includes(letter.toUpperCase()) ? letter : '_ '))
        .join(''),
    });
    db.set(room, data);
  }

  db.save();
};
