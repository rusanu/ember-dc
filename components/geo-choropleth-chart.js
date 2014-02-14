App.GeoChoroplethChartComponent = Ember.Component.extend({
  classNames: ['geo-choropleth-chart'],
  didInsertElement: function() {
    var geoChoroplethChart = dc.geoChoroplethChart(this);
  }
});