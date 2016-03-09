
var Graph_ie10 = React.createClass({
	 displayName: "Graph_ie10",

	render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement("svg", { id: "graph_ie10", className: "chart" })
	    );
	  }
	});

ReactDOM.render(React.createElement(Graph_ie10, null), document.getElementById('container_ie10'));

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 1200 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatDate = d3.time.format("%d-%b-%y");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

var ie10 = d3.select("#graph_ie10")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("../resources/ie10.tsv", type, function(error, data) {
  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.close; }));
  
// axe x
  ie10.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

// axe y
  ie10.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");

  ie10.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
});

function type(d) {
  d.date = formatDate.parse(d.date);
  d.close = +d.close;
  return d;
}
