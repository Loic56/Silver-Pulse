
var Graph_ic1 = React.createClass({
	 displayName: "Graph_ic1",

	render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement("svg", 
		  { id: "graph_ic1", className: "chart", viewBox:"0 0 400 200", perserveAspectRatio:"xMaxYMax" })
	    );
	  }
	});

ReactDOM.render(React.createElement(Graph_ic1, null), document.getElementById('container_ic1'));

var chart_ic1 = $("#graph_ic1"),	
    container_ic1 = $("#container_ic1"),
	aspect_ic1 = container_ic1.width() / container_ic1.height();

var w_ic1 = container_ic1.width();
var h_ic1 = w_ic1 / aspect_ic1 ;

var margin_ic1 = {top: (h_ic1*0.1) , right: (w_ic1*0.10) , bottom:0, left:(w_ic1*0.10)},
    width_ic1 = w_ic1 - margin_ic1.left - margin_ic1.right,
    height_ic1 = h_ic1 - margin_ic1.top - margin_ic1.bottom;

// espace entre les barres
var x_ic1 = d3.scale.ordinal()
    .rangeRoundBands([0, width_ic1], .25);

var y_ic1 = d3.scale.linear()
    .rangeRound([height_ic1, 0]);

var ic1 = d3.select("#graph_ic1")
    .attr("width", width_ic1)
    .attr("height", height_ic1)
  .append("g")
    .attr("transform", "translate(" + margin_ic1.left + "," + margin_ic1.top + ")");
	
$(window).on("resize", function() {
    var targetWidth_ic1 = container_ic1.width();
	var targetHeight_ic1 = Math.round(targetWidth_ic1 / aspect_ic1) ;
    var targetMargin_ic1 = {top: (targetHeight_ic1*0.1) , right: (targetWidth_ic1*0.10) , bottom:0, left:(targetWidth_ic1*0.10)};
	chart_ic1.attr("width", targetWidth_ic1 - targetMargin_ic1.left - targetMargin_ic1.right);
    chart_ic1.attr("height", targetHeight_ic1 - targetMargin_ic1.top - targetMargin_ic1.bottom); 
}).trigger("resize");




var color_ic1 = d3.scale.category20c();

var xAxis_ic1 = d3.svg.axis()
    .scale(x_ic1)
    .orient("bottom");

var yAxis_ic1 = d3.svg.axis()
    .scale(y_ic1)
    .orient("left")
    // .tickFormat(d3.format(".2s"))
	//format as percentage
	.tickFormat(function(d) { return d * 100 + "%"; });


d3.csv("../resources/ic1.csv", function(error, data) {
  if (error) throw error;

  color_ic1.domain(d3.keys(data[0]).filter(function(key) { return key !== "Week" && key !== "Somme"; }));

  data.forEach(function(d) {
    var y0 = 0;
    d.ages = color_ic1.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
    d.total = d.ages[d.ages.length - 1].y1;
  });

  // order by percentage
  // data.sort(function(a, b) { return b.total - a.total; });
  x_ic1.domain(data.map(function(d) { return d.Week; }));
  y_ic1.domain([0, d3.max(data, function(d) { return d.total; })]);
  
//title
  ic1.append("text")
        //.attr("x", (width_ic1 / 2))   
		.attr("x", 0) 		
        .attr("y", 0 - (margin_ic1.top / 2))
        .attr("text-anchor", "left")  
        .style("font-size", "10px")  
        .text("IC1 - Taux de couverture des exigences par statut des fiches de tests");

// chart	
  var weeks = ic1.selectAll(".week")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x_ic1(d.Week) + ",0)"; });

  weeks.selectAll("rect")
      .data(function(d) { return d.ages; })
    .enter().append("rect")
      .attr("width", x_ic1.rangeBand())
      .attr("y", function(d) { return y_ic1(d.y1); })
      .attr("height", function(d) { return y_ic1(d.y0) - y_ic1(d.y1); })
      .style("fill", function(d) { return color_ic1(d.name); });
	  

// legend
  var legend = ic1.selectAll(".legend")
      .data(color_ic1.domain().slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + ((height_ic1 /2) + i * 15) + ")"; });

  legend.append("rect")
      .attr("x", width_ic1 + 10)
      .attr("width", 12)
      .attr("height", 12)
      .style("fill", color_ic1);

  legend.append("text")
      .attr("x", width_ic1 + 25)
      .attr("y", 9)
      .attr("dy", ".10em")
	  .style("font-size", "9px")  
      .text(function(d) { return d; });


// Axes
  ic1.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height_ic1 + ")")
	  .style("font-size", "8px")  
      .call(xAxis_ic1);

  ic1.append("g")
      .attr("class", "y axis")
	  .style("font-size", "8px")  
      .call(yAxis_ic1)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
	  .style("font-size", "8px")  
      .style("text-anchor", "end")
      .text("Percent (%)");
});
