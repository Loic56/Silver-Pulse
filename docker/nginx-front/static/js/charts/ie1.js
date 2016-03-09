
var Graph_ie1 = React.createClass({
	 displayName: "Graph_ie1",

	render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement("svg", { id: "graph_ie1", className: "chart" })
	    );
	  }
	});

ReactDOM.render(React.createElement(Graph_ie1, null), document.getElementById('container_ie1'));

var margin_ie1 = {top: 20, right: 80, bottom: 30, left: 50},
    width_ie1 = 1000 - margin_ie1.left - margin_ie1.right,
    height_ie1 = 500 - margin_ie1.top - margin_ie1.bottom;

var parseDate = d3.time.format("%Y%m%d").parse;

var x_ie1 = d3.time.scale()
    .range([0, width_ie1]);

var y_ie1 = d3.scale.linear()
    .range([height_ie1, 0]);

var color_ie1 = d3.scale.category10();

var xAxis_ie1 = d3.svg.axis()
    .scale(x_ie1)
    .orient("bottom");

var yAxis_ie1 = d3.svg.axis()
    .scale(y_ie1)
    .orient("left");
	
/*
•linear - piecewise linear segments, as in a polyline.
•linear-closed - close the linear segments to form a polygon.
•step - alternate between horizontal and vertical segments, as in a step function.
•step-before - alternate between vertical and horizontal segments, as in a step function.
•step-after - alternate between horizontal and vertical segments, as in a step function.
•basis - a B-spline, with control point duplication on the ends.
•basis-open - an open B-spline; may not intersect the start or end.
•basis-closed - a closed B-spline, as in a loop.
•bundle - equivalent to basis, except the tension parameter is used to straighten the spline.
•cardinal - a Cardinal spline, with control point duplication on the ends.
•cardinal-open - an open Cardinal spline; may not intersect the start or end, but will intersect other control points.
•cardinal-closed - a closed Cardinal spline, as in a loop.
•monotone - cubic interpolation that preserves monotonicity in y.
*/

var line_ie1 = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x_ie1(d.date); })
    .y(function(d) { return y_ie1(d.pourcentage); });

var ie1 = d3.select("#graph_ie1")
    .attr("width", width_ie1 + margin_ie1.left + margin_ie1.right)
    .attr("height", height_ie1 + margin_ie1.top + margin_ie1.bottom)
  .append("g")
    .attr("transform", "translate(" + margin_ie1.left + "," + margin_ie1.top + ")");

d3.tsv("../resources/ie1.tsv", function(error, data) {
  if (error) throw error;

  color_ie1.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

  data.forEach(function(d) {
    d.date = parseDate(d.date);
  });

  var etat_du_test = color_ie1.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, pourcentage: +d[name]};
      })
    };
  });

  x_ie1.domain(d3.extent(data, function(d) { return d.date; }));

  y_ie1.domain([
    d3.min(etat_du_test, function(c) { return d3.min(c.values, function(v) { return v.pourcentage; }); }),
    d3.max(etat_du_test, function(c) { return d3.max(c.values, function(v) { return v.pourcentage; }); })
  ]);

  //title
  ie1.append("text")
      .attr("x", (width_ie7 / 2))             
      .attr("y", 0 - (margin_ie7.top / 2))
      .attr("text-anchor", "middle")  
      .style("font-size", "30px") 
      .text("IE1 - Avancement de l'exécution des instances de test");
	  
  var city = ie1.selectAll(".city")
      .data(etat_du_test)
    .enter().append("g")
      .attr("class", "city");
	  
// draw courbe
  city.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line_ie1(d.values); })
      .style("stroke", function(d) { return color_ie1(d.name); });
	  
// legend suite a la courbe  
 city.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x_ie1(d.value.date) + "," + y_ie1(d.value.pourcentage) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });

// draw axe x	  
  ie1.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height_ie1 + ")")
      .call(xAxis_ie1);
// draw axe y
  ie1.append("g")
      .attr("class", "y axis")
      .call(yAxis_ie1)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("pourcentage (ºF)");
});
