
var Graph_ie18 = React.createClass({
	 displayName: "Graph_ie18",

	render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement("svg", { id: "graph_ie18", className: "chart", viewBox:"0 0 400 200", perserveAspectRatio:"xMaxYMax" })
	    );
	  }
	});

ReactDOM.render(React.createElement(Graph_ie18, null), document.getElementById('container_ie18'));

var chart_ie18 = $("#graph_ie18"),	
    container_ie18 = $("#container_ie18"),
	aspect_ie18 = container_ie18.width() / container_ie18.height();

var w_ie18 = container_ie18.width();
var h_ie18 = w_ie18 / aspect_ie18 ;

var margin_ie18 = {top: (h_ie18*0.1) , right: (w_ie18*0.10) , bottom:0, left:(w_ie18*0.10)},
    width_ie18 = w_ie18 - margin_ie18.left - margin_ie18.right,
    height_ie18 = h_ie18 - margin_ie18.top - margin_ie18.bottom;


var x_ie18 = d3.scale.ordinal()
    .rangeRoundBands([0, width_ie18], .25);

var y_ie18 = d3.scale.linear()
    .range([height_ie18, 0]);

var xAxis_ie18 = d3.svg.axis()
    .scale(x_ie18)
    .orient("bottom");

var yAxis_ie18 = d3.svg.axis()
    .scale(y_ie18)
    .orient("left")
    //.ticks(1, "%");
	.tickFormat(function(d) { return d + "%"; });

var ie18 = d3.select("#graph_ie18")
    .attr("width", width_ie18 )
    .attr("height", height_ie18 )
  .append("g")
    .attr("transform", "translate(" + margin_ie18.left + "," + margin_ie18.top + ")");

$(window).on("resize", function() {
    var targetWidth_ie18 = container_ie18.width();
	var targetHeight_ie18 = Math.round(targetWidth_ie18 / aspect_ie18) ;
    var targetMargin_ie18 = {top: (targetHeight_ie18*0.1) , right: (targetWidth_ie18*0.10) , bottom:0, left:(targetWidth_ie18*0.10)};
	chart_ie18.attr("width", targetWidth_ie18 - targetMargin_ie18.left - targetMargin_ie18.right);
    chart_ie18.attr("height", targetHeight_ie18 - targetMargin_ie18.top - targetMargin_ie18.bottom); 
}).trigger("resize");


d3.tsv("../resources/ie18.tsv", type, function(error, data) {
  if (error) throw error;

  x_ie18.domain(data.map(function(d) { return d.Version; }));
  y_ie18.domain([0, d3.max(data, function(d) { return d.Pourcentage_de_rejeux_par_version; })]);

// title
  ie18.append("text")
        .attr("x", 0 )             
        .attr("y", 0 - (margin_ie18.top / 2))
        .attr("text-anchor", "left")  
        .style("font-size", "10px") 
        .text("IE18 - Suivi du rejeu par version");
		
// chart
  ie18.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x_ie18(d.Version); })
      .attr("width", x_ie18.rangeBand())
      .attr("y", function(d) { return y_ie18(d.Pourcentage_de_rejeux_par_version); })
      .attr("height", function(d) { return height_ie18 - y_ie18(d.Pourcentage_de_rejeux_par_version); });
	  
// legend
 	var legend = ie18.append("g")
	  .attr("class", "legend")

	legend.append("rect")
	  .attr("x", width_ie18 + 10)
	  .attr("width", 12)
	  .attr("height", 12)
	  .style("fill", "SteelBlue")
	  
	legend.append("text")
	  .attr("x", width_ie18 + 25 )
	  .attr("y", 9)
	  .attr("dy", ".10em")
	  .style("font-size", "9px")  
	  .text("% de rejeu par version");
	  
// axes
  ie18.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height_ie18 + ")")
	  .style("font-size", "8px")  
      .call(xAxis_ie18);

  ie18.append("g")
      .attr("class", "y axis")
	  .style("font-size", "8px")  
      .call(yAxis_ie18)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 2)
      .attr("dy", ".71em")
	  .style("font-size", "8px")  
      .style("text-anchor", "end")
      .text("Pourcentage de rejeux par version");
});

function type(d) {
  d.Pourcentage_de_rejeux_par_version = +d.Pourcentage_de_rejeux_par_version;
  return d;
}
