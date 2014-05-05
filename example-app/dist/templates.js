Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\n  <div class=\"container-fluid\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" href=\"#\">Ember DC</a>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-sm-3 col-md-2 sidebar\">\n      <ul class=\"nav nav-sidebar\">\n        <li class=\"active\"><a href=\"#\">UFO Example</a></li>\n        <li><a href=\"#\">Stock Example</a></li>\n      </ul>\n    </div>\n    <div class=\"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main\">\n      <h1 class=\"page-header\">UFO Sightings</h1>\n\n      <div class=\"row placeholders\">\n        <div class=\"col-xs-6 col-sm-3 placeholder\">\n          ");
  data.buffer.push(escapeExpression((helper = helpers['pie-chart'] || (depth0 && depth0['pie-chart']),options={hash:{
    'dimension': ("dimensions.state"),
    'group': ("groups.state"),
    'all': ("groups.all")
  },hashTypes:{'dimension': "ID",'group': "ID",'all': "ID"},hashContexts:{'dimension': depth0,'group': depth0,'all': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "pie-chart", options))));
  data.buffer.push("\n          <h4>States</h4>\n        </div>\n        <div class=\"col-xs-6 col-sm-3 placeholder\">\n          ");
  data.buffer.push(escapeExpression((helper = helpers['row-chart'] || (depth0 && depth0['row-chart']),options={hash:{
    'dimension': ("dimensions.daysOfWeek"),
    'group': ("groups.daysOfWeek")
  },hashTypes:{'dimension': "ID",'group': "ID"},hashContexts:{'dimension': depth0,'group': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "row-chart", options))));
  data.buffer.push("\n          <h4>Days of Week</h4>\n        </div>\n        <div class=\"col-xs-6 col-sm-6 placeholder\">\n\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>\n\n\n");
  return buffer;
  
});