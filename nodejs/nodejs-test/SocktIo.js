// var app = require('http').createServer(handler), 
//     io = require('socket.io').listen(app), 
//     fs = require('fs')

// app.listen(8080);
// io.set('log level', 1);//将socket.io中的debug信息关闭

// function handler (req, res) {
//   fs.readFile(__dirname + '/index.html',function (err, data) {  
//     if (err) {
//       res.writeHead(500);
//       return res.end('Error loading index.html');
//     }    
//     res.writeHead(200, {'Content-Type': 'text/html'});    
//     res.end(data);
//   });
// }

// io.sockets.on('connection', function (socket) {
// 	console.log('connection------------');
//     socket.emit('news', { hello: 'world' });
//     socket.on('my other event', function (data) {
//       console.log(data);
//     });
// });


var io = require('socket.io').listen(1010);

io.sockets.on('connection', function (socket) {
  console.log('connection');
  socket.on('message', function () {
       console.log('message');
   });
  socket.on('disconnect', function () {
   console.log('disconnect');
    });
});