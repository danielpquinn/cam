var express = require('express'),
  app = express(),
  server = require('http').createServer(app).listen(process.env.NODE_PORT || 8082),
  io = require('socket.io').listen(server, { log: false }),
  camStarted = false;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/cam', function (req, res) {
  if (!camStarted) {
    camStarted = true;
    res.render('cam');
  } else {
    res.send('Camera is already in use.');
  }
});

app.get('/', function (req, res) {
  res.render('viewer');
});

io.sockets.on('connection', function (socket) {
  socket.on('snap', function (data) {
    socket.broadcast.emit('image updated', data);
  });
});