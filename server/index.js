var express = require('express');
var app = express();
var server = require('http').Server(app);
/*  Esta variable se le pasa a Socket.io para que entienda
    que va a estar trabajando con sockets dentro de la 
    conexión HTTP que vamos a crear.
*/

var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola-mundo', function(req, res){
    res.status(200).send('Hola mundo desde una ruta');
});

var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de Socket.io y node.js de Tomás López',
    nickname: 'Default-Bot'
}];

io.on('connection', function(socket){
    console.log("El cliente con IP: "+socket.handshake.address+" se ha conectado.");

    socket.emit('messages', messages);

    socket.on('add-message', function(data){ // .on para recoger un evento
        messages.push(data);

        io.sockets.emit('messages', messages);
    }); 
});

server.listen(6677, function(){ // Creación del servidor de Express
    console.log("SERVIDOR FUNCIONANDO en http://localhost:6677");
});

