App.HeatMapComponent = Ember.Component.extend( App.ColorMixin, App.MarginMixin, App.BaseMixin, {
  classNames: ['heat-map'],

  createChart: function() {

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.heatMap('#'+this.$().context.id);

    this.renderChart();

  }.on('didInsertElement').observes('group')

});