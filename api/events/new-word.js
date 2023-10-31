const { words } = require('../utils');

module.exports = ({ io, socket, db }, { room }) => {
  db.get(room).set('guessed', []);
  db.get(room).set('word', words[Math.floor(Math.random() * words.length)]);
  db.save();

  const state = db.get(room).value();

  io.to(room).emit('update-game', {
    ...state,
    word: state.word.replace(/./g, '_ '),
  });
};
