class UploadFile
 {
   uploadfile()
   {
     var uploadid = document.getElementById("uploadid");
     var fileInput = document.getElementById("fileInput");
     var fileDisplayArea = document.getElementById("fileDisplay");

     uploadid.addEventListener('click', function(e)
      {
        var oFile = fileInput.files[0];
        var textType = /^([a-zA-Z0-9\s_\\.\-:])+(.csv)$/;
        var tableName = document.getElementById("myText").value;
        if (oFile.type.match(textType))
        {
          soc.makeconnection(oFile,"csv");
          var reader = new FileReader();
          reader.onload = function(e)
          {
            var lines=e.target.result.split("\n");
            let rowss=lines.map(row=>row.split(','));

            var dataTypes = usr.printlist(rowss);
            var data_ary = Object.values(dataTypes);
            document.getElementById("create").addEventListener("click", function(e)
            {
              usr.createshema(dataTypes, usr.createSelect(data_ary,rowss[0]));
            });
          //  usr.createSelect(data_ary,rowss[0]);


          }
            reader.readAsText(oFile);
       }
     else
       {
         soc.makeconnection(oFile,"xls");
         var reader = new FileReader();
     			// Ready The Event For When A File Gets Selected
     			reader.onload = function(e)
 			      {
         			var data = e.target.result;
         			var cfb = XLS.CFB.read(data, {type: 'binary'});
         			var wb = XLS.parse_xlscfb(cfb);
         			wb.SheetNames.forEach(function(sheetName,index)
              {
             				var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
 					              if(sCSV.length)
 					              {
 					                    var spliting = sCSV.split('\n');
 					                    var final = spliting.map(row=>row.split(','));
                              final.splice(-1);
                              var dataTypes = usr.printlist(final);
                              usr.createshema(dataTypes);

 					              }
         			});
     			    };
     				reader.readAsBinaryString(oFile);
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
		return O;
	}
   createshema(value)
   {
        console.log("it's Working...")
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function()
        {
              if(xhttp.readyState == 4)
              {
                console.log("************   "+xhttp.responseText);
                //return 1;
              }
        }
        xhttp.open('POST','/data', true);
        //xhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        xhttp.setRequestHeader('Content-Type','text/plain');
        xhttp.send(JSON.stringify(value));
    //  return 0;
   }
   createSelect(dataTypes,columns)
   {
      console.log(dataTypes);
      console.log(columns);
      var x=document.createElement("SELECT");
      x.setAttribute("id","myselect");
      document.body.appendChild(x);
      var y=document.createElement("SELECT");
      y.setAttribute("id","myselect1");
      document.body.appendChild(y);
      for(var index=0;index<dataTypes.length;index++)
      {
          if(dataTypes[index]=='varchar')
          {
              var z=document.createElement("option");
              z.setAttribute("value", index);
              var t=document.createTextNode(columns[index]);
              z.appendChild(t);
              document.getElementById("myselect").append(z);
          }
          else
          {
              var z=document.createElement("option");
              z.setAttribute("value", index);
              var t=document.createTextNode(columns[index]);
              z.appendChild(t);
              document.getElementById("myselect1").append(z);
          }
   }
       var btn = document.createElement("BUTTON");
       btn.id ="sbmt";
       var t = document.createTextNode("CLICK ME");
       btn.appendChild(t);
       document.body.appendChild(btn);
       document.getElementById("sbmt").addEventListener("click", function(e){
       var x = document.getElementById("myselect");
       var y = document.getElementById("myselect1");
       var str=x.options[x.selectedIndex].text;
       var str2=y.options[y.selectedIndex].text;
       var xhttp2 = new XMLHttpRequest();
       var value=str+","+str2;
       xhttp2.onreadystatechange = function()
       {
             if(xhttp2.readyState == 4)
             {
               var res_obj=xhttp2.responseText;
               let obj_1 = JSON.parse(res_obj);
               console.log(str);
               let data_str = obj_1.map(x => x[str]);
               let data_int = obj_1.map(y => y[str2]);
               console.log(data_str);
               console.log(data_int);
               gr.createGraph(data_str,data_int);
             }
       }
       xhttp2.open('POST','/select', true);
       //xhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
       xhttp2.setRequestHeader('Content-Type','text/plain');
       console.log(JSON.stringify(value));
       xhttp2.send(value);
     });
 }
}
var usr=new UploadFile();
window.onload =usr.uploadfile();
