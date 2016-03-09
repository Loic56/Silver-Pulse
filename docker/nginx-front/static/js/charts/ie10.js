// http://jsfiddle.net/cyril123/kwjppgmL/

var Graph_ie10 = React.createClass({
	 displayName: "Graph_ie10",

	render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement("svg", { id: "graph_ie10", className: "chart", viewBox:"0 0 400 200", perserveAspectRatio:"xMaxYMax"})
	    );
	  }
	});

	
ReactDOM.render(React.createElement(Graph_ie10, null), document.getElementById('container_ie10'));

var chart_ie10 = $("#graph_ie10"),	
    container_ie10 = $("#container_ie10"),
	aspect_ie10 = container_ie10.width() / container_ie10.height();

var w_ie10 = container_ie10.width();
var h_ie10 = w_ie10 / aspect_ie10 ;


var margin_ie10 = { top: (h_ie10*0.1), right:(w_ie10*0.1), bottom:0, left:(w_ie10*0.1)},
   width_ie10 = w_ie10 - margin_ie10.right - margin_ie10.left,
  height_ie10 = h_ie10 - margin_ie10.top - margin_ie10.bottom;


$(window).on("resize", function() {
    var targetWidth_ie10 = container_ie10.width();
	var targetHeight_ie10 = Math.round(targetWidth_ie10 / aspect_ie10) ;
	var targetMargin_ie10 = {top: (targetHeight_ie10*0.1) , right: (targetWidth_ie10*0.10) , bottom:0, left:(targetWidth_ie10*0.10)};
    chart_ie10.attr("width", targetWidth_ie10 - targetMargin_ie10.right - targetMargin_ie10.left);
    chart_ie10.attr("height", targetHeight_ie10 - targetMargin_ie10.top - targetMargin_ie10.bottom); 
}).trigger("resize");


var color_ie10 = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var color_ie10 = d3.scale.category10();

// rangeRoundBands > espace entre les barres
var x_ie10 = d3.scale.ordinal()
    .rangeRoundBands([0, width_ie10], .1);
  
var y1_ie10 = d3.scale.linear()
    .range([height_ie10, 0]);

var y2_ie10 = d3.scale.linear()
    .range([height_ie10, 0]);
	
var xAxis_ie10 = d3.svg.axis()
  .scale(x_ie10)
  .orient('bottom');

var y1Axis_ie10 = d3.svg.axis()
  .scale(y1_ie10)
  .orient('left')
  .tickPadding(8)
  .tickSize(1); 
  
var y2Axis_ie10 = d3.svg.axis()
  .scale(y2_ie10)
  .orient('right')
  .tickPadding(8)
  .tickSize(1) ;

var tip_ie10 = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Nb:</strong> <span style='color:red'>" + d.Nb_d_anomalies_réouvertes + "</span>";
  })


		
//Chart Body    
var ie10 = d3.select("#graph_ie10")
  .attr('class', 'chart')
  .attr("width", width_ie10)
  .attr("height", height_ie10)
  .append("g")
  .attr('transform', 'translate(' + margin_ie10.left + ', ' + margin_ie10.top + ')');
  
ie10.call(tip_ie10); 

d3.tsv("../resources/ie10.tsv", type, function(error, data) {
  if (error) throw error;
  
  x_ie10.domain(data.map(function(d) { return d.Version; }));
  y1_ie10.domain([0, d3.max(data, function(d) { return d.Nb_d_anomalies_réouvertes; })]);
  y2_ie10.domain([0, d3.max(data, function(d) { return d.Taux_de_réouvertures; })]);
  

  //title
  ie10.append("text")
        .attr("x", 0)             
        .attr("y", 0 - (margin_ie10.top / 2))
        .attr("text-anchor", "left")  
        .style("font-size", "10px") 
        .text("IE10 - Suivi des réouvertures");
		
	// chart
	ie10.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x_ie10(d.Version); })
      .attr("width", x_ie10.rangeBand())
      .attr("y", function(d) { return y1_ie10(d.Nb_d_anomalies_réouvertes); })
      .attr("height", function(d) { return height_ie10 - y1_ie10(d.Nb_d_anomalies_réouvertes); })
	  .on('mouseover', tip_ie10.show)
      .on('mouseout', tip_ie10.hide);

  
	//Draw legend
	var legend = ie10.append("g")
	  .attr("class", "legend")
	  /*.attr("x", width_ie10 - 65)
	  .attr("y", 25)
	  .attr("height", 100)
	  .attr("width", 100)*/;

	legend.append("rect")
	  .attr("x", width_ie10 + 50)
	  .attr("y", (height_ie10 / 2))
	  .attr("width", 12)
	  .attr("height", 1)
	  .style("fill", "DarkOrange");
	legend.append("text")
	  .attr("x", width_ie10 + 70)
	  .attr("y", (height_ie10 / 2) + 5)
	  .style("font-size", "9px")  
	  .text("réouvertures");
	  
	legend.append("rect")
	  .attr("x", width_ie10 + 50)
	  .attr("y", (height_ie10 / 2) + 15)
	  .attr("width", 12)
	  .attr("height", 12)
	  .style("fill", "SteelBlue")
	legend.append("text")
	  .attr("x", width_ie10 + 70)
	  .attr("y", (height_ie10 / 2) + 25)
	  .style("font-size", "9px")  
	  .text("Nb d'anomalies réouvertes");


	//Draw axe X
	ie10.append("g")
      .attr("class", "x axis")
	  .style("font-size", "8px")
      .attr("transform", "translate(0," + height_ie10 + ")")
      .call(xAxis_ie10)
	 .selectAll("text")
	  .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start");
	  
	//Draw axe Y1
	ie10.append("g")
      .attr("class", "y1 axis")
	  .style("font-size", "8px")
      .call(y1Axis_ie10)
    .append("text")
      .attr("transform", "rotate(-90)")
	  .style("font-size", "8px")
      .attr("y", 2)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Nb d'anomalies réouvertes");

	//Draw axe Y2
	ie10.append('g')
	  .attr('class', 'y2 axis')
	  .attr("transform", "translate( " + (width_ie10) + ",0)")
	  .style("font-size", "8px")
	  .call(y2Axis_ie10)
	.append("text")
	  .attr("transform", "rotate(-90)")
	  .style("font-size", "8px")
      .attr("y", 30)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Taux de réouvertures");
  
	//Draw line chart    
	ie10.append("path")
	  .attr("d", lineData_ie10(data))
	  .style('stroke', 'DarkOrange')
	  .style('stroke-width', '2px');

});

var lineData_ie10 = d3.svg.line()
  .x(function (d) { return x_ie10(d.Version); })
  .y(function (d) { return y2_ie10(d.Taux_de_réouvertures); });
  
function type(d) {
  d.param = +d.param;
  return d;
}