App.ScatterPlot = App.BaseChartComponent.extend({
  classNames: ['scatter-plot'],

  createChart: function() {

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.scatterPlot('#'+this.$().context.id);


    this.chart.render();

    this.responsive();

  }.on('didInsertElement').observes('group')

});