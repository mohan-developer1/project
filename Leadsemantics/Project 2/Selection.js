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
		document.getElementById("sbmt").addEventListener("click", function(e){ slct.createmulselect(ary);});
		var break1=document.createElement('br');
		btn.appendChild(break1);	  		
	}
	createmulbtn(ary)
	{
		
		var btn1 = document.createElement("BUTTON");
		btn1.id ="mulbtn";
		var t = document.createTextNode("CLICK ME");
    		btn1.appendChild(t);
    		document.body.appendChild(btn1);
		document.getElementById("mulbtn").addEventListener("click", function(e){ slct.searchmul(ary);});	  		
	}		
	createmulselect(ary)
	{
		var x=document.createElement("SELECT");	
		x.setAttribute("id","multi");
		document.body.appendChild(x);
		document.getElementById("multi").multiple = true;
		for(let l=1;l<ary.length-1;l++)
		{
			var z=document.createElement("option");
			z.setAttribute("value",l);
			var x = document.getElementById("myselect").selectedIndex;
			//console.log(x);
			//var t=document.createTextNode(document.getElementsByTagName("option")[x].value);
			var t=document.createTextNode(ary[l][x]);
			z.appendChild(t);
			var d=document.getElementById("multi").append(z);
		}
		slct.createmulbtn(ary);
	}
	searchmul(ary)
	{
		//console.log(ary);	
    		var select1 = document.getElementById("multi");
    		var selected1 = [0];
    		for (var i = 0; i < select1.length; i++) 
		{
        		if (select1.options[i].selected) selected1.push(select1.options[i].value);
    		}
    		//console.log(selected1);
		var ary1=selected1.map(Number);
		var tbody="<table>";
		ary1.forEach(printtable);
		function printtable(item)
		{
			//console.log(ary[item]);
			tbody += "<tr>";
			for(let k=0;k<ary[item].length;k++)
			{
				tbody += "<td>" + ary[item][k] + "</td>";
				console.log(ary[item][k]);
			}
			tbody += "</tr>" ;
		}
		tbody += "</table>" ;
		document.getElementById("csv_table").style.bottom= "100px";
		document.getElementById('csv_table').innerHTML= tbody;		
	}
	
}
var slct=new Selection();
