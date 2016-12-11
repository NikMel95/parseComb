var P = require('parsimmon')
var fs = require('fs')
var path = require('path')
const util = require('util')

let source = path.resolve(__dirname, process.argv[2]);
let result = fs.readFileSync(source, 'utf-8');
let s = JSON.parse(result);
var re = "";


function getCode(json_arr) {
	for(c in json_arr) {
	    if (json_arr[c] instanceof Object) {
	        getCode(json_arr[c]);
	        continue;
	    }
	   re += json_arr[c];
	}
}
getCode(s);
console.log(re)