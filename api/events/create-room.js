const { generate } = require('voucher-code-generator');
const { words } = require('../utils');

module.exports = ({ socket, db }, user) => {
  const [code] = generate({ length: 10 });

  db.set(code, {
    players: [{ ...user, correct: 0, mistakes: 0 }],
    word: words[Math.floor(Math.random() * words.length)],
    guessed: [],
    turn: 0, // player turn calculated from the total turns taken
  }).save();

  socket.join(code);
  const state = db.get(code).value();
  socket.emit('created-room', {
    code,
    state: {
      ...state,
      word: state.word.replace(/./g, '_ '),
    },
  });
};
