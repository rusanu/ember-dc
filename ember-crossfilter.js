EmberCrossfilter = Ember.Mixin.create({

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
  metrics: [
    {value:'lead_count', label: 'Leads'},
    {value:'spend', label: 'Spend'},
    {value:'sold_count', label: 'Sells'},
    {value:'contacted_count', label: 'Contacted'}
  ],

  /**
   * @property metrics
   * @type {Array}
   * Crossfilter Dimensions
   */
  dimensions: [
    date: null
  ],

  /**
   * @property metrics
   * @type {Array}
   * Crossfilter Groups
   */
  groups: [
    dateComposite: null
  ],

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
  _createDimensions: function() {

    var content = Ember.get(this, 'content');

      // Parse Dates
    content.forEach(function(d, i) {
      d.date = moment(d.created).toDate();
      delete d.created;
    });

    // Date Dimension
    this.set('dimension.date', ndx.dimension(function(d) { return d.date; }));
  },


  /**
   * @method _createGroups
   * Create the defined groups from the controller.
   * @return {void}
   * @private
   */
  _createGroups: function() {
    this.set('group.dateComposite', this.get('dimension.date').group(d3.time.day).reduce(
      function(p, v){
          return {
            lead_count: p.lead_count+1,
            spend: p.spend + v.price,
            sold_count: (v.status == 'sold') ? p.sold_count + 1 : p.sold_count,
            contacted_count: (v.status == 'contacted') ? p.contacted_count + 1 : p.contacted_count,
          }
      },
      function(p, v){
        return {
          lead_count: p.lead_count-1,
          spend: p.spend - v.price,
          sold_count: (v.status == 'sold') ? p.sold_count - 1 : p.sold_count,
          contacted_count: (v.status == 'contacted') ? p.contacted_count - 1 : p.contacted_count,
        }
      },
      function(){return {lead_count:0, spend:0, sold_count:0, contacted_count: 0};}
    ));
  }


});
