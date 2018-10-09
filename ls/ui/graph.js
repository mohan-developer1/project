class graph
{
  createGraph(data1,data)
	{

		var rev=data.slice().reverse();
		// console.log(d3.max(data));
		 //console.log(rev);
		 var width = 500,
         	   height = 500;
	 	var barPadding =5;
	 	var barWidth =(width/data.length);


    // Append SVG
    var svg = d3.select("body")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
		.attr('class','bar-chart');
     var barChart = svg.selectAll("rect")
	 .data(data)
         .enter()
	 .append('rect')
         .attr('y',function(d){
		return height-d-150})
         .attr('height',function(d){return d;})
         .attr('width',25)
         .attr("transform",function (d,i){
		var translate =[barWidth*i+65,0];
		return "translate("+translate+")";
	});
    // Create scale
    var scale = d3.scaleOrdinal()
                  .domain(data1.map(function(d){
			console.log(d);
			return d;}))
                  .range([55,225,395]);
    var scale1 = d3.scaleLinear()
                   .domain([240,0])
                  .range([0, height/2]);
    // Add scales to axis
    var x_axis = d3.axisBottom()
                   .scale(scale);
    var yaxis = d3.axisLeft()
		   .tickArguments([10])
		  .scale(scale1);
    svg.append('g')
	.attr('transform','translate(50,100)')
	.call(yaxis);
    //Append group and insert axis
    svg.append("g")
	.attr('transform','translate(20,350)')
       .call(x_axis)
	.selectAll('text')
	.attr('transform',function(d){
		return 'rotate(40)'
		});
	}
}
var gr=new graph();
