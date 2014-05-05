Ember.EmberDC.HeatMapComponent = Ember.Component.extend( Ember.EmberDC.ColorMixin, Ember.EmberDC.MarginMixin, Ember.EmberDC.BaseMixin, {
  classNames: ['heat-map'],

  createChart: function() {

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.heatMap('#'+this.$().context.id);

    this.renderChart();

  }.on('didInsertElement').observes('group')

});