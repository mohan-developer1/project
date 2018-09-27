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
					//fileDisplayArea.innerText = reader.result;
					//console.log(this.result);
					var lines=this.result.split("\n");
					full.appendRow(lines[0]);
					row.printrows(lines);			
   				 }
				reader.readAsText(file);	
				}
		 	else
				{
				fileDisplayArea.innerText = "File not supported!";
				}
		    });
		}
	}
var usr=new UploadFile();
window.onload =usr.uploadfile();
