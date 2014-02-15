App.GeoChoroplethChart = App.BaseChartComponent.extend({
  classNames: ['geo-choropleth-chart'],
  didInsertElement: function() {
    var geoChoroplethChart = dc.geoChoroplethChart(this);
  }
});