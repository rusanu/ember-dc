App.NumberDisplayComponent = App.BaseChartComponent.extend({
  classNames: ['number-display'],

  createChart: function() {

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.numberDisplay('#'+this.$().context.id);

    this.chart.render();

    this.responsive();

  }.on('didInsertElement').observes('group')

});