App.BubbleChartComponent = App.BaseChartComponent.extend({
  classNames: ['bubble-chart'],

  createChart: function() {

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.bubblePlot('#'+this.$().context.id);

    this.chart.render();

    this.responsive();

  }.on('didInsertElement').observes('group')

});