Ember.EmberDC.NumberDisplayComponent = Ember.Component.extend( Ember.EmberDC.BaseMixin, {
  classNames: ['number-display'],

  createChart: function() {

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.numberDisplay('#'+this.$().context.id);

    this.renderChart();

  }.on('didInsertElement').observes('group')

});