EmberDC = Ember.Mixin.create({

  /**
   * @property _crossfilter
   * @type {Object}
   * @private
   */
  _crossfilter: null,

  /**
   * @property metrics
   * @type {Array}
   * Computed Metrics
   */
  metrics: [],

  /**
   * @property dimensions
   * @type {Array}
   * Crossfilter Dimensions
   */
  dimensions: [],

  /**
   * @property groups
   * @type {Array}
   * Crossfilter Groups
   */
  groups: [],

  /**
   * @property chartGroup
   * @type {String}
   * Chart groups share common rendering events since it is
   * expected they share the same underlying crossfilter data set.
   */
  chartGroup: 'group-name',

  /**
   * @method init
   * Invoked when the controller is instantiated.
   * @constructor
   */
  init: function init() {

      this._super();

      // Add the observer to create the Crossfilter when we have some content.
      Ember.addObserver(this, 'content.length', this, '_createCrossfilter');

      // Create the Crossfilter.
      this._createCrossfilter();

  },

  /**
   * @method _createCrossfilter
   * Creates the Crossfilter from the content.
   * @return {Boolean}
   * @private
   */
  _createCrossfilter: function() {

    // Create the Crossfilter, and then create the dimensions.
    var content = Ember.get(this, 'content');

    // Checks whether we have a defined controller, and/or no content.
    var hasDefinedCrossfilter   = !!this._crossfilter,
        hasNoContent            = !content.length;

    // If we don't want have any content yet, or a defined Crossfilter, then either
    // the content hasn't been loaded yet, or we've already created the Crossfilter.
    if (hasNoContent || hasDefinedCrossfilter) {
        return false;
    }

    // Remove the observer because we don't want to keep triggering this method when
    // the content updates.
    Ember.removeObserver(this, 'content.length', this, '_createCrossfilter');

    // Create the Crossfilter and its related dimensions.
     this._crossfilter = window.crossfilter(content);
     this._createDimensions();
     this._createGroups();
  },

  /**
   * @method _createDimensions
   * Create the defined dimensions from the controller.
   * @return {void}
   * @private
   */
  _createDimensions: function() {},


  /**
   * @method _createGroups
   * Create the defined groups from the controller.
   * @return {void}
   * @private
   */
  _createGroups: function() {},

  actions: {

    /**
     * @method filterAll
     * Clear all filters on every chart within the given chart group.
     * If the chart group is not given then only charts that belong
     * to the default chart group will be reset.
     * @return {void}
     */
    filterAll: function() {
      dc.filterAll(this.chartGroup);
    },

    /**
     * @method refocusAll
     * Reset zoom level / focus on all charts that belong to the given
     * chart group. If the chart group is not given then only charts
     * that belong to the default chart group will be reset.
     * @return {void}
     */
    refocusAll: function() {
      dc.refocusAll(this.chartGroup);
    },

    /**
     * @method renderAll
     * Re-render all charts belong to the given chart group. If the chart
     * group is not given then only charts that belong to the default
     * chart group will be re-rendered.
     * @return {void}
     */
    renderAll: function() {
      dc.renderAll(this.chartGroup);
    },

    /**
     * @method redrawAll
     * Redraw all charts belong to the given chart group. If the chart group
     * is not given then only charts that belong to the default chart group
     * will be re-drawn. Redraw is different from re-render since when
     * redrawing dc charts try to update the graphic incrementally instead
     * of starting from scratch.
     * @return {void}
     */
    redrawAll: function() {
      dc.redrawAll(this.chartGroup);
    }

  }

});
