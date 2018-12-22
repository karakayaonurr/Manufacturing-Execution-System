var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var server = require("http").Server(app);
var io = require ("socket.io")(server);

app.set('io', io);
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './app_server/views'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require('./app_server/routers/managerRouter')(app);

server.listen(8080, () => {
    console.log("Server listen to Port:8080");
});

var connectionsArray = [];
io.on('connection', function(socket) {
  
    console.log('\nBir kullanıcı bağlandı!');
    connectionsArray.push(socket);
    console.log('Kullanıcı sayısı: ' + (connectionsArray.length));

    if (!connectionsArray.length) {
        pollingLoop();
    }

    socket.on('join', function(data) {
        console.log(data);
    });

    socket.on('disconnect', function() {
        var socketIndex = connectionsArray.indexOf(socket);
        connectionsArray.splice(socketIndex, 1);
        console.log('\nBir kullanıcı ayrıldı!\nKalan kullanıcı sayısı: '+(connectionsArray.length));
    });

});
