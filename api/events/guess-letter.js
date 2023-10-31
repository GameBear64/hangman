module.exports = ({ io, socket, db }, { room, userID, guess }) => {
  const currentRoom = db.get(room).value();
  const currentPlayer = currentRoom.players?.findIndex(({ id }) => id == userID);

  if (currentRoom.turn % currentRoom.players.length !== currentPlayer) return socket.emit('not-your-turn');

  currentRoom.guessed.push(guess);

  if (currentRoom.word.toUpperCase().includes(guess)) {
    currentRoom.players[currentPlayer].correct += 1;
  } else {
    currentRoom.players[currentPlayer].mistakes += 1;
    currentRoom.turn += 1;
  }

  db.set(room, currentRoom).save();

  io.to(room).emit('update-game', {
    ...currentRoom,
    word: currentRoom.word
      .split('')
      .map(letter => (currentRoom.guessed.includes(letter.toUpperCase()) ? letter : '_ '))
      .join(''),
  });
};
