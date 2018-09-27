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

			if (file.type.match(textType))
				{
				var reader = new FileReader();

				reader.onload = function(e)
				 {
					var lines=e.target.result.split("\n");
					let rowss=lines.map(row=>row.split(','));
					var dataTypes = usr.printlist(rowss);
					usr.createQuery(rowss[0],dataTypes,"Student","50");	
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
			newAry.push("varchar");
		}
		else if(flot.every( (val, i, arr) => val === arr[0] ))
		{
			newAry.push(flot[0]);
		}
	    }
		return newAry;
	}
	createQuery(row,datatypes,table_name,limit)
	{
		let predefind="CREATE TABLE"+" " +table_name+"(";
		for(let i=0;i<row.length;i++)
		{
			if(!datatypes[i].localeCompare("varchar"))
			{
				predefind +=row[i]+" "+datatypes[i]+"("+limit+")"+",";	
			}
			else{	predefind +=row[i]+" "+datatypes[i]+","; }
			
		}
		predefind = predefind.slice(0, -1); 
		predefind +=");";
	 	var para = document.createElement("div");                      
		var t = document.createTextNode(predefind);       
		para.appendChild(t);                                        
		document.body.appendChild(para);         		
		//console.log(predefind);
	}
}
var usr=new UploadFile();
window.onload =usr.uploadfile();
