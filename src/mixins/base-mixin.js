EmberDC.BaseMixin = Ember.Mixin.create({
  classNames: ['chart'],

  chartOptions: [
    'group',
    'dimension',
    'width',
    'height',
    'margin',
    'renderTitle',
    'elasticY',
    'elasticX',
    'transitionDuration'
  ],

  /**
   * @property chart
   * @type {Object}
   * Chart Object
   */
  chart: null,

  /**
   * @property height
   * @property width
   * @property minWidth
   * @property minHeight
   * @type {Number}
   * Chart Dimensions
   */
  height: 200,
  width: 200,
  minHeight: null,
  minWidth: null,

  /**
   * @property responsive
   * @type {Boolean}
   * Make Chart Responsive
   */
  responsive: true,

  /**
   * @property height
   * @type {Number}
   * Chart Height
   */
  renderArea: false,

  /**
   * @property height
   * @type {Number}
   * Chart Height
   */
  metrics: [],

  group: null,


  dimension: null,

  /**
   * @property height
   * @type {Number}
   * Chart Height
   */
  transitionDuration: 100,
  renderTitle: false,
  renderVerticalGridLines: false,
  renderHorizontalGridLines: true,
  yAxisPadding: 2,
  xAxisPadding: 0,
  hidableStacks: true,
  elasticY: true,
  elasticX: true,

  /**
   * @method renderChart
   * Method render the chart and make responsive
   */
  renderChart: function() {
    var self = this;

    this.width = this.$().width();

    // Apply the charts options
    this.options();

    // Render the chart
    this.chart.render();

    // Make responsive if property is set
    if(this.responsive == true) {
      $(window).resize(function(){
        console.log('test');
        self.chart.width(this.$().width()).render();
      });
    }
  },

  /**
   * @method redraw
   * Method to redraw the chart if the underlying data changes
   */
  redraw: function() {

    // Redraw the chart
    //this.chart.redraw();

  }.observes('group'),

  /**
   * @method options
   * Method apply the charts options
   */
  options: function() {
    this.chart.options(this.getProperties(
      'group',
      'dimension',
      'width',
      'height',
      'margin',
      'renderTitle',
      'elasticY',
      'elasticX',
      'transitionDuration'
    ));
  },

  /**
   * @method hasFilter
   * Check whether is any active filter or a specific filter is associated
   * with particular chart instance. This function is not chainable.
   */
  hasFilter: function(filter) {
    return this.chart.hasFilter(filter);
  },

  /**
   * @method filters
   * Return all current filters. This method does not perform defensive cloning
   * of the internal filter array before returning therefore any modification of
   * returned array will affact chart's internal filter storage.
   */
  filters: function() {
    return this.chart.filters();
  },

  /**
   * @method filter
   * Filter the chart by the given value or return the current filter if
   * the input parameter is missing.
   */
  filter: function(filterValue) {
    return this.chart.filter(filterValue);
  },

  /**
   * @method onClick
   * This function is passed to d3 as the onClick handler for each chart. By
   * default it will filter the on the clicked datum (as passed back to the
   * callback) and redraw the chart group.
   */
  onClick: function(datum) {
    this.chart.onClick(datum);
  },

  /**
   * @method title
   * Set or get the title function. Chart class will use this function to
   * render svg title(usually interpreted by browser as tooltips) for each
   * child element in the chart, i.e. a slice in a pie chart or a bubble in
   * a bubble chart. Almost every chart supports title function however in
   * grid coordinate chart you need to turn off brush in order to use title
   * otherwise the brush layer will block tooltip trigger.
   */
  title: function(titleFunction) {
    this.chart.title(titleFunction);
  },

  /**
   * @method label
   * Set or get the label function. Chart class will use this function to
   * render label for each child element in the chart, i.e. a slice in a pie
   * chart or a bubble in a bubble chart. Not every chart supports label
   * function for example bar chart and line chart do not use this function
   * at all.
   */
  label: function(labelFunction) {
    this.chart.label(labelFunction);
  }



});
