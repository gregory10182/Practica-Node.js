const express = require('express');
const app = express();
const http = require('http');

const server = http.createServer(app);
const PORT = process.env.PORT || 8080 
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static(__dirname + '/templates'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
})

io.on('connection', (socket) => {
    console.log('Se ha conectado un usuario');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Se ha desconectado un usuario');
    });
});



server.listen(PORT , () => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});

