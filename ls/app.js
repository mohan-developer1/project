var express = require('express');
var socket = require('socket.io');
var fs = require('fs');
var route_controller = require('./server/router');
var app = express();
app.use('/',route_controller);
app.use('/about',route_controller);
app.use('/contact',route_controller)
var server = app.listen(4000,function(){
  console.log("listening on port 4000");
});
app.use('/ui',express.static('ui'));
var  io = socket(server);
var filesize;
io.on('connection',function(socket)
{
    console.log('connection established');
    socket.emit('news', { responce : 'iam ready to accept' });
    socket.on('checking',function(data)
    {
      filesize=data.fileData;
      socket.emit('requestdata',{});
      socket.on('senddata',function(data)
      {
        console.log(filesize);
        console.log(data);
        fs.appendFileSync('./server/temp/temp.csv',data.fileData);
        console.log(filesize);
        if(filesize>0)
        {
          filesize=filesize-50;
          socket.emit('requestdata',{});
        }
        else
        {
          socket.emit('completed',{});
        }
      });
});
});
