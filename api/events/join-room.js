module.exports = ({ io, socket, db }, { room, user }) => {
  const currentPlayers = db.get(room).get('players').value();

  if (currentPlayers.find(player => player.id == user.id)) return;

  db.get(room)
    .get('players')
    .push({ ...user, correct: 0, mistakes: 0 });

  db.save();

  socket.join(room);

  const currentRoom = db.get(room).value();
  io.to(room).emit('joined-room', {
    ...currentRoom,
    word: currentRoom.word
      .split('')
      .map(letter => (currentRoom.guessed.includes(letter.toUpperCase()) ? letter : '_ '))
      .join(''),
  });
};
