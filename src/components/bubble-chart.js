EmberDC.BubbleChartComponent = Ember.Component.extend( EmberDC.BubbleMixin, EmberDC.CoordinateGridMixin, {

  classNames: ['bubble-chart'],

  createChart: function() {

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.bubblePlot('#'+this.$().context.id);

    this.renderChart();

  }.on('didInsertElement').observes('group')

});