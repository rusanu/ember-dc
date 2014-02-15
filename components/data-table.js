App.DataTableComponent = Ember.Component.extend({

  table: null,

  createTable: function() {
    var self = this;

    if(this.get('dimension') != null){
      return false;
    }

    this.table = dc.dataTable("#data-table")
        .dimension(this.get('dimension'))
        // data table does not use crossfilter group but rather a closure
        // as a grouping function
        .group(function (d) {
            var format = d3.format("02d");
            return d.date.getFullYear() + "/" + format((d.date.getMonth() + 1));
        })
        .size(10)
        .columns([
            function (d) {
                return d.date;
            }
        ])
        .sortBy(function (d) {
            return d.date;
        })
        .order(d3.ascending)
        .renderlet(function (table) {
            table.selectAll(".dc-table-group").classed("info", true);
        });


    this.table.render();

  }.on('didInsertElement').observes('dimension')

});