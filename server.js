const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    pingInterval: 5000,
    pingTimeout: 10000
});

app.get('/', (req, res) => {
    res.send(
        `
        <head>
            <title>Chat</title>
            <script src="/socket.io/socket.io.js"></script>
        </head>
        <body>
            Chat
            <script>
                window.onload = function() {
                  let socket = io.connect('/');
        
                  window.mySocket = socket;
                  
                  // let manager = new Manager('/');
                  // console.log(manager.reconnectionDelayMax());
                  console.log(socket);
                  
                  socket.on('reconnect_attempt', function(no) {
                      console.log(no);
                  })
                }
            </script>
        </body>
        `
    );
});

// io.engine.generateId = function(req) {
//     console.log(req._query);
//     return req._query.token;
// };

io.on('connection', function(socket){
    console.log('in connection');
    console.log(socket.id);

    socket.on('my_ping', function () {
        console.log('my_ping');
    });

    socket.onclose = function (reason) {
        console.log(reason);
    }
});

http.listen(3000, function(){
    console.log('listening on port:3000');
});