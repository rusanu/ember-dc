App.ExampleController = Ember.ArrayController.extend({

  // Computed Metrics
  metrics: [
    {value:'lead_count', label: 'Leads'},
    {value:'spend', label: 'Spend'},
    {value:'sold_count', label: 'Sells'},
    {value:'contacted_count', label: 'Contacted'}
  ],

  // Crossfilter Dimesions
  dimensions: [
    date: null
  ],

  // Crossfilter Groups
  groups: [
    dateComposite: null
  ],

  // Compile Dimesions / Groups
  compileMetrics: function() {

    if(this.get('content.isLoaded')){

      var data = this.get('content')._data;

      // Parse Dates
      data.forEach(function(d, i) {
        d.date = moment(d.created).toDate();
        delete d.created;
      });

      // Setup Crossfilter
      var ndx = crossfilter(data);

      // Date Dimension
      this.set('dimension.date', ndx.dimension(function(d) { return d.date; }));
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

  }.observes('content.isLoaded')


});
