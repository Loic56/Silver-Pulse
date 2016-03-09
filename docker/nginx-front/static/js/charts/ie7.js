
var Graph_ie7 = React.createClass({
	 displayName: "Graph_ie7",

	render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement("svg", 
		  { id: "graph_ie7", className: "chart", viewBox:"0 0 400 200", perserveAspectRatio:"xMaxYMax" }) // viewBox > emplacement du chart ds le svg
	    );
	  }
	});
	
ReactDOM.render(React.createElement(Graph_ie7, null), document.getElementById('container_ie7'));

var chart_ie7 = $("#graph_ie7"),	
    container_ie7 = $("#container_ie7"),
	aspect_ie7 = container_ie7.width() / container_ie7.height();

var w_ie7 = container_ie7.width();

var h_ie7 = w_ie7 / aspect_ie7 ;

var margin_ie7 = {top: (h_ie7*0.1) , right: (w_ie7*0.10) , bottom:0, left:(w_ie7*0.10)},
    width_ie7 = w_ie7 - margin_ie7.left - margin_ie7.right,
    height_ie7 = h_ie7 - margin_ie7.top - margin_ie7.bottom;

var color_ie7 = d3.scale.category20b();

var x_ie7 = d3.scale.ordinal()
    .rangeRoundBands([0, width_ie7], 0.25);

var xAxis_ie7 = d3.svg.axis()
    .scale(x_ie7)
    .orient("bottom");

var y_ie7 = d3.scale.linear()
    .rangeRound([height_ie7, 0]);
var yAxis_ie7 = d3.svg.axis()
    .scale(y_ie7)
    .orient("left")
	.tickFormat(function(d) { return d * 100 + "%"; });
	
var ie7 = d3.select("#graph_ie7")
   .attr("width", width_ie7)
   .attr("height", height_ie7)
  .append("g")
    .attr("transform", "translate(" + margin_ie7.left + "," + margin_ie7.top + ")");

$(window).on("resize", function() {
    var targetWidth_ie7 = container_ie7.width();
	var targetHeight_ie7 = Math.round(targetWidth_ie7 / aspect_ie7) ;
	var targetMargin_ie7 = {top: (targetHeight_ie7*0.1) , right: (targetWidth_ie7*0.10) , bottom:0, left:(targetWidth_ie7*0.10)};
    chart_ie7.attr("width", targetWidth_ie7 - targetMargin_ie7.left - targetMargin_ie7.right);
    chart_ie7.attr("height", targetHeight_ie7 - targetMargin_ie7.top - targetMargin_ie7.bottom ); 
}).trigger("resize");

d3.csv("../resources/ie7.csv", function(error, data) {
  if (error) throw error;

  color_ie7.domain(d3.keys(data[0]).filter(function(key) { return key !== "Action"; }));

  data.forEach(function(d) {
    var y0 = 0;
    d.entries = color_ie7.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
    d.total = d.entries[d.entries.length - 1].y1;
  });

  x_ie7.domain(data.map(function(d) { return d.Action; }));
  y_ie7.domain([0, d3.max(data, function(d) { return d.total; })]);
  
//title
  ie7.append("text")
      .attr("x", 0)             
      .attr("y", 0 - (margin_ie7.top / 2))
      .attr("text-anchor", "left")  
      .style("font-size", "10px") 
      .text("IE7 - Taux de couverture des exigences par statut des fiches de tests");

// chart	
  var actions = ie7.selectAll(".action")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x_ie7(d.Action) + ",0)"; });
  actions.selectAll("rect")
      .data(function(d) { return d.entries; })
    .enter().append("rect")
      .attr("width", x_ie7.rangeBand())
      .attr("y", function(d) { return y_ie7(d.y1); })
      .attr("height", function(d) { return y_ie7(d.y0) - y_ie7(d.y1); }) // affiche la value 
      .style("fill", function(d) { return color_ie7(d.name); });


// legend
  var legend = ie7.selectAll(".legend")
      .data(color_ie7.domain().slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + ((height_ie7 / 2) + i * 15) + ")"; });

  legend.append("rect")
      .attr("x", width_ie7 + 10)
      .attr("width", 12)
      .attr("height", 12)
      .style("fill", color_ie7);

  legend.append("text")
      .attr("x", width_ie7 + 25)
      .attr("y", 9)
      .attr("dy", ".35em")
      //.style("text-anchor", "end")
	  .style("font-size", "9px")  
      .text(function(d) { return d; });

	var bar_size_ie7 = ( width_ie7 - (9*25) - 6 ) / 8 ;
	var axis_legend = 2;
	var space = 25;

// legend (acteurs)
	var actors_legend = ie7.append("g")
	  .attr("class", "legend");
	actors_legend.append("rect")
	  .attr("x", space + axis_legend) // 1 barre + axis legend
	  .attr("y", (height_ie7 + 20))
	  .attr("width", ((bar_size_ie7 * 2) + (2 * space) )) // 3 barres + 2 espaces - axis legend
	  //
	  .attr("height", 2)
	  .style("fill", "DarkOrange");
	actors_legend.append("text")
	  .attr("x", 180 )
	  .attr("y", (height_ie7 + 50))
	  .text("EDF");
	  
	actors_legend.append("rect")
	  .attr("x", ((bar_size_ie7 * 3) + (4 * space) + axis_legend)) // 3 barres + 4 espaces + axis legend
	  .attr("y", (height_ie7 + 20))
	  .attr("width", ((bar_size_ie7 * 3) + (2 * space) - axis_legend) ) // 3 barres + 2 espaces - axis legend
	  .attr("height", 2)
	  .style("fill", "DarkOrange");
	actors_legend.append("text")
	  .attr("x", 500)
	  .attr("y", (height_ie7 + 50))
	  .text("Intégrateur"); 
	  
actors_legend.append("rect")
	  .attr("x", ((bar_size_ie7 * 6) + (7 * space) + axis_legend )) // 6 barres + 7 espaces + axis legend
	  .attr("y", (height_ie7 + 20))
	  .attr("width", (bar_size_ie7 * 2 + 25 -6) ) // 2 barres + 1 espaces - axis legend
	  .attr("height", 2)
	  .style("fill", "DarkOrange");
actors_legend.append("text")
	  .attr("x", 800)
	  .attr("y", (height_ie7 + 50))
	  .text("TRA"); 



// Axes
  ie7.append("g")
      .attr("class", "x axis")
	  .style("font-size", "8px")
      .attr("transform", "translate(0," + height_ie7  + ")")
      .call(xAxis_ie7)
	  // legend vertical
	  /*
	.selectAll("text")
	  .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start");
	  */
	  
  ie7.append("g")
      .attr("class", "y axis")
	  .style("font-size", "8px")
      .call(yAxis_ie7)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 2)
      .attr("dy", ".71em")
	  .style("font-size", "8px")
      .style("text-anchor", "end")
      .text("Percent (%)");
});
