
var YearData = Backbone.Model.extend({
	initialize: function() {
		this.bind("sync", this.syncItem, this);	
	},
	url: "testdata.json",
	syncItem: function() {
		//console.log(this.get("data"));
	}
});

var ChartView = Backbone.View.extend({
	initialize: function() {
		this.model.bind("sync", this.render, this);
	},
	render: function() {
		var yearData = this.model.toJSON().data;
		var values = _.map(yearData, function(item) { return item.value; });
		console.log(values);
		
		var x = d3.scale.linear()
			.domain([0, d3.max(values)])
			.range([0, 420]);

		// clear element content
		this.$el.html("");
		
		d3.select(this.el)
		.selectAll("div")
			.data(values)
		.enter().append("div")
			.style("width", function(d) { return x(d) + "px"; })
			.text(function(d) { return d; });
		
		return this;
	}
});


/*
var ChartData = Backbone.Collection.extend({
	initialize: function() {
		this.bind("reset", this.resetCollection, this);	
	},
	model: YearData,
	url: "testdata.json",
	resetCollection: function() {
		console.log("Changed collection");
	}
});
*/

var yearData = new YearData();
var chartView = new ChartView({el: ".chart", model: yearData});
yearData.fetch();
