const http = require('http');
const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('SocketIO');
  res.end();
});
const io = require('socket.io')(server, {
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true,
  },
  cors: {
    origin: '*',
  },
});

const StormDB = require('stormdb');
const engine = new StormDB.localFileEngine('./db.json');
const db = new StormDB(engine);

//============== Socket =============
const fileRegex = /\.\/events\/(?<cmd>(.*?))\.js/g;
const { Glob } = require('glob');
const eventPaths = new Glob('./events/*.js', {});

io.on('connection', async socket => {
  // socket.onAny((eventName, ...args) => {
  //   console.log('[ALL] ', eventName, args);
  // });

  // if room is passed, ensure that its real
  socket.use(function (data, next) {
    if (data?.[1]?.room && !db.value()[data?.[1]?.room]) return socket.emit('nonexistent-room');

    // do associations
    next();
  });

  for await (const file of eventPaths.found) {
    let eventFile = file.replace(fileRegex, '$<cmd>');

    socket.on(eventFile, (...args) => {
      require(`./${file}`)({ io, socket, db }, ...args);
    });
  }
});

//===== Listen on port #### =====
server.listen(3030, () => {
  console.log(`Listening on http://localhost:3030/`);
});
