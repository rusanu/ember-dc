App.IndexController = Ember.ArrayController.create(EmberDC, {

  /**
   * @property metrics
   * @type {Array}
   * Computed Metrics
   */
  metrics: [
    {value:'lead_count',      label: 'Leads'},
    {value:'spend',           label: 'Spend'},
    {value:'sold_count',      label: 'Sells'},
    {value:'contacted_count', label: 'Contacted'}
  ],

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
