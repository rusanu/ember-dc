EmberDC.BubbleOverlayChartComponent = Ember.Component.extend( EmberDC.BubbleMixin, EmberDC.BaseMixin, {

  classNames: ['bubble-overlay-chart'],

  createChart: function() {

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.bubblePlot('#'+this.$().context.id);

    this.renderChart();

  }.on('didInsertElement').observes('group')

});