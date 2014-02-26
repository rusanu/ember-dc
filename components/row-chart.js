App.RowChartComponent = Ember.Component.extend( App.CapMixin, App.MarginMixin, App.ColorMixin, App.BaseMixin, {
  classNames: ['row-chart'],

  label: function (d) {
    return d.key.split(".")[1];
  },

  createChart: function() {

    if(this.get('group') == null){
      return false;
    }

    this.chart = dc.rowChart('#'+this.$().context.id);

    this.title(function (d) {
      return d.value;
    });

    // this.label(function (d) {
    //   return d.key.split(".")[1];
    // });

    this.chart.xAxis().ticks(4);

    this.renderChart();

  }.on('didInsertElement').observes('group')

});