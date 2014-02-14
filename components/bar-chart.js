App.BarChartComponent = Ember.Component.extend({
  classNames: ['bar-chart'],
  data: null,
  didInsertElement: function() {
    var barChart = dc.barChart(this);

    // determine a histogram of percent changes
    var fluctuation = ndx.dimension(function (d) {
        return Math.round((d.close - d.open) / d.open * 100);
    });
    var fluctuationGroup = fluctuation.group();


    barChart.width(420)
        .height(180)
        .margins({top: 10, right: 50, bottom: 30, left: 40})
        .dimension(fluctuation)
        .group(fluctuationGroup)
        .elasticY(true)
        // (optional) whether bar should be center to its x value. Not needed for ordinal chart, :default=false
        .centerBar(true)
        // (optional) set gap between bars manually in px, :default=2
        .gap(1)
        // (optional) set filter brush rounding
        .round(dc.round.floor)
        .x(d3.scale.linear().domain([-25, 25]))
        .renderHorizontalGridLines(true)
        // customize the filter displayed in the control span
        .filterPrinter(function (filters) {
            var filter = filters[0], s = "";
            s += numberFormat(filter[0]) + "% -> " + numberFormat(filter[1]) + "%";
            return s;
        });

    // Customize axis
    barChart.xAxis().tickFormat(
        function (v) { return v + "%"; });
    barChart.yAxis().ticks(5);
  }
});

