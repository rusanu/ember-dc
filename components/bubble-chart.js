Ember.EmberDC.BubbleChartComponent = Ember.Component.extend( Ember.EmberDC.BubbleMixin, Ember.EmberDC.CoordinateGridMixin, {

  classNames: ['bubble-chart'],

  createChart: function() {

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.bubblePlot('#'+this.$().context.id);

    this.renderChart();

  }.on('didInsertElement').observes('group')

});