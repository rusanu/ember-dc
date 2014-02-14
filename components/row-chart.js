App.RowChartComponent = Ember.Component.extend({
  classNames: ['row-chart'],
  data: null,
  didInsertElement: function() {
    var rowChart = dc.rowChart(this);

    rowChart.width(180)
        .height(180)
        .margins({top: 20, left: 10, right: 10, bottom: 20})
        .group(dayOfWeekGroup)
        .dimension(dayOfWeek)
        .label(function (d) {
            return d.key.split(".")[1];
        })
        // title sets the row text
        .title(function (d) {
            return d.value;
        })
        .elasticX(true)
        .xAxis().ticks(4);
  }
});