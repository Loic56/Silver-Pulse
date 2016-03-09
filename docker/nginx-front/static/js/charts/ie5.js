
var Graph_ie5 = React.createClass({
	 displayName: "Graph_ie5",

	render: function () {
	    return React.createElement(
	      "div",
	      null,
		  //, overflow:"visible"
	      React.createElement("svg", { id: "graph_ie5", className: "chart", viewBox:"0 0 400 200", perserveAspectRatio:"xMaxYMax" })
	    );
	  }
	});

ReactDOM.render(React.createElement(Graph_ie5, null), document.getElementById('container_ie5'));

var chart_ie5 = $("#graph_ie5"),	
    container_ie5 = $("#container_ie5"),
	aspect_ie5 = container_ie5.width() / container_ie5.height();

var w_ie5 = container_ie5.width();
var h_ie5 = w_ie5 / aspect_ie5 ;

var margin_ie5 = {top: (h_ie5*0.1), right:(w_ie5*0.10), bottom:0, left:(w_ie5*0.10)},
    width_ie5 = w_ie5 - margin_ie5.left - margin_ie5.right,
    height_ie5 = h_ie5 - margin_ie5.top - margin_ie5.bottom;

$(window).on("resize", function() {
    var targetWidth_ie5 = container_ie5.width();
	var targetHeight_ie5 = Math.round(targetWidth_ie5 / aspect_ie5) ;
	 var targetMargin_ie5 = {top: (targetHeight_ie5*0.1) , right: (targetWidth_ie5*0.10) , bottom:0, left:(targetWidth_ie5*0.10)};
    chart_ie5.attr("width", targetWidth_ie5 - targetMargin_ie5.left - targetMargin_ie5.right);
    chart_ie5.attr("height", targetHeight_ie5 - targetMargin_ie5.top - targetMargin_ie5.bottom); 
}).trigger("resize");


var parseDate = d3.time.format("%Y%m%d").parse;

var x_ie5 = d3.time.scale()
    .range([0, width_ie5]);

var y_ie5 = d3.scale.linear()
    .range([height_ie5, 0]);

var color_ie5 = d3.scale.category10();

/*
var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
*/

var xAxis_ie5 = d3.svg.axis()
    .scale(x_ie5)
	// "Feb 06"
	.tickFormat(d3.time.format("%b %d"))
    .orient("bottom");

var yAxis_ie5 = d3.svg.axis()
    .scale(y_ie5)
    .orient("left");

var line_ie5 = d3.svg.line()
    //.interpolate("basis")
    .x(function(d) { return x_ie5(d.date); })
    .y(function(d) { return y_ie5(d.pourcentage); });

var ie5 = d3.select("#graph_ie5")
    .attr("width", width_ie5 )
    .attr("height", height_ie5)
  .append("g")
    .attr("transform", "translate(" + margin_ie5.left + "," + margin_ie5.top + ")");

d3.tsv("../resources/ie5.tsv", function(error, data) {
  if (error) throw error;

  color_ie5.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

  data.forEach(function(d) {
    d.date = parseDate(d.date);
  });

  var etat_du_test = color_ie5.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, pourcentage: +d[name]};
      })
    };
  });

  x_ie5.domain(d3.extent(data, function(d) { return d.date; }));

  y_ie5.domain([
    d3.min(etat_du_test, function(c) { return d3.min(c.values, function(v) { return v.pourcentage; }); }),
    d3.max(etat_du_test, function(c) { return d3.max(c.values, function(v) { return v.pourcentage; }); })
  ]);

  
  //title
  ie5.append("text")
        .attr("x", 0)             
        .attr("y", 0 - (margin_ie5.top / 2))
        .attr("text-anchor", "left")  
        .style("font-size", "10px")  
        .text("IE5 - Evolution des créations, livraisons, fermetures d'anomalies");

  // draw courbe	
  var entries = ie5.selectAll(".entries")
      .data(etat_du_test)
    .enter().append("g")
      .attr("class", "city");
	 
  entries.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line_ie5(d.values); })
      .style("stroke", function(d) { return color_ie5(d.name); });

// legend
  var legend = ie5.selectAll(".legend")
      .data(color_ie5.domain().slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + ((height_ie5/2) + i * 15) + ")"; });

  legend.append("rect")
      .attr("x", width_ie5 + 10)
      .attr("width", 10)
      .attr("height", 1)
      .style("fill", color_ie5);

  legend.append("text")
      .attr("x", width_ie5 + 25 )
      .attr("y", 1)
      .attr("dy", ".35em")
	  .style("font-size", "9px")  
      //.style("text-anchor", "end")
      .text(function(d) { return d; });


// draw axe x	  
  ie5.append("g")
      .attr("class", "x axis")
	  .style("font-size", "8px")
      .attr("transform", "translate(0," + height_ie5 + ")")
      .call(xAxis_ie5)
	.selectAll("text")
	  .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start");
	  
// draw axe y
  ie5.append("g")
      .attr("class", "y axis")
	  .style("font-size", "8px")
      .call(yAxis_ie5)
    .append("text")
      .attr("transform", "rotate(-90)")
	  .style("font-size", "8px")  
      .attr("y", 2)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("pourcentage (%)");
});
