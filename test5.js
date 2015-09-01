
var YearData = Backbone.Model.extend();

var ChartData = Backbone.Collection.extend({
	model: YearData,
	url: 'testdata.json'
});

var data = new ChartData();

data.fetch({
  success:function() {
    console.log(data.toJSON(),data.length);
	console.log(data.models);
  }
});


