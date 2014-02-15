App.RowChart = App.BaseChartComponent.extend({
  classNames: ['row-chart'],

  createChart: function() {

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.rowChart('#'+this.$().context.id);

    this.chart.width(180)
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

    this.chart.render();

    this.responsive();

  }.on('didInsertElement').observes('group')

});