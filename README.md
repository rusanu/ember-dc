# Ember DC Components (dc.js)

## Introduction

Ember DC - Multi-Dimensional charting built to work natively with crossfilter rendered with d3.js (dc.js)

I just started wrapping the components so bare with me

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

If you want more features than this provides, file an issue. Feature requests/contributions are welcome but the goal is to keep things simple and fast.

## Example usage

Controller

```javascript

// Controller Example



```


Components (templates)

```handlebars

// Line Chart Example

{{line-chart
  metrics=metrics
  dimension=dimensions.date
  group=groups.dateComposite
  brushOn=true
}}



```

## Building Ember DC
Ember DC uses [node.js](http://nodejs.org/) and [gulp](http://gulpjs.com/) as a build system,
These two libraries will need to be installed before building.

To build Ember DC, clone the repository, and run `npm install` to install build dependencies
and `gulp` to build the library.

Unminified and minified builds of Ember DC will be placed in the `dist` directory