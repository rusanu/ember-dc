EmberDC = Ember.Mixin.create({

  /**
   * @property _crossfilter
   * @type {Object}
   * @private
   */
  _crossfilter = null,

  /**
   * @property metrics
   * @type {Array}
   * Computed Metrics
   */
  metrics: [],

  /**
   * @property metrics
   * @type {Array}
   * Crossfilter Dimensions
   */
  dimensions: [],

  /**
   * @property metrics
   * @type {Array}
   * Crossfilter Groups
   */
  groups: [],

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
  }

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
  _createGroups: function() {}


});
