App.BaseChartComponent = Ember.Component.extend({
  classNames: ['chart'],
  chart: null,
  renderArea: false,
  brushOn: false,
  metrics: [],
  defaultMetric: null,
  height: 200,
  width: 100,
  transitionDuration: 100,
  renderTitle: false,
  renderVerticalGridLines: false,
  renderHorizontalGridLines: true,
  yAxisPadding: 2,
  xAxisPadding: 0,
  hidableStacks: true,

  renderChart: function() {
    this.chart.width(this.$().width()).render();
  },

  responsive: function() {
    var self = this;

    $(window).resize(function(){
      self.renderChart();
    });

  }
});
