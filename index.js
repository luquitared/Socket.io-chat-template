var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// For CSS
var publicPath = path.resolve(__dirname + '/');

// Null object ready for use
var data = {

}

// Serves the html through URL
app.use(express.static(publicPath));

app.get('/', function(req, res){
  res.sendFile('home.html', {root: publicPath});
});

app.get('/groups', function(req, res){
  res.sendFile('index.html', {root: publicPath});
});

app.get('/feed', function(req, res){
  res.sendFile('feed.html', {root: publicPath});
});

io.on('connection', function(socket) {
   socket.on('recieve name', function(rm, user){
     socket.join(rm);
     console.log(rm);
   });

   socket.on('chat message', function(msg, rm){
     console.log(msg, rm);
     io.in(rm).emit('chat message', msg);
   });

   socket.on('user', function(obj){ //Recieves user object
     console.log(obj);
   });

  socket.on('vote', function(rm, buttonID){
    console.log(buttonID);
    io.in(rm).emit('vote_recieved', buttonID);
  });

  socket.on('reaction', function(user){
    console.log(user);
    if(user.flag_recieved == true) {
      io.in('public').emit('down_recieved', user);
    }
    if(user.up_recieved == true) {
      io.in('public')
    }
  });

});

// What port to transmit data through
http.listen(port, function(){
  console.log('listening on *:' + port);
});
