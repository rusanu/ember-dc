App.NumberDisplay = App.BaseChartComponent.extend({
  classNames: ['number-display'],
  didInsertElement: function() {
    var numberDisplay = dc.numberDisplay(this);
  }
});