var Resource = require('deployd/lib/resource');
var internalClient = require('deployd/lib/internal-client');

var fs = require('fs');
var util = require('util');
var path = require('path');
var nodeExcel = require('excel-export');

function ExcelResource(name, options) {
  Resource.apply(this, arguments);

  this.on('changed', function(config) {
    console.log('ExcelResource changed', config);
  });
}
util.inherits(ExcelResource, Resource);

Date.prototype.getJulian = function() {
  return Math.floor((this / 86400000) - 
  (this.getTimezoneOffset()/1440) + 2440587.5);
}

function generateExcel(data) {
  var conf ={};
  conf.cols = [
    {caption:'Email Address', type:'string'},
    {caption:'Given name', type:'string'},
    {caption:'Family name', type:'string'},
    {caption:'Type', type:'string'}                
  ];
  conf.rows = [];
  for(var d in data) {
    row = data[d];    
    conf.rows.push([row.email, row.name.firstname, row.name.lastname, row.type]);
  }
  return nodeExcel.execute(conf);  
}

ExcelResource.prototype.handle = function (ctx, next) {
  if (ctx.url === '/report.xlsx') {
    ctx.res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    ctx.res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    var dpd = internalClient.build(process.server);
    dpd.guests.get(function(data, err) {
      ctx.res.end(generateExcel(data), 'binary');  
    })
    
  } else {
    next();
  }
}

ExcelResource.events = ["get"];
ExcelResource.label = 'ExcelFileResource';
module.exports = ExcelResource;