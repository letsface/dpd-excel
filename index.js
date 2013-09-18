'use strict';

var Resource = require('deployd/lib/resource');
var internalClient = require('deployd/lib/internal-client');
var exporter = require('./exporter.js');

var util = require('util');

function ExcelResource(name, options) {
  Resource.apply(this, arguments);

  this.on('changed', function(config) {
    console.log('ExcelResource changed', config);
  });
}
util.inherits(ExcelResource, Resource);

ExcelResource.prototype.handle = function (ctx, next) {
  if (ctx.url === '/report.xlsx') {
    ctx.res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    ctx.res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    var dpd = internalClient.build(process.server);
    dpd.guests.get(function(data, err) {
      ctx.res.end(exporter.exportExcel(data), 'binary');  
    })
    
  } else {
    next();
  }
}

ExcelResource.events = ["get"];
ExcelResource.label = 'ExcelFileResource';
module.exports = ExcelResource;