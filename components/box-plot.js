App.BoxPlotComponent = App.BaseChartComponent.extend({
  classNames: ['box-plot'],

  createChart: function() {

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.boxPlot('#'+this.$().context.id);

    this.chart.render();

    this.responsive();

  }.on('didInsertElement').observes('group')

});