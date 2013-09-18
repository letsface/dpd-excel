var utils = require('../utils.js');
var XLSX = require('xlsx');
var assert = require('assert');

describe('XLSX to JSON', function() {
	it('convert test file test.xlsx', function() {
		var xlsx = XLSX.readFile(__dirname + '/test.xlsx');
		var sheet_name_list = xlsx.SheetNames;
		var output = utils.sheet_to_row_object_array(xlsx.Sheets[sheet_name_list[0]]);
    assert.equal(output.length, 17);
    assert.equal(output[0]["Email Address"], "abergheim@vokdams.cn");
    assert.equal(output[0]["Given name"], "Andrea");
    assert.equal(output[0]["Family name"], "Bergheim");
    assert.equal(output[0]["Type"], "Pro-Am Day 1");
	});
});
