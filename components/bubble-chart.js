App.BubbleChart = App.BaseChartComponent.extend({
  classNames: ['bubble-chart'],
  didInsertElement: function() {
    var bubbleChart = dc.bubbleChart(this);
  }
});