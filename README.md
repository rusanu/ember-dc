# Ember DC (dc.js)

## Introduction

Ember DC - Multi-Dimensional charts built to work natively with crossfilter rendered with d3.js (dc.js)

Ember Component Wrappers for [dc.js](http://nickqizhu.github.io/dc.js/)

(still working on abstracting all of the classes, will add more detailed examples / api instructions when I'm finished) If you'd like to help check out the [master dc.js api docs](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md) to read more about the mixins and charts.

![demo](http://cl.ly/image/3d2T1A0a2420/Screen%20Shot%202014-02-15%20at%204.36.31%20AM.png)

## Features

- Responsive Charts
- Multiple Line Chart
- Bar Chart
- Bubble Chart
- Coordinate Grid Chart
- Data Table
- Heat Map
- Number Display
- Pie Chart
- Row Chart
- Scatter Plot
- Stackable Chart
- Geo Choropleth Chart (Map)

If you want more features than this provides, file an issue. Feature requests/contributions are welcome.

## Example usage

Components (templates)

```handlebars

// Line Chart Example
{{line-chart
  metrics=metrics
  dimension=dimensions.date
  group=groups.dateComposite
  brushOn=true
}}

// Pie Chart Example
{{pie-chart
  dimension=dimensions.state
  group=groups.state
  all=groups.all
}}

// Geo Choropleth Chart Example (US Map)
{{geo-choropleth-chart
  dimension=dimensions.state
  group=groups.state
  geoJSON=usStates
}}

// Row Chart
{{row-chart
  dimension=dimensions.daysOfWeek
  group=groups.daysOfWeek
}}

```

Controller

```javascript

App.IndexController = Ember.ArrayController.extend(EmberDC, {

  /**
   * @property metrics
   * @type {Array}
   * Computed Metrics
   */
  metrics: [
    {value:'sighting',       label: 'Sightings'}
  ],

  startDate: moment().subtract('years', 50),
  endDate: moment().subtract('years', 4),

  /**
   * @method _createDimensions
   * Create the defined dimensions from the controller.
   * @return {void}
   * @private
   */
  _createDimensions: function() {
    var self = this;

    var content = Ember.get(this, 'content');

    content.forEach(function(d, i) {
      d.date = moment(d.sighted, 'YYYYMMDD').toDate();
    });

    d3.json("us-states.json", function (statesJson) {
      self.set('usStates', statesJson);
    });

    // Date Dimension
    this.set('dimensions.date', this._crossfilter.dimension(function(d) { return d.date; }));
    this.set('dimensions.state', this._crossfilter.dimension(function (d) { return d.state; }));
    this.set('dimensions.daysOfWeek', this._crossfilter.dimension(function (d) {
      var day = d.date.getDay();
      var name=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
      return day+"."+name[day];
    }));
  },


  /**
   * @method _createGroups
   * Create the defined groups from the controller.
   * @return {void}
   * @private
   */
  _createGroups: function() {
    this.set('groups.all', this._crossfilter.groupAll());
    this.set('groups.daysOfWeek', this.get('dimensions.daysOfWeek').group());
    this.set('groups.dateComposite', this.get('dimensions.date').group(d3.time.month).reduce(
      function(p, v){
          return {
            sighting: p.sighting+1
          }
      },
      function(p, v){
        return {
          sighting: p.sighting-1
        }
      },
      function(){return {sighting:0};}
    ));

    this.set('groups.state', this.get('dimensions.state').group());
  }


});

```


## Building Ember DC
Ember DC uses [node.js](http://nodejs.org/) and [gulp](http://gulpjs.com/) as a build system,
These two libraries will need to be installed before building.

To build Ember DC, clone the repository, and run `npm install` to install build dependencies
and `gulp` to build the library.

Builds of Ember DC will be placed in the `dist` directory


## Building Example App

Be sure to build the library first with `gulp`.

Run `gulp example-app` to build the example app.

Run `node example-app/server.js` to start the server.

Open [http://localhost:3001](http://localhost:3001) in the browser.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/andrewreedy/ember-dc/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
