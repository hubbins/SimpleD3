function BarChart(data) {
    var bars;  // d3 selection of all rectangle bar elements
    
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

		var x = d3.scale.ordinal()
			.rangeRoundBands([0, width], .1);
		
		var y = d3.scale.linear()
			.range([height, 0]);
		
		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");
		
		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.ticks(10, "%");    

    function Chart(selection) {
        bars = selection.selectAll(".bar")
          .data(function(d) {return d;})
          .call(enterBars);
    
    	x.domain(data.map(function(d) { return d.letter; }));
        y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
      
        //var svg = d3.select("body").append("svg")
        var svg = this.g;
        
        svg.attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Frequency");
    }

    Chart.update = function() {
      bars.data(function(d) {return d;})
        .call(exitBars)
        .call(updateBars)
        .call(enterBars);
    }
  
    function enterBars(selection) {
      selection.enter().append("rect")
        .attr("class", "bar")
        .attr("width", x.rangeBand());
  
      updateBars(selection);
    }
  
    function updateBars(selection) {
      selection.attr("x", function(d) { return x(d.letter); })
        .attr("y", function(d) { return y(d.frequency); })
        .attr("height", function(d) { return height - y(d.frequency); });
    }
  
    function exitBars(selection) {
      selection.exit().remove();
    }
  
    return Chart;
}