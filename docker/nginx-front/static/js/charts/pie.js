
var Graph_pie = React.createClass({
	 displayName: "Graph_pie",

	render: function () {
	    return React.createElement("div",null,React.createElement("svg", { id: "graph_pie", className: "chart", viewBox:"0 0 400 200", perserveAspectRatio:"xMaxYMax" })
	    );
	  }
	});

ReactDOM.render(React.createElement(Graph_pie, null), document.getElementById('container_pie'));


var chart_pie = $("#graph_pie"),	
    container_pie = $("#container_pie"),
	aspect_pie = container_pie.width() / container_pie.height();

var w_pie = container_pie.width();

var h_pie = w_pie / aspect_pie ;
var radius_pie = Math.min(w_pie, h_pie) / 2;

var margin_pie = {top: (h_pie*0.1) , right:(w_pie*0.10) , bottom:0, left:(w_pie*0.10)},
    width_pie = w_pie - margin_pie.left - margin_pie.right,
    height_pie = h_pie - margin_pie.top - margin_pie.bottom;

var color_pie = d3.scale.category10();

var arc_pie = d3.svg.arc()
    .outerRadius(radius_pie - 10)
    .innerRadius(radius_pie - 70);

var pie_ = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.population; });

var svg_pie = d3.select("#graph_pie")
    .attr("width", width_pie - margin_pie.left - margin_pie.right)
    .attr("height", height_pie - margin_pie.top - margin_pie.bottom)
  .append("g")
    .attr("transform", "translate(" + width_pie / 2 + "," + height_pie / 2 + ")");

$(window).on("resize", function() {
    var targetWidth_pie = container_pie.width();
	var targetHeight_pie = Math.round(targetWidth_pie / aspect_pie);
    chart_pie.attr("width", targetWidth_pie - margin_pie.left - margin_pie.right);
    chart_pie.attr("height", targetHeight_pie - margin_pie.top - margin_pie.bottom ); 
}).trigger("resize");

d3.csv("../resources/pie.csv", type, function(error, data) {
  if (error) throw error;

  //title
  svg_pie.append("text")
        .attr("x", -(width_pie / 2))          //    
        .attr("y", -(height_pie / 2) )
        .attr("text-anchor", "left")  
        .style("font-size", "10px") 
        .text("Pie Chart");
		
  var g = svg_pie.selectAll(".arc")
      .data(pie_(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc_pie)
      .style("fill", function(d) { return color_pie(d.data.age); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc_pie.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.age; });
});

function type(d) {
  d.population = +d.population;
  return d;
}
