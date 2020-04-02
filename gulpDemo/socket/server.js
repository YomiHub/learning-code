//服务器端监听socket
var http = require('http');
var fs = require('fs');
var io = require('socket.io');   //引入模块

var documentRoot = 'http://copywebsite.com';

var httpServer = http.createServer(function (req, res) {
  var url = req.url;
  var file = documentRoot + url;
  console.log(file);
  fs.readFile(file, function (err, data) {
    if (err) {
      res.writeHeader(404, {
        'content-type': 'text/html;charset="utf-8"'
      });
      res.write('<h1>404</h1><p>你要找的页面被LEO吃了</p>');
      res.end();
    } else {
      res.writeHeader(200, {
        'content-type': 'text/html;charset="utf-8"'
      });
      res.write(data);
      res.end();
    }
  });
}).listen(3000);

console.log("连接建立完毕");
var socket = io.listen(httpServer);
socket.sockets.on('connection', function (socket) {
  //socket  每个连接都有独立的socket对象
  console.log('有人通过socket连接进来了');
  socket.emit('hello', '欢迎');         //emit('事件发送名称','发送的数据')
  /*socket.on('hellotoo', function(data) {
      console.log(data);
  })*/

  //socket.broadcast.emit('a');  //向除了该触发事件以外的所有客户端发送
  socket.broadcast.emit('a', '有新人进来了');
  //监听客户端的
  socket.on('move', function (data) {
    socket.broadcast.emit('move2', data);
  });
});