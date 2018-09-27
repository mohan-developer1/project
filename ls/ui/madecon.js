class conn_socket
{
  makeconnection(file,tableName)
  {
    var chunkSize =50;
    var fileSize = file.size;
    var chunks = Math.ceil(file.size/chunkSize);
    var chunk = 0;
    var socket = io('http://localhost:4000');
    socket.on('news',function (data)
    {
      console.log(data);
    });
    socket.emit('checking',{tablename:tableName,fileData:fileSize});
    var i=0;
    socket.on('requestdata',function()
    {
      var offset = chunk*chunkSize;
      var data=file.slice(offset,offset+chunkSize);
      var reader = new FileReader();
      reader.onload = function()
      {
        var text = reader.result;
  //      console.log(text);
        chunk++;
        i=i+10;
        socket.emit('senddata',{fileData:text})
        soc.move(i);
      };
      reader.readAsText(data);
    });
    socket.on('completed',function()
    {
      soc.progcomplted();
      console.log("completed....");
    });
  }
  progcomplted()
  {
    document.getElementById("myprog").innerHTML="Completed...."
  }
  move(value)
  {
    var elem = document.getElementById("myBar");
    var width  = value;
    elem.style.width = width + '%';
  }

}
 var soc = new conn_socket();
