class UploadFile
 {
   uploadfile()
   {
     var uploadid = document.getElementById("uploadid");
     var fileInput = document.getElementById("fileInput");
     var fileDisplayArea = document.getElementById("fileDisplay");

     uploadid.addEventListener('click', function(e)
      {
        var file = fileInput.files[0];
        var textType = /^([a-zA-Z0-9\s_\\.\-:])+(.csv)$/;
        var tableName = document.getElementById("myText").value;
        soc.makeconnection(file,tableName);
        if (file.type.match(textType))
        {
          var reader = new FileReader();
          reader.onload = function(e)
          {
            var lines=e.target.result.split("\n");
            let rowss=lines.map(row=>row.split(','));
            var dataTypes = usr.printlist(rowss);
            console.log(dataTypes);
            usr.createshema(dataTypes);
          }
            reader.readAsText(file);
       }
     else
       {
       fileDisplayArea.innerText = "File not supported!";
       }
       });
   }
   printlist(rowss)
	 {
	    let newAry=[];
	    var O = {};
	    for(let i=0;i<rowss[0].length;i++)
	    {
		        var flot1=rowss.map(function(value,index){ return value[i]});
			      flot1.shift();
			      flot1.pop();
			    var flot=flot1.map(function(value)
     			{
  				      if (!isNaN(value) && value.toString().indexOf('.') != -1)
				         {
      				         return "float"
    				     }
  				      else if((value.length!=4)&&(!isNaN(Date.parse(value))))
  				       {
    				          return "date"
  				       }
  				      else if(isNaN(value))
  				       {
    				           return "String"
  				       }
  				      else return "int"
			    });
		    if(flot.includes("String"))
		    {
			      O[rowss[0][i]]="varchar";
			      //newAry.push("varchar");
		    }
		   else if(flot.every( (val, i, arr) => val === arr[0] ))
		    {
			       O[rowss[0][i]]=flot[0];
			       //newAry.push(flot[0]);
		    }
	    }
	//	console.log(O);
		return O;
	}
   createshema(value)
   {
     document.getElementById("create").addEventListener("click", function(e){console.log("it's Working...")
      var xhttp = new XMLHttpRequest();
      xhttp.open('POST', '/ui', true);
      xhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
      xhttp.send(JSON.stringify(value));
      });
   }
 }
var usr=new UploadFile();
window.onload =usr.uploadfile();
window.onload = usr.createshema();
