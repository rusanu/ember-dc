App.CoordinateGridChart = App.BaseChartComponent.extend({
  classNames: ['coordinate-grid-chart'],
  didInsertElement: function() {
    var coordinateGridChart = dc.coordinateGridChart(this);
  }
});