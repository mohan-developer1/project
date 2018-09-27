class Selection
	{
	 createSelect(ary,callback)
	{
		var x=document.createElement("SELECT");
		x.setAttribute("id","myselect");
		document.body.appendChild(x);
		ary[0].forEach(printOptions);
		function printOptions(item,index)
		{
			var z=document.createElement("option");
			z.setAttribute("value", index);
			var t=document.createTextNode(item);
			z.appendChild(t);
			document.getElementById("myselect").append(z);
		}
		callback(ary);
	}
	createbutn(ary)
	{
		//console.log(ary);
		var btn = document.createElement("BUTTON");
		btn.id ="sbmt";
		var t = document.createTextNode("CLICK ME");
    		btn.appendChild(t);
    		document.body.appendChild(btn);
		document.getElementById("sbmt").addEventListener("click", function(e){ slct.createmulselect(ary,3);});
		var break1=document.createElement('br');
		btn.appendChild(break1);	  		
	}	
	createmulselect(ary,value)
	{
		var x = document.getElementById("myselect").selectedIndex;
		let predefind="SELECT"+" "+"* FROM Table_name WHERE ";
		var count=1;
		for(let j=1;j<ary.length-1;j++)
		{
			
			if(count && ary[j][x] == value)
			{
				predefind +=ary[0][x]+"=";
				var table_value=ary[j][x];
				if(isNaN(value))
				{
					predefind +='"'+table_value+'"';
				}
				else
				{
					predefind +=table_value;
				}
				--count;
			}
			 else if(count)
			{
				--count;
				alert("Element NOt found");
				return ;
			}
		}
		predefind +=";";
	 	var para = document.createElement("div");                      
		var t = document.createTextNode(predefind);       
		para.appendChild(t);                                        
		document.body.appendChild(para);
		slct.printrows(ary,x,value);       			
	}
	printrows(ary,x,value)
	{
		var c=0;
		var tbody="<table>";
		tbody+="<tr>";
	    for(let k=0;k<ary[0].length;k++)
		{
			console.log(ary[0][k]);
			tbody +="<td>"+ ary[0][k]+"</td>";
		}
		tbody+="</tr>";
	    for(let l=0;l<ary.length-1;l++)
		{			
			if(ary[l][x]==value)
			{	
				tbody += "<tr>";
			 for(let k=0;k<ary[l].length;k++)
			{	
				tbody += "<td>" + ary[l][k] + "</td>";
			}
				tbody += "</tr>";					
		}
			
	     }
		tbody += "</table>" ;
			document.getElementById("csv_table").style.bottom= "80px";
			document.getElementById('csv_table').innerHTML= tbody;	
	}
	
}
var slct=new Selection();
