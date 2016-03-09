var Graph_ic2 = React.createClass({
	 displayName: "Graph_ic2",

	render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement("svg", { id: "graph_ic2", className: "chart", viewBox:"0 0 400 200", perserveAspectRatio:"xMaxYMax" })
	    );
	  }
	});

ReactDOM.render(React.createElement(Graph_ic2, null), document.getElementById('container_ic2'));


var chart_ic2 = $("#graph_ic2"),	
    container_ic2 = $("#container_ic2"),
	aspect_ic2 = container_ic2.width() / container_ic2.height();

var w_ic2 = container_ic2.width();
var h_ic2 = w_ic2 / aspect_ic2 ;

var margin_ic2 = {top: (h_ic2*0.1) , right: (w_ic2*0.10) , bottom:0, left:(w_ic2*0.10)},
    width_ic2 = w_ic2 - margin_ic2.left - margin_ic2.right,
    height_ic2 = h_ic2 - margin_ic2.top - margin_ic2.bottom;
	

// espace entre les barres
var x_ic2 = d3.scale.ordinal()
    .rangeRoundBands([0, width_ic2], .25);

var y_ic2 = d3.scale.linear()
    .rangeRound([height_ic2, 0]);

var color_ic2 = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888"]);

var xAxis_ic2 = d3.svg.axis()
    .scale(x_ic2)
    .orient("bottom");

var yAxis_ic2 = d3.svg.axis()
    .scale(y_ic2)
    .orient("left");

var ic2 = d3.select("#graph_ic2")
    .attr("width", width_ic2)
    .attr("height", height_ic2)
  .append("g")
    .attr("transform", "translate(" + margin_ic2.left + "," + margin_ic2.top + ")");

$(window).on("resize", function() {
    var targetWidth_ic2 = container_ic2.width();
	var targetHeight_ic2 = Math.round(targetWidth_ic2 / aspect_ic2) ;
    var targetMargin_ic2 = {top: (targetHeight_ic2*0.1) , right: (targetWidth_ic2*0.10) , bottom:0, left:(targetWidth_ic2*0.10)};
	chart_ic2.attr("width", targetWidth_ic2 - targetMargin_ic2.left - targetMargin_ic2.right);
    chart_ic2.attr("height", targetHeight_ic2 - targetMargin_ic2.top - targetMargin_ic2.bottom); 
}).trigger("resize");


d3.csv("../resources/ic2.csv", function(error, data) {
  if (error) throw error;

  color_ic2.domain(d3.keys(data[0]).filter(function(key) { return key !== "Répertoire"; }));

  data.forEach(function(d) {
    var y0 = 0;
    d.repertoires = color_ic2.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
    d.total = d.repertoires[d.repertoires.length - 1].y1;
  });

  // order by percentage
  // data.sort(function(a, b) { return b.total - a.total; });
  x_ic2.domain(data.map(function(d) { return d.Répertoire; }));
  y_ic2.domain([0, d3.max(data, function(d) { return d.total; })]);
  
//title
  ic2.append("text")
        .attr("x", 0)             
        .attr("y", 0 - (margin_ic2.top / 2))
        .attr("text-anchor", "left")  
        .style("font-size", "10px") 
        .text("IC2 - Statut des fiches de tests par répertoire");

// chart	
  var week = ic2.selectAll(".week")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x_ic2(d.Répertoire) + ",0)"; });

  week.selectAll("rect")
      .data(function(d) { return d.repertoires; })
    .enter().append("rect")
      .attr("width", x_ic2.rangeBand())
      .attr("y", function(d) { return y_ic2(d.y1); })
      .attr("height", function(d) { return y_ic2(d.y0) - y_ic2(d.y1); })
      .style("fill", function(d) { return color_ic2(d.name); });

// legend
  var legend = ic2.selectAll(".legend")
      .data(color_ic2.domain().slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + ((height_ic2 /2) + i * 15) + ")"; });

  legend.append("rect")
      .attr("x", width_ic2 + 10)
      .attr("width", 12)
      .attr("height", 12)
      .style("fill", color_ic2);

  legend.append("text")
      .attr("x", width_ic2 + 25)
      .attr("y", 9)
      .attr("dy", ".35em")
      .attr("dy", ".10em")
	  .style("font-size", "9px")  
      .text(function(d) { return d; });

// Axes
  ic2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height_ic2 + ")")
	  .style("font-size", "8px")  
      .call(xAxis_ic2);

  ic2.append("g")
      .attr("class", "y axis")
	  .style("font-size", "8px")  
      .call(yAxis_ic2)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
	  .style("font-size", "8px")  
      .style("text-anchor", "end")
      .text("Percent (%)");
});
