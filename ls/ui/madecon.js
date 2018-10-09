class conn_socket
{
  makeconnection(file,fileType)
  {
    var chunkSize =file.size/10;
    var fileSize = file.size;
    var chunks = Math.ceil(file.size/chunkSize);
    var chunk = 0;
    var socket = io('http://localhost:4000');
    socket.on('news',function (data)
    {
      console.log(data);
    });
    socket.emit('checking',{fileType:fileType,fileData:fileSize});
    var i=0;
    socket.on('requestdata',function()
    {
      var offset = chunk*chunkSize;
      var data=file.slice(offset,offset+chunkSize);
      var reader = new FileReader();
      if(fileType =="csv")
      {
        reader.onload = function()
        {
            var text = reader.result;
  //        console.log(text);
          chunk++;
          i=i+10;
          socket.emit('senddata',{fileData:text})
          soc.move(i);
        };
      reader.readAsText(data);
    }
    else
    {
      if(data)
				{
				 reader.onload = function(e)
				  {
        				var data = e.target.result;
        				var cfb = XLS.CFB.read(data, {type: 'binary'});
        				var wb = XLS.parse_xlscfb(cfb);
        				wb.SheetNames.forEach(function(sheetName,index)
					       {
            					var text = XLS.utils.make_csv(wb.Sheets[sheetName]);
						          if(text)
						          {
							            chunk++;
                          i=i+10;
                          socket.emit('senddata',{fileData:text})
                          soc.move(i);
            		      }
        				});
    			};
    					reader.readAsBinaryString(file);
				}
    }
    });
    socket.on('completed',function()
    {
      soc.progcomplted();
      socket.close();
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
