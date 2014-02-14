App.PieChartComponent = Ember.Component.extend({
  classNames: ['pie-chart'],
  didInsertElement: function() {
    var pieChart = dc.pieChart(this);
  }
});