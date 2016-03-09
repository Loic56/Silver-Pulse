
var Graph_ie13 = React.createClass({
	 displayName: "Graph_ie13",

	render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement("svg", { id: "graph_ie13", className: "chart", viewBox:"0 0 400 200", perserveAspectRatio:"xMaxYMax"})
	    );
	  }
	});

ReactDOM.render(React.createElement(Graph_ie13, null), document.getElementById('container_ie13'));


var chart_ie13 = $("#graph_ie13"),	
    container_ie13 = $("#container_ie13"),
	aspect_ie13 = container_ie13.width() / container_ie13.height();

var w_ie13 = container_ie13.width();
var h_ie13 = w_ie13 / aspect_ie13 ;

var margin_ie13 = {top: (h_ie13*0.1), right:(w_ie13*0.1), bottom: 0, left:(w_ie13*0.1)},
    width_ie13 = w_ie13 - margin_ie13.left - margin_ie13.right,
    height_ie13 = h_ie13 - margin_ie13.top - margin_ie13.bottom;

var ie13 = d3.select("#graph_ie13")
    .attr("width", width_ie13)
    .attr("height", height_ie13)
  .append("g")
    .attr("transform", "translate(" + margin_ie13.left + "," + margin_ie13.top + ")");
	
$(window).on("resize", function() {
    var targetWidth_ie13 = container_ie13.width();
	var targetHeight_ie13 = Math.round(targetWidth_ie13 / aspect_ie13) ;
	var targetMargin_ie13 = {top: (targetHeight_ie13*0.1) , right: (targetWidth_ie13*0.10) , bottom:0, left:(targetWidth_ie13*0.10)};
    chart_ie13.attr("width", targetWidth_ie13 - targetMargin_ie13.left - targetMargin_ie13.right);
    chart_ie13.attr("height", targetHeight_ie13 - targetMargin_ie13.top - targetMargin_ie13.bottom); 
}).trigger("resize");

// espace entre les barres
var x_ie13 = d3.scale.ordinal()
    .rangeRoundBands([0, width_ie13], .25);

var y_ie13 = d3.scale.linear()
    .rangeRound([height_ie13, 0]);
	
var y2_ie13 = d3.scale.linear()
    .range([height_ie13, 0]);
	
var color_ie13 = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
  
var xAxis_ie13 = d3.svg.axis()
    .scale(x_ie13)
    .orient("bottom");

var yAxis_ie13 = d3.svg.axis()
    .scale(y_ie13)
    .orient("left")
	.tickFormat(function(d) { return d });
	
var y2Axis_ie13 = d3.svg.axis()
  .scale(y2_ie13)
  .orient('right')
  .tickPadding(8)
  .tickSize(1) ;
  

var lineData_ie13 = d3.svg.line()
  .x(function (d) { return x_ie13(d.Version); }) // +33> la ligne est centree sur la bar
  .y(function (d) { return y2_ie13(d.percentage_de_régressions); });
  
d3.csv("../resources/ie13.csv", function(error, data) {

  if (error) throw error;

  color_ie13.domain(d3.keys(data[0]).filter(function(key) { return key !== "Version" && key !== "percentage_de_régressions" ; }));

  data.forEach(function(d) {
    var y0 = 0;
    d.ages = color_ie13.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
    d.total = d.ages[d.ages.length - 1].y1;
  });

  x_ie13.domain(data.map(function(d) { return d.Version; }));
  y_ie13.domain([0, d3.max(data, function(d) { return d.total; })]);
  y2_ie13.domain([0, d3.max(data, function(d) { return d.percentage_de_régressions; })]);
  
//title
  ie13.append("text")
        .attr("x", 0)             
        .attr("y", 0 - (margin_ie13.top / 2))
        .attr("text-anchor", "left")  
        .style("font-size", "10px") 
        .text("IE13 - Suivi des régressions par version");

// bar chart	
  var versions = ie13.selectAll(".version")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x_ie13(d.Version) + ",0)"; });

  versions.selectAll("rect")
      .data(function(d) { return d.ages; })
    .enter().append("rect")
      .attr("width", x_ie13.rangeBand())
      .attr("y", function(d) { return y_ie13(d.y1); })
      .attr("height", function(d) { return y_ie13(d.y0) - y_ie13(d.y1); })
      .style("fill", function(d) { return color_ie13(d.name); });
 
// line chart    
	ie13.append("path")
	  .attr("d", lineData_ie13(data))
	  .style('stroke', 'DarkOrange')
	  .style('stroke-width', '2px');

  
// legends
// bar
  var bar_legends = ie13.selectAll(".legend")
      .data(color_ie13.domain().slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + ((height_ie13 / 2) + i * 15) + ")"; });
  bar_legends.append("rect")
      .attr("x", width_ie13 + 40)
      .attr("width", 12)
      .attr("height", 12)
      .style("fill", color_ie13);
  bar_legends.append("text")
      .attr("x", width_ie13 + 55)
      .attr("y", 9)
      .attr("dy", ".35em")
	  .style("font-size", "9px")  
      //.style("text-anchor", "end")
      .text(function(d) { return d; });
	  
// line	  
 var line_legend = ie13.append("g")
	  .attr("class", "legend");
	line_legend.append("rect")
	  .attr("x", width_ie13 + 40)
	  .attr("y", (height_ie13 / 2) + 55)
	  .attr("width", 12)
	  .attr("height", 1)
	  .style("fill", "DarkOrange");
	line_legend.append("text")
	  .attr("x", width_ie13 + 55)
	  .attr("y", (height_ie13 / 2) + 57)
	  .style("font-size", "8px")  
	  .text("percentage de régressions");
  
	  
// Axe x
  ie13.append("g")
      .attr("class", "x axis")
	  .style("font-size", "8px")  
      .attr("transform", "translate(0," + height_ie13 + ")")
      .call(xAxis_ie13);
// Axe y1
  ie13.append("g")
      .attr("class", "y1 axis")
	  .style("font-size", "8px")  
      .call(yAxis_ie13)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 2)
	  .style("font-size", "8px")  
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Nb");
// Axe y2
  ie13.append('g')
	  .attr('class', 'y2 axis')
	  .attr("transform", "translate( " + (width_ie13) + ",0)")
	  .style("font-size", "8px") 
	  .call(y2Axis_ie13)
	.append("text") 
	  .attr("transform", "rotate(-90)")
	  .style("font-size", "8px") 
      .attr("y", 40)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Percent (%)");
});
