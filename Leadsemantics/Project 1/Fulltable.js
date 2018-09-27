class	Fulltable
{
	appendRow(lines)
	 {
		let clums=lines.split(",");
  		for(let l=0;l<clums.length;l++)
   		{
    		var tbl = document.getElementById('my-table'),
        	row = tbl.insertRow(tbl.rows.length),     
        	i;
    		for (i = 0; i < 1; i++) 
			{
        		full.createCell(row.insertCell(i),clums[l]);
    			}
   		}
	}
 
	createCell(cell, text)
	{
    	 var div = document.createElement('div'), 
         txt = document.createTextNode(text);
    	 div.appendChild(txt);                
   	 cell.appendChild(div);       
	}
	appendColumn(lins)
	{
		let rowline=lins.split(",");
		var tbl = document.getElementById("my-table"),
		i;
  		for (i = 0; i<rowline.length; i++)
		{
		full.createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length),rowline[i]);
		}
	}
}
var full=new Fulltable();
