'use strict';

var nodeExcel = require('excel-export');


Date.prototype.getJulian = function() {
  return Math.floor((this / 86400000) - 
  (this.getTimezoneOffset()/1440) + 2440587.5);
}

function conf(inputs) {
  // extract unique field names across all inputs
  var names = {};
  var values = []
  for(var i in inputs) {
    var input = inputs[i];
    var row_values = {};
    for(var f in input.fields) {
      var field = input.fields[f];
      names[field.name] = 'string';
      row_values[field.name] = field.value;
    }
    values.push(row_values);
  }

  // create columns conf and a  matching lists of fields to ordered_list
  var cols = [];
  var keys = Object.keys(names);
  var ordered_list = [];
  for(var n in keys) {
    var name = keys[n];
    cols.push({caption:name, type:names[name]});
    ordered_list.push(name);
  }

  var rows = [];
  for(var v in values) {
    var row = values[v];
    var row_ordered_values = [];
    for(var l in ordered_list) {
      var current_field = ordered_list[l];
      row_ordered_values.push(row[current_field]);
    }
    rows.push(row_ordered_values);
  }

  return {
    cols: cols,
    rows: rows
  };
}

function exportExcel(data) {
  return nodeExcel.execute(conf(data));
}
exports.conf = conf;
exports.exportExcel = exportExcel;