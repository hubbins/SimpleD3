
var YearData = Backbone.Model.extend({
	url: "testdata.json",
});

var ChartView = Backbone.View.extend({
	initialize: function() {
		this.model.bind("sync", this.render, this);
	},
	render: function() {
		var yearData = this.model.toJSON().data;
		var values = _.map(yearData, function(item) { return item.value; });
		console.log(values);
		
		var width = 420,
			barHeight = 20;
		
		var x = d3.scale.linear()
			.domain([0, d3.max(values)])
			.range([0, width]);
		
		var chart = d3.select(this.el)
			.attr("width", width)
			.attr("height", barHeight * values.length);
		
		var bars = chart.selectAll("g")
			.data(values)
			.enter().append("g")
			.attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
		
		bars.append("rect")
			.attr("width", x)
			.attr("height", barHeight - 1);
		
		bars.append("text")
			.attr("x", function(d) { return x(d) - 3; })
			.attr("y", barHeight / 2)
			.attr("dy", ".35em")
			.text(function(d) { return d; });
		
		return this;
	}
});

var yearData = new YearData();
var chartView = new ChartView({el: ".chart", model: yearData});
yearData.fetch();
