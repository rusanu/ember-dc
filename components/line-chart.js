App.LineChartComponent = App.BaseChartComponent.extend({
  classNames: ['line-chart'],

  startDate: moment().subtract('days', 29),
  endDate: moment(),

  createChart: function() {
    var self = this;

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.compositeChart('#'+this.$().context.id);

    var charts = [];

    this.get('metrics').forEach(function(metric, i) {
      charts.push(
        dc.lineChart(self.chart)
        .group(self.get('group'), metric.label)
        .valueAccessor(function (d) {
          return d.value[metric.value];
        })
        .dotRadius(10)
        .renderArea(true)
        .renderDataPoints({radius: 2})
        .brushOn(self.brushOn)
      )

    });

    this.chart
      .width(this.$().width())
      .height(this.height)
      .margins({top: 30, right: 5, bottom: 55, left: 30})
      .x(d3.time.scale().domain([this.startDate.toDate(), this.endDate.toDate()]))
      .xUnits(d3.time.days)
      //.renderArea(this.renderArea)
      .elasticY(true)
      .brushOn(this.brushOn)
      .renderHorizontalGridLines(true)
      //.renderDataPoints({radius: 4})
      .dimension(this.get('dimension'))
      .group(this.get('group'))
      .ordinalColors(["#56B2EA","#E064CD","#F8B700","#78CC00","#7B71C5"])
      .shareColors(true)
      .compose(charts)
      .legend(dc.legend().horizontal(1).itemWidth(70).x(10).y(this.height-20).gap(5))
      .yAxisPadding(this.yAxisPadding)
      .renderTitle(true)
      .title(function (p) {
          return [p.key,
                 "Spend: " + p.spend]
                 .join("\n");
      })
      .yAxis().ticks(5).tickFormat(d3.format("d"));

    this.chart.render();

    this.responsive();

  }.on('didInsertElement').observes('group')

});
