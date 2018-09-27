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
					//console.log(rowss);
					usr.printlist(rowss);
					slct.createSelect(rowss,slct.createbutn);		
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
		for(let j=0;j<rowss.length;j++)
		{
			//console.log(rowss[0][j]);
		}
	}
}
var usr=new UploadFile();
window.onload =usr.uploadfile();
