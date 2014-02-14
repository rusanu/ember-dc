App.LineChartComponent = Ember.Component.extend({
  classNames: ['line-chart'],
  chart: null,
  renderArea: false,
  brushOn: false,
  metrics: [],
  defaultMetric: null,
  height: 200,
  startDate: moment().subtract('days', 29),
  endDate: moment(),

  renderChart: function(){
    this.chart.width(this.$().width()).render();
  },

  didInsertElement: function() {
    var self = this;

    var data = this.get('data');

    data.forEach(function(d, i) {
      d.date = moment(d.date, ["MM/DD/YYYY"]).toDate();
    });

    self.chart = dc.lineChart('#'+self.$().context.id);

    var ndx = crossfilter(data),
        all = ndx.groupAll();
        date = ndx.dimension(function(d) { return d.date; }),
        dates = date.group(d3.time.day),
        dimension = {},
        group = {};

    this.get('metrics').forEach(function(metric, i) {
      dimension[metric] = ndx.dimension(function(d) { return d[metric]; });
      group[metric] = dimension[metric].group();
      group[metric + "ByDate"] = date.group().reduceSum(function (d) {
        return d[metric];
      });
    });

    var numberFormat = d3.format(",f");

    var tip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function (d) { return "<span style='color: #f0027f'>" +  d.key + "</span> : "  + numberFormat(d.value); });

    self.chart
      .width(this.$().width())
      .height(this.height)
      .margins({top: 30, right: 5, bottom: 25, left: 5})
      .x(d3.time.scale().domain([this.startDate.toDate(), this.endDate.toDate()]))
      .xUnits(d3.time.days)
      .renderArea(this.renderArea)
      .elasticY(true)
      .brushOn(this.brushOn)
      .renderHorizontalGridLines(true)
      .renderDataPoints({radius: 4})
      .dimension(date)
      .group(group[this.defaultMetric + 'ByDate'])
      .yAxisPadding(100)
      .renderTitle(true)
      .title(function (p) {
          return [p.key,
                 "Spend: " + p.spend]
                 .join("\n");
      })
      .yAxis().ticks(5).tickFormat(d3.format("d"));

    self.chart.render();

    // d3.selectAll(".dot").call(tip);
    // d3.selectAll(".dot").on('mouseover', tip.show)
    //     .on('mouseout', tip.hide);

    $(window).resize(function(){
      self.renderChart();
    });

  }
});
