var exporter = require('../exporter.js');
var fs = require('fs');
var assert = require('assert');

describe('JSON fields to XLSX', function() {
	it('convert test file to configuration', function() {
    // curl "http://localhost:3000/guests" > sample1.json
		var sample = require(__dirname + '/sample1.json');
    var conf = exporter.conf(sample);
    //console.log(JSON.stringify(conf, null, 4));
	});
  it('convert to output output.xlsx', function() {
    // curl "http://localhost:3000/guests" > sample1.json
    var sample = require(__dirname + '/sample1.json');
    var output = exporter.exportExcel(sample);
    fs.writeFileSync(
      __dirname + '/output.xlsx', 
      output,
      'binary');
  });

});
